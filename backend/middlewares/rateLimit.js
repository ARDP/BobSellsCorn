import { config } from "../config/index.js"
export const checkRateLimitMiddleware = (users) => {
  // This inner function is the actual Express middleware
  return (req, res, next) => {
    try {
      const ip = req.ip
      const date = Date.now()
      if (users.has(`id-${ip}`)) {
        const user = users.get(`id-${ip}`)
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
