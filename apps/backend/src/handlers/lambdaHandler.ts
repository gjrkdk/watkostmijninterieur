export const handler = async () => {
  const stage = process.env.ENV || "dev";
  const message = stage === "prod" ? "Hello from Prod!" : "Hello from Dev!";
  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};
