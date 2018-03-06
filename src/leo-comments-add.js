import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/paper-input/paper-textarea.js'
import '../node_modules/@polymer/paper-button/paper-button.js'
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'

import './leo-avatar.js'


class LeoCommentsAdd extends PolymerElement {
  static get properties() {
    return {
      user: String,
      disabled: {
        type: Boolean,
        value: false
      }
    }
  }

  _addComment() {
    const text = this.$.input.value
    if (!text) return

    this.dispatchEvent(new CustomEvent('add-comment', {
      bubbles: true,
      composed: true,
      detail: { text }
    }))

    this.$.input.value = ''
  }

  _onKeyDown(e) {
    if ((e.which === 13 || e.keyCode === 13) && e.ctrlKey) {
      e.preventDefault()
      this._addComment()
    }
  }

  static get template() {
    return html`
      <style>
        :host {
          position: relative;
          padding: 0 16px 0 80px;
          display: block;
        }
        leo-avatar {
          position: absolute;
          left: 16px;
          top: 16px;
        }
        .buttons {
          margin-top: 8px;
          @apply --layout-horizontal;
          @apply --layout-end-justified;
        }
        paper-textarea {
          margin-top: -8px;
          outline: none;
          @apply --layout-flex;
        }
        paper-button {
          margin: 0;
          background-color: var(--primary-color);
          color: #fff;
        }
        paper-button[disabled] {
          opacity: .5;
        }
        .help-text {
          position: relative;
          top: -2px;
          font-size: 13px;
          line-height: 13px;
          font-weight: 300;
          color: var(--secondary-text-color);
        }
      </style>

      <leo-avatar user="[[user]]"></leo-avatar>

      <paper-textarea id="input" placeholder="Введите текст..." on-keydown="_onKeyDown"></paper-textarea>
      <div class="help-text">(Ctrl+Enter)</div>
      <div class="buttons">
        <paper-button on-click="_addComment" disabled="[[disabled]]">Добавить</paper-button>
      </div>
    `
  }
}

customElements.define('leo-comments-add', LeoCommentsAdd);
