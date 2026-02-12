import $ from "jquery"
import Backbone from "backbone"
import _ from "underscore"
import { AlertView } from "./AlertView.js"
import { ICornView } from "@/interfaces.js"

const CORN_TEMPLATE = `
    <div class="title-wrapper">
        <h4 class="title">Bob Sells 🌽</h4>
    </div>

    <div class="shop-card">
        <p class="quantity">Purchased: <%- quantityAccumulated %></p>
        <button id="submit-corn" class="mui-button">Buy Corn</button>
    </div>
`

const renderMethod = function (this: ICornView) {
  const data = this.model.toJSON()
  const html = _.template(CORN_TEMPLATE)(data)
  this.$(".shop-container").html(html)
  return this
}

const handlePurchaseMethod = function (
  this: ICornView,
  e: JQuery.TriggeredEvent,
) {
  e.preventDefault()
  const $btn = $(e.currentTarget).closest("button")
  const isIdeal = $btn.hasClass("buy-btn-ideal")
  const isZombie = $btn.hasClass("buy-btn-zombie")

  if (isZombie) {
    document.body.appendChild(
      new AlertView({ message: "Zombie: Memory Leak!", isZombieMode: true }).el,
    )
    return
  }

  if (isIdeal) {
    $btn.prop("disabled", true).text("🔒 Waiting (60s limit)...")
  }

  this.model.save(
    {},
    {
      wait: true,
      success: () => {
        const msg = isIdeal
          ? "✅ Ideal: Protected & Clean!"
          : "🧹 Clean but Spammable!"
        document.body.appendChild(
          new AlertView({ message: msg, isZombieMode: false }).el,
        )

        if (isIdeal) {
          setTimeout(() => {
            $btn.prop("disabled", false).text("Buy (Ideal Mode)")
          }, 60000)
        }
      },
      error: (_model, xhr) => {
        const msg =
          xhr.status === 429 ? "⏳ Please wait 60 seconds." : "❌ Error"
        document.body.appendChild(
          new AlertView({ message: msg, isZombieMode: false }).el,
        )

        if (isIdeal) {
          const delay = xhr.status === 429 ? 60000 : 0
          setTimeout(() => {
            $btn.prop("disabled", false).text("Buy (Ideal Mode)")
          }, delay)
        }
      },
    },
  )
}

const init = function (this: ICornView) {
  this.listenTo(this.model, "change", this.render)
}

export const CornView = Backbone.View.extend({
  el: "#app",
  events: {
    "click .buy-btn-zombie": "handlePurchase",
    "click .buy-btn-spam": "handlePurchase",
    "click .buy-btn-ideal": "handlePurchase",
    "click #submit-corn": "handlePurchase",
  },
  initialize: init,
  render: renderMethod,
  handlePurchase: handlePurchaseMethod,
})
