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
      const results = await getRecentHistory(queryList[i])
      if(results) searchResults.push(...results)
    }
    const sortedSearchResults = searchResults.sort((a,b)=>a.createdAt === b.createdAt? a.title.localeCompare(b.title): a.createdAt - b.createdAt)

    console.log(sortedSearchResults.slice(0,10))
    
    return sortedSearchResults
  }catch(e){
    console.log("[Fetch recent history] Error occurred: ", e)
    return "Unable to fetch results due to error"
  }
}

module.exports = fetchRecentHistory