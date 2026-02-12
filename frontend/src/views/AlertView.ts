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

const init = function (
  this: IAlertView,
  options: { message?: string; isZombieMode?: boolean },
) {
  this.message = options.message || "Alert alert!"
  this.isZombieMode = options.isZombieMode || false
  this.render()
}

const onAnimatioEnd = function (this: IAlertView) {
  if (this.isZombieMode) {
    console.log("Zombie Mode: View retained in DOM.")
    return
  }
  this.remove()
}

export const AlertView = Backbone.View.extend({
  tagName: "div",
  className: "alert-container",
  events: {
    "click .close-alert": "remove",
    animationend: "onAnimationEnd",
  },
  initialize: init,
  render: renderMethod,
  onAnimationEnd: onAnimatioEnd,
})
