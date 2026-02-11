import Backbone from "backbone"
import { CornModel } from "./models/CornModel.js"
import { CornView } from "./views/CornView.js"

export const AppRouter = Backbone.Router.extend({
  routes: {
    "": "index", // The default home route
    // Additional routes can be defined here
    // e.g., "about": "aboutPage"
  },

  index: function () {
    const model = new CornModel()
    const view = new CornView({ model: model })
    view.render()
    document.querySelector("#app").innerHTML = "" // Clear existing content
    document.querySelector("#app").appendChild(view.el)
  },
  // Additional route handlers can be added here
  // e.g., aboutPage: function () { ... }
})
