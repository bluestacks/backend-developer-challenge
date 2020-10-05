const express = require('express')
const asyncHandler = require("./middleware/async")
var keywordExtractor = require("keyword-extractor")
const GoogleSearchAPI = require('./service/GoogleSearchAPI')
const router = express.Router()

router.route("/bot_talks").get(asyncHandler(async (req, res, next) => {
  console.log("[Routes] Query recieved! ", req.query)
  const { query } = req.query
  const trimmedQ = query.trim().toLowerCase()
  const request = trimmedQ.substr(0,trimmedQ.indexOf(" "))
  const value = trimmedQ.substr(trimmedQ.indexOf(" ")+1) // query params extracted

  const keywords = keywordExtractor.extract(value, { // extract keywords in the query value
    language:"english",
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: true
  })
  console.log("[Routes] Query parsed! Parsed:", {trimmedQ, request, value, keywords})

  // handling requirement 1
  if(request === "hey"){
    res.status(200).json({
      success: true,
      data: "Hi"
    })
  }else if(request === "hi"){
    res.status(200).json({
      success: true,
      data: "Hey"
    })
  }else if(request === "!google"){ // get search query and add history
    const googleSearchResults = await GoogleSearchAPI.makeSearchV2(value)
    // const searchSave = await addSearchResults(googleSearchResults)
    // const keywordMapSave = await addKeywordsMap(googleSearchResults, keywords)
    // if(!searchSave || !keywordMapSave) {
    //   res.status(400).json({
    //     success: false,
    //     error: "Unable to store results and map"
    //   })
    // }else{
      res.status(200).json({
        success: true,
        data: {
          success: true,
          results: JSON.stringify(googleSearchResults)
        }
      })
    // }
  }else if(request === "!recent"){ // handle history fetch
    res.status(200).json({
      success: true,
      data: value
    })
  }else{
    res.status(400).json({
      success: false,
      error: "Query is incorrect!"
    })
  }
}))

module.exports = router