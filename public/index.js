import { generateRandomPrice } from './generateRandomPrice.js'

// Doc elements
const formEl = document.querySelector('form');
const dialogEl = document.querySelector("dialog");
const dialogBtn = document.getElementById('dialog-btn')
const investAmountEl = document.getElementById('investment-amount')
const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')
const investmentSummary = document.getElementById('investment-summary')

//Form submit handling
formEl.addEventListener("submit", async function(event) {
  event.preventDefault();
  if (connectionStatus.textContent === 'Live Prices 🟢') {

      const valueToInvest = investAmountEl.value

      if (valueToInvest < 10) {
        alert('Please invest at least £10.')
        return
      }

      const amount = (valueToInvest / Number(priceDisplay.textContent)).toFixed(2)
      investmentSummary.textContent = `You just bought ${amount} ounces (ozt) for £${valueToInvest}. 
      The sale has executed and we're preparing documentation.`
      dialogEl.showModal()
      await sendPostRequest(valueToInvest, Number(priceDisplay.textContent).toFixed(2), amount);

  } else {
    alert('You can only invest when live price is on.')
  }
})

//Sends post request
async function sendPostRequest(valueToInvest, sellingPrice, amount) {
  try {
      const response = await fetch('/api', {
      method: "POST",
      headers: {
        'Content-Type': "text/plain"
      },
      body: `${formatDate()}, amount paid: £${valueToInvest}, price per Oz: £${sellingPrice}, gold sold: ${amount} Oz \n`
    });

    if (!response.ok) {
        throw new Error(response.text());
    }

    const data = await response.text();
    console.log(data)

  } catch (err) {
    console.error(err)
  }
  
}

//Gets formatted date for post request
function formatDate() {
  const date = new Date()
  const pad = n => String(n).padStart(2, '0');

  const YYYY = date.getFullYear();
  const MM   = pad(date.getMonth() + 1);
  const DD   = pad(date.getDate());
  const HH   = pad(date.getHours());
  const mm   = pad(date.getMinutes());
  const SS   = pad(date.getSeconds());

  return `${YYYY}-${MM}-${DD}--${HH}:${mm}:${SS}`;
}


//Button click handler
dialogBtn.addEventListener("click", () => {
    investAmountEl.value = ''
    dialogEl.close()
})


//Price updating handler
setInterval(function() {
    toggleLivePrice()
}, 60000)

let intervalId = ''
let livePriceOn = false
function toggleLivePrice() {
  if (livePriceOn) {
    
    livePriceOn = false
    clearInterval(intervalId)
    connectionStatus.textContent = 'Disconnected 🔴'
    priceDisplay.textContent = '----.--'


  } else {

    livePriceOn = true
    connectionStatus.textContent = 'Live Prices 🟢'
    priceDisplay.textContent = generateRandomPrice().toFixed(2)

    intervalId = setInterval(function() {
      const newPrice = generateRandomPrice().toFixed(2)
      priceDisplay.textContent = newPrice;
    }, 2000)
    
  }
}

