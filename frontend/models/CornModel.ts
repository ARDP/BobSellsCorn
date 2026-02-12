import Backbone from "backbone"
import { ROUTES } from "@/utils"

export const CornModel = Backbone.Model.extend({
  urlRoot: ROUTES.CORN,
  defaults: {
    quantityAccumulated: 0,
  },
})
