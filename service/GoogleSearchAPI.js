// const GSAPI = require('./GSAPI')
const axios = require('axios')

class GoogleSearchAPI{
  constructor (debug=false) {
    if (this.constructor === GoogleSearchAPI) {
      throw Error("Abstract classes can't be instantiated.")
    }

    GoogleSearchAPI.debug = debug
  }

  static async makeSearchV2(query) {
    try{
      console.log("GoogleSearchAPI service | getGoogleSearchAPI | request | query: "+ query)
      const response = await axios.get('https://www.googleapis.com/customsearch/v1/', {
        params: {
          key: process.env.GOOGLE_SEARCH_API_KEY_1, 
          q: query,
          cx: process.env.GOOGLE_SEARCH_CX,
        }
      })
      console.log("GoogleSearchAPI service | getGoogleSearchAPI | response | data : ", response.data)
      if(response && response.status === 200 && response.data.items){
        return response.data.items
      } else {
        return null
      }
    } catch (e) {
      GoogleSearchAPI.handleErrors(e)
    }
  }

  

  static handleErrors(err){
    console.log("Error: ", err)
  }
}

module.exports = GoogleSearchAPI