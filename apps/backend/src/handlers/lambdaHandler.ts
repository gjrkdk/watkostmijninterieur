import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { greetingController } from "../controllers/greetingController";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600", // Cache the preflight response
      },
      body: "",
    };
  }

  try {
    console.log("Event:", JSON.stringify(event, null, 2));

    const name = event.pathParameters?.name || "World";
    console.log("Name:", name);

    const response = greetingController.handleGreeting(name);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from all origins
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Ensure CORS headers are included
      },
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
