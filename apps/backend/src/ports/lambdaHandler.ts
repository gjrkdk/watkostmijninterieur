import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getGreeting } from "../domain/greeting";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  // Extract the "name" parameter from the event path
  const name = event.pathParameters?.name || "World";

  const response = getGreeting({ name });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
