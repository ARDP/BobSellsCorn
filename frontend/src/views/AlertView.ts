import { IAlertView } from "@/interfaces"
import Backbone from "backbone"
import _ from "underscore"

const ALERT_TEMPLATE = `
  <div class="alert-content">
    <span><%- message %></span>
    <button class="close-alert">&times;</button>
  </div>
`

const renderMethod = function (this: IAlertView) {
  const html = _.template(ALERT_TEMPLATE)({ message: this.message })
  this.$el.html(html)
  return this
}

const init = function (this: IAlertView, options: { message?: string }) {
  this.message = options.message || "Alert alert!"
  this.render()
}

export const AlertView = Backbone.View.extend({
  tagName: "div",
  className: "alert-container",
  events: {
    "click .close-alert": "remove",
  },
  initialize: init,
  render: renderMethod,
})
