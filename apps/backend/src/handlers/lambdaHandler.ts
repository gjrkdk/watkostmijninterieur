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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid JSON format" }),
      };
    }

    const { contactDetails, selectedFormValues } = body;
    const { email, firstName, phone } = contactDetails || {};
    const { rooms } = selectedFormValues || {};

    if (!firstName || !email) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
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

    await dynamoDB.send(
      new PutCommand({
        TableName: "Contacts",
        Item: {
          id: contactId,
          email: email,
          firstName: firstName,
          ...(phone && { phone }),
          createdAt: new Date().toISOString(),
          environment: stage,
        },
      }),
    );

    const msg = {
      to: email,
      from: senderEmail,
      templateId: sendgridEmailTemplate,
      dynamicTemplateData: {
        firstName: firstName,
      },
    };

    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    const response = calculateRoomPricing(selectedFormValues);
    console.log("Price Calculation Response:", response);

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
