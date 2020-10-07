const keywordExtractor = require("keyword-extractor")
const GoogleSearchAPI = require('../service/GoogleSearchAPI')
const SearchResult = require('../models/SearchResult');
    // const searchSave = await addSearchResults(googleSearchResults)
    // const keywordMapSave = await addKeywordsMap(googleSearchResults, keywords)
    // if(!searchSave || !keywordMapSave) {
    //   res.status(400).json({
    //     success: false,
    //     error: "Unable to store results and map"
    //   })
    // }else{
    //   res.status(200).json({
    //     success: true,
    //     data: {
    //       success: true,
    //       results: googleSearchResults
    //     }
    //   })
    // }

const KW_CONFIGS = { // extract keywords in the query value
  language:"english",
  remove_digits: true,
  return_changed_case:true,
  remove_duplicates: true
}
    

const googleSearch = async (query) => {
  try{
    console.log("[Google search] query: ", query)

    const keywords = keywordExtractor.extract(query, KW_CONFIGS)
    const googleSearchResults = await GoogleSearchAPI.makeSearchV2(query)
    console.log("[Google search] Search results fetched")
    const googleSearchResultsMapped = googleSearchResults.map(result=>{
      return {
        title: result.title,
        link: result.link,
        snippet: result.snippet
      }
    })
    // for(const res: googleSearchResultsMapped){
    //   if(SearchResult.find())
    // }
    // const dataAdditionResponse = await SearchResult.insertMany(googleSearchResultsMapped)
    
    console.log("[Google search] Search results added into database")
    
    return googleSearchResultsMapped
  }catch(e){
    console.log("Error occurred: ", e)
    return "Unable to fetch results due to error"
  }
}

module.exports = googleSearch