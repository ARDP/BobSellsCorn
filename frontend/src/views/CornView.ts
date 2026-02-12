import Backbone from "backbone"
import _ from "underscore"
import { AlertView } from "./AlertView.js"
import { ICornView } from "@/interfaces.js"

//Views logic if grows too much can be moved to the CornModel.js
const CORN_TEMPLATE = `
    <div class="shop-container">
        <h2>Corn Shop</h2>
        <p>Purchased: <%- quantityAccumulated %></p>
        <button id="submit-corn">Buy Corn</button>
    </div>
`

const renderMethod = function (this: ICornView) {
  const data = this.model.toJSON()
  const html = _.template(CORN_TEMPLATE)(data)
  this.$el.html(html)
  return this
}

const handlePurchaseMethod = function (this: ICornView, e: JQuery.Event) {
  e.preventDefault()
  this.model.save(
    {},
    {
      wait: true,
      error: (_model, xhr) => {
        if (xhr.status === 429) {
          const notification = new AlertView({
            message:
              "1 corn per 60 seconds. Please wait before purchasing more.",
          })
          document.body.appendChild(notification.el)
        }
      },
    },
  )
}

const init = function (this: ICornView) {
  this.listenTo(this.model, "change", this.render)
  // since i do it in router doing render here it will cause double render
  // this.render()
}

export const CornView = Backbone.View.extend({
  tagName: "section",
  className: "corn-component",
  events: { "click #submit-corn": "handlePurchase" },
  initialize: init,
  render: renderMethod,
  handlePurchase: handlePurchaseMethod,
})
