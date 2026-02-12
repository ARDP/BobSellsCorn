import { ErrorRequestHandler } from "express"
//as in the official page of express but changed to send a json instead of html for not breaking backbone
export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: err.message || "Internal Server Error" })
}
