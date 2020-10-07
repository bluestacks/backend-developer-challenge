// setup environment variables
const dotenv = require('dotenv')
const connectDB = require("./config/db")
dotenv.config({ path: './config/config.env' })
connectDB()

const {Client} = require("discord.js")
const messageHandler = require("./messageHandler")

const client = new Client()

client.on("ready", ()=>{
  console.log(`${client.user.username} had logged in!`)
})

client.on("message", async (message)=>{
  if(message.author.bot) return

  if(message.content.trim().toLowerCase() === "hey"){
    console.log("q-#1")
    return "Hi!"
  }else if(message.content.trim().toLowerCase() === "hi"){
    return "Hey!"
  }else{
    const msg_content = message.content
    console.log(msg_content)
    const response = await messageHandler(msg_content)
    response? message.channel.send(response): null
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)

