const keywordExtractor = require("keyword-extractor")
const GoogleSearchAPI = require('../service/GoogleSearchAPI')
const Recents = require('../models/Recents')
const SearchResult = require('../models/SearchResult')
const { handleErrors } = require("../service/GoogleSearchAPI")

const KW_CONFIGS = { // extract keywords in the query value
  language:"english",
  remove_digits: true,
  return_changed_case:true,
  remove_duplicates: true
}

const addResult = async (searchResults, keywordMap) => {
  try{

    for(let i=0; i<searchResults.length; i++){
      const res = searchResults[i]
      console.log(`[Google search] Adding google search result for title: "${res.title}"`) 
      const foundElem = await SearchResult.findOne({"title": `${res.title}`})
      console.log(`[Google search] found status Map:`,  foundElem)
      if(!foundElem){
        const result = await SearchResult.create(res)
        keywordMap.forEach(mapped=>mapped.results.push(result._id))
        console.log(`[Google search] Search result: "${res.title}" added into database`)
        gsResAdded = true
      }else{
        console.log("Found #"+i+": ", foundElem.title)
        keywordMap.forEach(mapped=>mapped.results.push(foundElem._id))
        console.log(`[Google search] Search result: "${foundElem.title}" already present in database`)
      }
    }
    console.log("[Google search] Adding keyword map | Map:", keywordMap)    
    for(let i=0; i<keywordMap.length; i++){
      const keywordRec = keywordMap[i]
      console.log(`[Google search] Adding keyword map for word: ${keywordRec.keyword} Map:`,  keywordRec)
      const foundElem = await Recents.findOne({"keyword": `${keywordRec.keyword}`})
      console.log(`[Google search] Found #${i} word: "${keywordRec.keyword}" Map:`,  foundElem)
      if(!foundElem){
        const result = await Recents.create(keywordRec)
        console.log(`[Google search] New keyword map for word: "${result.keyword}" added into database`)
      }else{
        const result = await Recents.update({"keyword": `${foundElem.keyword}`}, {...foundElem, "results": [...foundElem.results, ...keywordRec.results]})
        console.log(`[Google search] Updated keyword map for word: "${result.keyword}" added into database`)
      }
    }

    return true
  }catch(e){
    console.log("Error occurred")
    handleErrors(e)
    return false
  }
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
    const keywordMap = []
    keywords.forEach(keyword=>keywordMap.push({keyword, "results": []}))
    const awaitedMappedResults = await addResult(googleSearchResultsMapped, keywordMap)
    if(awaitedMappedResults){
      console.log("[Google search] Search results added into database")
    }else{
      console.log("[Google search] Search results already present in database")
    }
    
    return googleSearchResultsMapped
  }catch(e){
    console.log("[Fetch recent history] Error occurred: ", e)
    return "Unable to fetch results due to error"
  }
}

module.exports = googleSearch