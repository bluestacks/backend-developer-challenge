const GSR = require('google-search-results-nodejs')
let googleSearchClient = new GSR.GoogleSearchResults(process.env.GOOGLE_SEARCH_API_KEY)

var parameter = {
    q: "Coffee",
    location: "Austin, Texas, United States",
    hl: "en",
    gl: "us",
    google_domain: "www.google.com",
};

var callback = function(data) {
  console.log(data)
}

// Show result as JSON
client.json(parameter, callback)
// singleton class to instantiate google search credentials caller
class GoogleSearch{
  constructor(){

    // Singleton Pattern
    if (GoogleSearch._instance) {
      return GoogleSearch._instance
    }
    // add google credentials setter here
    GoogleSearch._instance = this
  }

  static makeSearch = async (query) => {

  }
}


const makeSearch = (query)