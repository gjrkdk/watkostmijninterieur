import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const stage = process.env.ENV || "dev";
    const tableName = process.env.TABLE_NAME_DEV || "Default";

    const body = JSON.parse(event.body || "{}");
    const { firstName, email, phoneNumber } = body;

    if (!firstName || !email) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "First name and email are required" }),
      };
    }

    const contactId = uuidv4();

    await dynamoDB.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: contactId,
          firstName,
          email,
          ...(phoneNumber && { phoneNumber }),
          createdAt: new Date().toISOString(),
          environment: stage,
        },
      }),
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Contact saved successfully", contactId }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
