import Backbone from "backbone"

export interface IAlertView extends Backbone.View {
  message: string
}

export interface ICornView extends Backbone.View {
  handlePurchase: (e: JQuery.Event) => void
}

export interface ICornModel extends Backbone.Model {
  defaults(): Record<string, string>
}
