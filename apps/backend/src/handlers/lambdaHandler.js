const { priceCalculation } = require("@GJRKDK/price-calculator");

exports.handler = async (event) => {
  // if (event.httpMethod === "OPTIONS") {
  // return {
  // statusCode: 200,
  // headers: {
  // "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  // "Access-Control-Allow-Headers": "Content-Type",
  // "Access-Control-Max-Age": "3600", // Cache the preflight response
  // },
  // body: "",
  // };
  // }

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
