import { config } from "./config/index.js"
import express from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import { checkRateLimitMiddleware } from "./middlewares/rateLimit.js"
const app = express()

//just for purpose of this challengue cause this is in memory storage and will be reseted on server restart
//plus it wont scale well
//also the corn api should have its own folder and file but for the purpose of this challenge i put it here

const users = new Map()

app.use(express.static(config.STATIC_PATH))

app.post("/api/corn", checkRateLimitMiddleware(users), (req, res) => {
  try {
    const ip = req.ip
    const date = Date.now()
    if (users.has(`id-${ip}`)) {
      const user = users.get(`id-${ip}`)
      user.lastPurchasedDate = date
      user.quantityAccumulated += 1
    } else {
      users.set(`id-${ip}`, {
        lastPurchasedDate: date,
        quantityAccumulated: 1,
      })
    }

    res.status(200).json({
      message: "purchased successfully",
      quantityAccumulated: users.get(`id-${ip}`).quantityAccumulated,
    })
  } catch (err) {
    next(err)
  }
})

//global error handler
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Backend running on port: ${config.PORT}`)
})
