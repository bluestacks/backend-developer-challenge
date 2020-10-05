const { query } = require("express")

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