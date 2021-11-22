
let apiQuotes = [];
let quoteContainer = document.getElementById('quote-container');
let quotesText = document.getElementById('quote');
let quotesAuthor = document.getElementById('quote-author');
let reloadBtn = document.getElementById('new-quote');
let twitterBtn = document.getElementById('twitter-button');
let twitterUrl = "https://twitter.com/intent/tweet?text=";
let loader = document.getElementById('loader');

getQuotes();

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showQuotes();
    } catch(error) {
        console.log(error);
    }
}

function showQuotes() {
    quotesText.innerText = apiQuotes[0].quote;
    if(!apiQuotes[0].author) {
        quotesAuthor.innerText = "Unknown";
    } else {
        quotesAuthor.innerText = apiQuotes[0].author;
    }
    if(quotesText.textContent.length > 100) {
        quotesText.classList.add('long-quote');
    } else {
        quotesText.classList.remove('long-quote');
    }
    complete();
}

reloadBtn.addEventListener('click', () => location.reload());
twitterBtn.addEventListener('click', () => {
    window.open(twitterUrl + quotesText.textContent + ' - ' + quotesAuthor.innerText, "_blank");
});