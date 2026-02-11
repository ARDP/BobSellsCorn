import { describe, it, expect, afterEach } from "vitest"
import { AlertView } from "../views/AlertView.js"
import { IAlertView } from "@/interfaces.js"

describe("AlertView", () => {
  let view: IAlertView
  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("displays the message passed in the constructor", () => {
    const testMessage = "Too many requests, slow down!"

    // 1. Create the view with the message
    view = new AlertView({ message: testMessage })

    // 2. Append it to the document so querySelector works
    document.body.appendChild(view.el)

    // 3. Check the content
    const alertContent = document.querySelector(".alert-container")?.innerHTML
    expect(alertContent).toContain(testMessage)
  })

  it("removes itself when the close button is clicked", () => {
    view = new AlertView({ message: "Closing time" })
    document.body.appendChild(view.el)

    const closeButton = view.$(".close-alert")
    closeButton.click()

    // In Backbone, .remove() removes the element from the DOM
    const alertElement = document.querySelector(".alert-container")
    expect(alertElement).toBeNull()
  })
})
