const searchResults = require('./controllers/searchResults');


const messageHandler =  async (message) => {
  console.log("[messageHandler] Message recieved! ", message)
  const trimmedMessage = message.trim().toLowerCase()
  let [COMMAND_TYPE, ...query] = trimmedMessage.split(" ")
  query = query.join(" ")

  console.log("[messageHandler] Query parsed! Parsed:", {trimmedMessage, COMMAND_TYPE, query})

  // handling requirement 1
  if(COMMAND_TYPE === "!google"){ // get search query and add history
    const results = await searchResults(query)
    let reply = `__Google Search__
_Query_: "${query}"
>>> ${results.map(res=>`
- __**${res.title}**__
${res.link}
${res.snippet}`)}`
    return reply
  }else if(COMMAND_TYPE === "!recent"){
    return
  }else{
    return null
  }
}

module.exports = messageHandler