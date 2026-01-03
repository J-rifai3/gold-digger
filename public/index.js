import { generateRandomPrice } from './generateRandomPrice.js'


const formEl = document.querySelector('form');
const dialogEl = document.querySelector("dialog");
const dialogBtn = document.getElementById('dialog-btn')
const investAmountEl = document.getElementById('investment-amount')
const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')
const investmentSummary = document.getElementById('investment-summary')


formEl.addEventListener("submit", function(event) {
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
  } else {
    alert('You can only invest when live price is on.')
  }
})

dialogBtn.addEventListener("click", () => {
    investAmountEl.value = ''
    dialogEl.close()
})



setInterval(function() {
    toggleLivePrice()
}, 6000)



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

