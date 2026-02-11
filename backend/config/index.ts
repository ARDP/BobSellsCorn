import "dotenv/config"
import { fileURLToPath } from "url"
import path from "path"

const defaults = {
  PORT: 3000,
  RATE_LIMIT: 60000, // 1 min
  PATH_TO_FRONTEND: "frontend",
}
if (
  !process.env.RATE_LIMIT ||
  !process.env.PORT ||
  !process.env.PATH_TO_FRONTEND
) {
  console.warn("An environment variable is missing.")
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const resolvedFrontendPath = path.resolve(__dirname, "..", "..", "frontend")
// Validate and export
export const config = {
  PORT: process.env.PORT || defaults.PORT,
  RATE_LIMIT: process.env.RATE_LIMIT
    ? parseInt(process.env.RATE_LIMIT, 10)
    : defaults.RATE_LIMIT,
  STATIC_PATH: resolvedFrontendPath,
}
