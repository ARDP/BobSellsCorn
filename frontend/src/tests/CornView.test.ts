/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from "vitest"
import { CornView } from "@/views/CornView"
import { CornModel } from "../../models/CornModel" //TODO: fix this to use @
import { ICornModel, ICornView } from "@/interfaces"

describe("CornView", () => {
  let model: ICornModel
  let view: ICornView

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    model = new CornModel()

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ quantityAccumulated: 10 }),
    })

    vi.stubGlobal("fetch", fetchMock)

    view = new CornView({ el: "#app", model })
  })

  it("updates the UI when the buy button is clicked", async () => {
    view.render()

    const saveSpy = vi
      .spyOn(model, "save")
      .mockImplementation(() => model as unknown as JQueryXHR)

    const button = view.$("#submit-corn")
    button.trigger("click")

    expect(saveSpy).toHaveBeenCalledTimes(1)
  })
})
