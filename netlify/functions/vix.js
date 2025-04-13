
const https = require('https');

exports.handler = async function(event, context) {
  return new Promise((resolve, reject) => {
    https.get("https://finnhub.io/api/v1/quote?symbol=^VIX&token=cvtp9f1r01qjg135gre0cvtp9f1r01qjg135greg", (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: data
        });
      });
    }).on("error", (err) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: "Unable to fetch VIX from Finnhub" })
      });
    });
  });
};
