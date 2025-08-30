"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// Show New Quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[0];;
  // Check if Author field is blank and replace it with 'Unkown'
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styilng
  if (quote.quote.quote > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.quote;
}

// Get Quotes From API
async function getquotes() {
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
twitterBtn.addEventListener("click", tweetQuote)

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

