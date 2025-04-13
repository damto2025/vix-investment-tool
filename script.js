
function formatCurrency(num) {
  return "$" + num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function calculate() {
  const investmentInput = document.getElementById("investment");
  let raw = investmentInput.value.replace(/[^\d]/g, "");
  if (raw.length > 1 && raw.startsWith("0")) {
    raw = raw.replace(/^0+/, "");
  }
  const investment = parseFloat(raw || 0);
  investmentInput.value = investment.toLocaleString();

  const actions = parseFloat(document.getElementById("actions").value);
  const rate = parseFloat(document.getElementById("rate").value);

  const totalBeforeTax = investment * Math.pow(1 + rate / 100, actions);
  const profitBeforeTax = totalBeforeTax - investment;
  const tax = profitBeforeTax * 0.25;
  const profitAfterTax = profitBeforeTax - tax;
  const totalWithPrincipal = profitAfterTax + investment;

  document.getElementById("beforeTax").textContent = formatCurrency(profitBeforeTax);
  document.getElementById("taxAmount").textContent = formatCurrency(tax);
  document.getElementById("afterTax").textContent = formatCurrency(profitAfterTax);
  document.getElementById("total").textContent = formatCurrency(totalWithPrincipal);
}

function fetchVIX() {
  fetch("/.netlify/functions/vix")
    .then((response) => response.json())
    .then((data) => {
      const vixValue = data.c;
      const vixEl = document.getElementById("vix");
      if (!vixValue) throw new Error("Invalid VIX value");
      vixEl.textContent = vixValue.toFixed(2);
      vixEl.style.fontWeight = "bold";

      if (vixValue < 15) {
        vixEl.style.color = "green";
      } else if (vixValue < 25) {
        vixEl.style.color = "orange";
      } else {
        vixEl.style.color = "red";
      }
    })
    .catch((err) => {
      document.getElementById("vix").textContent = "N/A";
    });
}

const investmentInputEl = document.getElementById("investment");
investmentInputEl.addEventListener("input", calculate);
investmentInputEl.addEventListener("focus", () => {
  const cleaned = investmentInputEl.value.replace(/[^\d]/g, "");
  if (cleaned === "0") {
    investmentInputEl.value = "";
  }
});

document.getElementById("actions").addEventListener("input", calculate);
document.getElementById("rate").addEventListener("input", calculate);

window.onload = () => {
  calculate();
  fetchVIX();
  setInterval(fetchVIX, 60000);
};
