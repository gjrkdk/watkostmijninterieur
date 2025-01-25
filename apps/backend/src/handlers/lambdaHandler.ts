import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { priceCalculation } from "@GJRKDK/price-calculator";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Event:", JSON.stringify(event, null, 2));

    const body = event.body ? JSON.parse(event.body) : {};
    console.log("Request Body:", body);

    const response = priceCalculation(body);

    console.log(response);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
