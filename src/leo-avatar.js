import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/iron-icon/iron-icon.js'
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'

import './leo-icons-avatars.js'


class LeoAvatar extends PolymerElement {
  static get properties() {
    return {
      user: String
    }
  }

  _getAvatarIcon(user) {
    const id = user.split('-')[1]
    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const num = id.split('').reduce((res, l) => res + letters.indexOf(l), 0)
    return `leo-avatars:user-${(num % 6) + 1}`
  }

  static get template() {
    return html`
      <style>
        :host {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary-color);
          overflow: hidden;
          @apply --layout-vertical;
          @apply --layout-center-center;
        }
        :host > iron-icon {
          position: relative;
          top: 1px;
          width: 48px;
          height: 48px;
          opacity: .9;
        }
      </style>

      <iron-icon icon="[[_getAvatarIcon(user)]]"></iron-icon>
    `
  }
}

customElements.define('leo-avatar', LeoAvatar);
