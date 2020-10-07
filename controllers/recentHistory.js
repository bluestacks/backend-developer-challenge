const Recents = require('../models/Recents')
const SearchResult = require('../models/SearchResult')

const getRecentHistory = async (query) => {
  const history = await Recents.findOne({keyword: query})
  console.log("[Fetch recent history] fetched history id's for query: ", query)

  if(history){
    const historyElements = await SearchResult.find({
      "_id": {
        $in: [
          ...history.results
        ]
      }
    })
    console.log("[Fetch recent history] fetched history results for query: ", query)
    return historyElements
  }
  console.log("[Fetch recent history] no  history results present for query: ", query)
  return null
}
const fetchRecentHistory = async (queryList) => {
  try{
    console.log("[Fetch recent history] query: ", queryList)

    const searchResults = []
    for(let i=0; i<queryList.length; i++){
      console.log("[Fetch recent history] get recent history for query: ", queryList[i])  
      const results = await getRecentHistory(queryList[i])
      console.log("[Fetch recent history] Fetched recent history for query: ", results)  
      if(results) searchResults.push(...results)
    }
    const sortedSearchResults = searchResults.sort((a,b)=>a.createdAt === b.createdAt? a.title.localeCompare(b.title): a.createdAt - b.createdAt)

    console.log("[Fetch recent history] SortedSearchResults :", sortedSearchResults)  
    
    return sortedSearchResults
  }catch(e){
    console.log("[Fetch recent history] Error occurred: ", e)
    return "Unable to fetch results due to error"
  }
}

module.exports = fetchRecentHistory