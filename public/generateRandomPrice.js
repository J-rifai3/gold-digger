let price = 1924.2;

export function generateRandomPrice(min = 1000, max = 10000) {
  let change = 0;

  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      change = 1.2
    } else {
      change = 1.5
    }
  } else {
    if (Math.random() < 0.5) {
      change = -1.5
    } else {
      change = -1.2
    }
  }
  price += change
  price = Math.max(min, Math.min(max, price))
  price = Math.round(price * 100) / 100;
  
  return price
  
}