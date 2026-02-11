import { it, expect, describe, beforeEach } from "vitest"
import request from "supertest"
import { app, users } from "../index.js"

describe("Corn API - Purchase & Rate Limiting", () => {
  beforeEach(() => {
    users.clear()
  })

  it("allows a user to successfully purchase corn", async () => {
    const res = await request(app).post("/api/corn")

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("quantityAccumulated", 1)
    expect(res.body.message).toContain("success")
  })

  it("blocks the same IP from purchasing twice within the limit", async () => {
    await request(app).post("/api/corn").set("X-Forwarded-For", "1.1.1.1")

    const res = await request(app)
      .post("/api/corn")
      .set("X-Forwarded-For", "1.1.1.1")

    expect(res.status).toBe(429)
  })

  it("allows different users to purchase independently", async () => {
    await request(app).post("/api/corn").set("X-Forwarded-For", "1.1.1.1")

    const resUserB = await request(app)
      .post("/api/corn")
      .set("X-Forwarded-For", "2.2.2.2")

    expect(resUserB.status).toBe(200)
  })
})
