import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const stage = process.env.ENV || "dev";
  const message = stage === "prod" ? "Hello from Prod!" : "Hello from Dev!";
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    },
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
