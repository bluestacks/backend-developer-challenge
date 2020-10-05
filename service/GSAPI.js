const API = require('./API');

class GSAPI extends API{
  constructor(debug=false, working="local") {

    // Singleton Pattern
    if (GSAPI._instance) {
      return GSAPI._instance
    }

    super({URL: "https://www.googleapis.com/customsearch/v1", timeout: 10})

    GSAPI._instance = this
  }

  static async makeSearch(uri, params){
    try {
      let res = await super.get(uri, {
        key: process.env.GOOGLE_SEARCH_API_KEY_1,
        cx: process.env.GOOGLE_SEARCH_CX,
        q: params.query
      })
      return res
    } catch (e) {
      GSAPI.handleErrors(e)
      return null
    }
  }

  // async post (uri, data, options) {
  //   try {
  //     let res = await super.post(uri, data, options)
  //     return res
  //   } catch (e) {
  //     GSAPI.handleApiError(e)
  //     return null
  //   }
  // }

  // async put (uri, data, options) {
  //   try {
  //     let res = await super.put(uri, data, options)
  //     return res
  //   } catch (e) {
  //     GSAPI.handleApiError(e)
  //     return null
  //   }
  // }

  // async delete (url, options) {
  //   try {
  //     let res = await super.delete(url, options)
  //     return res
  //   } catch (e) {
  //     GSAPI.handleApiError(e)
  //     return null
  //   }
  // }

  // updateHeaders(headers={}){
  //   console.log(this.instance.defaults.headers.common)
  //   // purge existing headers in axios instance - idk if it works
  //   this.instance.defaults.headers.common = {}

  //   Object.keys(headers).forEach((header)=>{
  //     this.instance.defaults.headers.common[header] = headers[header]
  //   })
  // }

  // addHeaders(headers={}){
  //   console.log(this.instance.defaults.headers.common)
  //   // purge existing headers in axios instance - idk if it works
  //   this.instance.defaults.headers.common = {...this.instance.defaults.headers}

  //   Object.keys(headers).forEach((header)=>{
  //     this.instance.defaults.headers.common[header] = headers[header]
  //   })
  // }
  static handleErrors(err){
    // handle network errors on a global level
    if(ServiceAPI.debug){
      console.log("Arokoru API : ", err)
    }
  }
}

module.exports = GSAPI