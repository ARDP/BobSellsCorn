import { config } from "../config/index.js"
import { User } from "../types/index.js"
import { RequestHandler } from "express"
export const checkRateLimitMiddleware = (
  users: Map<string, User>,
): RequestHandler => {
  // This inner function is the actual Express middleware
  return (req, res, next) => {
    try {
      // added the req.headers["x-forwarded-for"] because
      // the tests were failing
      // Explicitly checking headers to identify client IPs without relying
      // on app.set('trust proxy', true);
      // basically express is ignored the header and looked at the actual connection IP
      // because it is not configured to trust the proxy

      const ip = req.headers["x-forwarded-for"] || req.ip || "ip-not-found"
      const date = Date.now()
      const user = users.get(`id-${ip}`)

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
