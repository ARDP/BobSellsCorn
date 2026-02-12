import { config } from "./config/index.js"
import express from "express"
import { errorHandler } from "./middlewares/errorHandler.js"
import { checkRateLimitMiddleware } from "./middlewares/rateLimit.js"
import { User } from "./types/index.js"
export const app = express()

//just for purpose of this challengue cause this is in memory storage and will be reseted on server restart
//plus it wont scale well
//also the corn api should have its own folder and file but for the purpose of this challenge i put it here

export const users = new Map<string, User>()

app.use(express.static(config.STATIC_PATH))

app.post("/api/corn", checkRateLimitMiddleware(users), (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.ip || "ip-not-found"
    const date = Date.now()
    let user = users.get(`id-${ip}`)

    if (user) {
      user.lastPurchasedDate = date
      user.quantityAccumulated += 1
    } else {
      user = {
        lastPurchasedDate: date,
        quantityAccumulated: 1,
      }
      users.set(`id-${ip}`, user)
    }

    res.status(200).json({
      message: "purchased successfully",
      quantityAccumulated: user.quantityAccumulated,
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
