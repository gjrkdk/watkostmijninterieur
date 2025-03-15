import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { calculateRoomPricing } from "@gjrkdk/price-calculator";
import sgMail from "@sendgrid/mail";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const sendgridApiKey = process.env.SENDGRID_API_KEY || "";
const senderEmail = process.env.SENDER_EMAIL || "";
const sendgridEmailTemplate = process.env.SENDGRID_EMAIL_TEMPLATE_ID || "";

sgMail.setApiKey(sendgridApiKey);

// TODO: Modularize this handler

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const stage = process.env.ENV || "dev";

    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch (err) {
      console.error("Invalid JSON received:", event.body);
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Invalid JSON format" }),
      };
    }

    const { contactDetails, selectedFormValues } = body;
    const { email, firstName, phone } = contactDetails || {};
    const { rooms } = selectedFormValues || {};

    if (!firstName || !email) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "First name and email are required" }),
      };
    }

    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Invalid request: at least one room is required",
        }),
      };
    }

    const contactId = uuidv4();

    const saveDataDynamoDB = async (
      contactId: string,
      email: string,
      firstName: string,
      totalPrice: { min: number; max: number },
      phone?: string,
    ) => {
      await dynamoDB.send(
        new PutCommand({
          TableName: "Contacts",
          Item: {
            id: contactId,
            email: email,
            firstName: firstName,
            ...(phone && { phone }),
            minPrice: totalPrice.min,
            maxPrice: totalPrice.max,
            createdAt: new Date().toISOString(),
            environment: stage,
          },
        }),
      );
    };

    const sendConfirmationEmail = async (
      firstName: string,
      email: string,
      totalPrice: { min: number; max: number },
    ) => {
      const msg = {
        to: email,
        from: senderEmail,
        templateId: sendgridEmailTemplate,
        dynamicTemplateData: {
          firstName: firstName,
          min: totalPrice.min,
          max: totalPrice.max,
        },
      };
      await sgMail
        .send(msg)
        .then(() => {
          console.log(
            `Email sent to ${email} with price details: ${totalPrice.min} - ${totalPrice.max}`,
          );
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    };

    const response = calculateRoomPricing(selectedFormValues);
    console.log("Price Calculation Response:", response);

    const { totalPrice } = response;

    await saveDataDynamoDB(contactId, email, firstName, totalPrice, phone);
    console.log("Data saved to DynamoDB");

    await sendConfirmationEmail(firstName, email, totalPrice);
    console.log("Confirmation email sent");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
