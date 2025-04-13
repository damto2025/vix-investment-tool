
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://finnhub.io/api/v1/quote?symbol=^VIX&token=cvtp9f1r01qjg135gre0cvtp9f1r01qjg135greg");
    const data = await response.json();
    const vix = data.c; // current price
    return {
      statusCode: 200,
      body: JSON.stringify({ vix })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch VIX" })
    };
  }
};
