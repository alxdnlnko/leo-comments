import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/paper-input/paper-textarea.js'
import '../node_modules/@polymer/paper-button/paper-button.js'
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'


class LeoCommentsAdd extends PolymerElement {
  static get properties() {
    return {
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

    this.$.input.value = '';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 0 16px;
        }
        .buttons {
          margin-top: 8px;
          @apply --layout-horizontal;
          @apply --layout-end-justified;
        }
        paper-textarea {
          margin-top: -24px;
          outline: none;
        }
        paper-button {
          margin: 0;
          background-color: var(--primary-color);
          color: #fff;
        }
        paper-button[disabled] {
          opacity: .5;
        }
      </style>

      <paper-textarea id="input" placeholder="Введите текст..."></paper-textarea>
      <div class="buttons">
        <paper-button on-click="_addComment" disabled="[[disabled]]">Добавить</paper-button>
      </div>
    `
  }
}

customElements.define('leo-comments-add', LeoCommentsAdd);
