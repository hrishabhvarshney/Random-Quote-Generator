// script.js

// Function to fetch a random quote from the API
async function getQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
}

// Function to display the fetched quote
async function displayQuote() {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    // Update the UI to indicate loading
    quoteTextElement.textContent = 'Loading...';
    quoteAuthorElement.textContent = 'Unknown';

    // Fetch a random quote
    const quoteData = await getQuote();

    if (quoteData) {
        // Update the UI with the fetched quote
        quoteTextElement.textContent = quoteData.quote;
        quoteAuthorElement.textContent = quoteData.author;
    } else {
        // Handle case when quote fetching fails
        quoteTextElement.textContent = 'Failed to fetch quote';
    }
}

// Function to read aloud the quote (placeholder)
function readAloud() {
    const quoteText = document.getElementById('quote-text').textContent;
    
    // Create a new SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance();
    speech.text = quoteText;

    // Speak the quote
    window.speechSynthesis.speak(speech);
}

// Function to copy the quote text to clipboard (placeholder)
function copyQuote() {
    const quoteText = document.getElementById('quote-text').textContent;

    // Create a new textarea element to hold the text temporarily
    const textarea = document.createElement('textarea');
    textarea.value = quoteText;
    document.body.appendChild(textarea);

    // Select the text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea
    document.body.removeChild(textarea);

    // Notify the user
    alert('Quote copied to clipboard!');
}

// Function to share the quote (placeholder)
function shareQuote() {
    const quoteText = document.getElementById('quote-text').textContent;
    const quoteAuthor = document.getElementById('quote-author').textContent;

    // Create a shareable message
    const shareMessage = `"${quoteText}" - ${quoteAuthor}`;

    // Check if the share API is supported by the browser
    if (navigator.share) {
        // Use the share API to share the message
        navigator.share({
            title: 'Check out this quote!',
            text: shareMessage,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that do not support the share API
        // Prompt the user to manually share the message
        const fallbackUrl = `mailto:?subject=Check%20out%20this%20quote!&body=${encodeURIComponent(shareMessage)}`;
        window.location.href = fallbackUrl;
    }
}

// Event listener for the "New Quote" button
document.getElementById('new-quote-button').addEventListener('click', displayQuote);

// Event listener for the "Read Aloud" button
document.getElementById('read-aloud-button').addEventListener('click', readAloud);

// Event listener for the "Copy Text" button
document.getElementById('copy-text-button').addEventListener('click', copyQuote);

// Event listener for the "Share" button
document.getElementById('share-button').addEventListener('click', shareQuote);

// Display a random quote when the page loads
window.onload = displayQuote;
