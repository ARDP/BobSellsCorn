import $ from "jquery"
import Backbone from "backbone"
import { AppRouter } from "./router.js"

$(function () {
  new AppRouter()
  Backbone.history.start()

  console.log("Application is running via Router.")
})
