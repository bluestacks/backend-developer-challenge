const express = require('express')
const asyncHandler = require("./middleware/async")

const router = express.Router()

router.route("/query").get(asyncHandler(async (req, res, next) => {
  console.log("[Routes] Query recieved! ", req.params)
  const { query } = req.params
  const trimmedQ = query.trim()
  const [request, value] = trimmedQ.split(" ", 1)
  console.log("[Routes] Query parsed! Parsed:", {request, value})

  // handling requirement 1
  if(request.toLowerCase() === "hey"){
    res.status(200).json({
      success: true,
      data: "Hi"
    })
  }else if(request.toLowerCase() === "hi"){
    res.status(200).json({
      success: true,
      data: "Hey"
    })
  }else if(request.toLowerCase() === "!google"){ // get search query and add history
    res.status(200).json({
      success: true,
      data: value
    })
  }else if(request.toLowerCase() === "!recent"){ // handle history fetch
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