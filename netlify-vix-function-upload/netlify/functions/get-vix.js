export async function handler() {
  try {
    const response = await fetch("https://finnhub.io/api/v1/quote?symbol=^VIX&token=cvtp9f1r01qjg135gre0cvtp9f1r01qjg135greg");
    const data = await response.json();
    const vix = data.c;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ vix }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch VIX" }),
    };
  }
}