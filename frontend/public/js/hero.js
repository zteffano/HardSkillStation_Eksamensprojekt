// Get the text content of the h1 element
var titleElement = document.getElementById("heroContentHeading");
var titleText = titleElement.textContent;

// Find the index of 'Y' and adjust the substring for 'Your'
var startIndex = titleText.indexOf('Y');
var endIndex = titleText.indexOf('r') + 1; // Add 1 to include the 'r'

// Split the target part of the text into an array of characters
var titleArray = titleText.substring(startIndex, endIndex).split('');

// Iterate through the array and wrap the specified letters with a span
for (var i = 0; i < titleArray.length; i++) {
  if (titleArray[i].toLowerCase() === 'o' || titleArray[i].toLowerCase() === 'u' || titleArray[i].toLowerCase() === 'r') {
    titleArray[i] = '<span class="highlight">' + titleArray[i] + '</span>';
  }
}

// Join the modified array back into a string and set it as the new content
titleElement.innerHTML = titleText.substring(0, startIndex) + titleArray.join('') + titleText.substring(endIndex);