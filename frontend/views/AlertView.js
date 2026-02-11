import Backbone from "backbone"
import _ from "underscore"

const ALERT_TEMPLATE = `
  <div class="alert-content">
    <span><%- message %></span>
    <button class="close-alert">&times;</button>
  </div>
`

const renderMethod = function () {
  const html = _.template(ALERT_TEMPLATE)({ message: this.message })
  this.$el.html(html)
  return this
}

const init = function (options) {
  this.message = options.message || "Alert alert!"
  this.render()
}

export const AlertView = Backbone.View.extend({
  tagName: "div",
  className: "global-alert",
  events: {
    "click .close-alert": "remove",
  },
  initialize: init,
  render: renderMethod,
})
