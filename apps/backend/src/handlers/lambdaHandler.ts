import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { greetingController } from "../controllers/greetingController";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const name = event.pathParameters?.name || "World";
    const response = greetingController.handleGreeting(name);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Enable CORS if needed
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
