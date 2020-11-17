/*
Tiny JavaScript library to generate a random word to play Pictionnary.

- Author: Lilian Besson @Naereen
- GitHub: https://github.com/Naereen/Free-dictionnaries-for-Pictionnary
- License: MIT License
- Date: november 2020
*/

// TODO load text files in a dictionary
// one dictionary by languages?

/* Draw a random sample from an array
*/
function randomItem(items) {
    // https://stackoverflow.com/a/5915122/5889533
    var index = Math.floor(Math.random() * items.length);
    var item = items[index];
    return (index, item);
}

/* Synchronously read a text file from the web server with Ajax
* https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript#41133213
*
* The filePath is relative to the web page folder.
* Example:   myStuff = loadFile("Chuuk_data.txt");
*
* You can also pass a full URL, like http://sealevel.info/Chuuk1_data.json, but there
* might be Access-Control-Allow-Origin issues. I found it works okay in Firefox, Edge,
* or Opera, and works in IE 11 if the server is configured properly, but in Chrome it only
* works if the domains exactly match (and note that "xyz.com" & "www.xyz.com" don't match).
* Otherwise Chrome reports an error:
*
*   No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://sealevel.info' is therefore not allowed access.
*
* That happens even when "Access-Control-Allow-Origin *" is configured in .htaccess,
* and even though I verified the headers returned (you can use a header-checker site like
* http://www.webconfs.com/http-header-check.php to check it). I think it's a Chrome bug.
*/
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

const defaultWord = "Pictionnary";

/* Return list of non empty words from filePath
*/
function wordsFromFile(filePath) {
    var result = loadFile(filePath);
    if (result === null) return defaultWord;
    var words = result.split('\n');
    words = words.filter((s) => (s != ""));
    return words;
}

// Now test it
var URL = "dist/dictionnaire_pictionnary_francais.txt";
var URL = "src/test.txt";
console.log("Reading the words from", URL);
var words = wordsFromFile(URL);
console.log("Random words from", URL);
for (let index = 0; index < 10; index++) {
    const index, item = randomItem(words);
    console.log(index, item);
}

// To be sure to never print a word twice!
var seen = new Array(words.length);
for (let index = 0; index < words.length; index++) {
    seen[index] = false;
}

var numberOfUniqueWords = 0;

// TODO be sure to never generate twice the same word
function newUniqueRandomWord() {
    if (numberOfUniqueWords > words.length)
        return defaultWord;
    // TODO more efficient algorithm than naive rejection sampling?
    var index, word = randomItem(words);
    while (seen[index]) {
        index, word = randomItem(words);
    }
    // TODO make sure that this while loop always terminates
    seen[index] = true;
    numberOfUniqueWords += 1;
    return word;
}
