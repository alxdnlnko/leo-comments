import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'

import ReduxMixin from './leo-store.js'
import './leo-product.js'


class LeoApp extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 48px 0 128px;
        }
      </style>

      <leo-product></leo-product>
    `
  }
}

customElements.define('leo-app', LeoApp)
