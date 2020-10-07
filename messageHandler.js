const fetchRecentHistory = require('./controllers/recentHistory');
const searchResults = require('./controllers/searchResults');

const googleSearchReply = (query, results) => 
`__Google Search__
_Query_: "${query}"
>>> ${results.map(res=>`
- __**${res.title}**__
${res.link}
${res.snippet}`)}`

const recentHistoryReply = (query, results) => 
`__Recent history__
_Query_: "${query}"
>>> ${results.map(res=>`
- __**${res.title}**__
${res.link}
${res.snippet}`)}`

const messageHandler =  async (message) => {
  console.log("[messageHandler] Message recieved! ", message)
  const trimmedMessage = message.trim().toLowerCase()
  const [COMMAND_TYPE, ...queryList] = trimmedMessage.split(" ")
  const query = queryList.join(" ")

  console.log("[messageHandler] Query parsed! Parsed:", {trimmedMessage, COMMAND_TYPE, query})

  // handling requirement 1
  if(COMMAND_TYPE === "!google"){ // get search query and add history
    const results = await searchResults(query)
    const reply = googleSearchReply(query, results)
    return reply
  }else if(COMMAND_TYPE === "!recent"){
    const results = await fetchRecentHistory(queryList)
    const reply = recentHistoryReply(query, results)
    return reply
  }else{
    return null
  }
}

module.exports = messageHandler