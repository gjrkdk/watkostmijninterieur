import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
// import { v4 as uuidv4 } from "uuid";
import { calculateRoomPricing } from "@gjrkdk/price-calculator";

// const client = new DynamoDBClient({});
// const dynamoDB = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    // const stage = process.env.ENV || "dev";
    // const tableName = process.env.TABLE_NAME_DEV || "Default";

    const body = JSON.parse(event.body || "{}");
    // const { firstName, email, phoneNumber } = body;

    // if (!firstName || !email) {
    //   return {
    //     statusCode: 400,
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: "First name and email are required" }),
    //   };
    // }

    // const contactId = uuidv4();

    // await dynamoDB.send(
    //   new PutCommand({
    //     TableName: tableName,
    //     Item: {
    //       id: contactId,
    //       firstName,
    //       email,
    //       ...(phoneNumber && { phoneNumber }),
    //       createdAt: new Date().toISOString(),
    //       environment: stage,
    //     },
    //   }),
    // );

    if (!body.rooms || !Array.isArray(body.rooms)) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Invalid request rooms are required",
        }),
      };
    }

    const response = calculateRoomPricing(body);
    console.log(response);

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
