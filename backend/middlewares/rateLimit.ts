import { config } from "../config/index.js"
import { User } from "../types/index.js"
import { RequestHandler } from "express"
export const checkRateLimitMiddleware = (
  users: Map<string, User>,
): RequestHandler => {
  // This inner function is the actual Express middleware
  return (req, res, next) => {
    try {
      const ip = req.ip || "ip-not-found"
      const date = Date.now()
      let user = users.get(`id-${ip}`)

      if (user) {
        //check if 1 minute has passed since the last buy if not block with too many requests
        const howLongHasPassed = date - user.lastPurchasedDate
        if (howLongHasPassed < config.RATE_LIMIT) {
          console.log("A minute has not passed yet")
          return res.status(429).json({ error: "Too many requests" })
        }
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
