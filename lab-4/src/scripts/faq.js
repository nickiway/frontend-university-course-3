"use strict";

// is prime func
function isPrime(number) {
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false;

  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

// finding primes in range
function findPrimesInRange(start, end) {
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

// getting item from dom
const startButton = document.querySelector("#buttonStart");
const output = document.querySelector("#output");
const outputContainer = document.querySelector("#output__container");

// event handler
startButton.addEventListener("click", () => {
  const minLimit = prompt("Enter the min limit", 0);
  const maxLimit = prompt("Enter the max limit", 100);

  output.innerHTML = "";

  const result = findPrimesInRange(minLimit, maxLimit);
  for (let index = minLimit; index < maxLimit; index++) {
    const numberDiv = document.createElement("div");

    numberDiv.textContent = index;
    if (result.includes(index)) {
      numberDiv.style.color = "red";
      numberDiv.style.textShadow = "none";
    }
    output.appendChild(numberDiv);
  }
  outputContainer.style.display = "block";
});
