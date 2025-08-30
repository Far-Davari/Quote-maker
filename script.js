"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
// function loading() {
//   loader.hidden = false;
//   quoteContainer.hidden = true;
// }
function loading() {
  loader.style.display = "grid";
  quoteContainer.style.display = "none";
}

// Hide Loading
// function complete() {
//   quoteContainer.hidden = false;
//   loader.hidden = true;
// }
function complete() {
  quoteContainer.style.display = "block";
  loader.style.display = "none";
}


// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[0];
  // Check if Author field is blank and replace it with 'Unkown'
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styilng
  if (quote.quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.quote;
  complete();
}

// Get Quotes From API
async function getquotes() {
  loading();
  const apiUrl = "https://api.api-ninjas.com/v1/quotes";
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": "yOyCn0JnHEYhun3uZuR4rA==zarHWrGHTAQxQEEk",
      },
    });
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getquotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getquotes();

// If We Had Local Quotes
/*
function newQuoteLocal() {
  const quote = localQuote[Math.floor(Math.random() * localQuote.length)];
  console.log(quote);
}
newQuoteLocal();
*/
