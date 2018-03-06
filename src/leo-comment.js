import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'
import '../node_modules/@polymer/paper-button/paper-button.js'
import '../node_modules/@polymer/iron-icon/iron-icon.js'

import './leo-icons.js'
import './leo-avatar.js'


class LeoComment extends PolymerElement {
  static get properties() {
    return {
      author: String,
      text: String,
      timestamp: Date,
      likesCount: Number,
      liked: Boolean,
      placeholder: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  _getDate(timestamp) {
    return moment(timestamp).calendar()
  }

  _toggleLike() {
    this.dispatchEvent(new CustomEvent('toggle-like', { bubbles: true, composed: true }))
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          padding: 24px 16px 24px 80px;
          @apply --layout-vertical;
        }
        :host([placeholder]) {
          height: 48px;
        }
        :host([placeholder])::before {
          position: absolute;
          top: 24px;
          left: 80px;
          width: 100px;
          height: 20px;
          content: "";
          display: block;
          background: var(--primary-color);
          border-radius: 4px;
          opacity: .3;
        }
        :host([placeholder])::after {
          position: absolute;
          top: 56px;
          left: 80px;
          width: 180px;
          height: 20px;
          content: "";
          display: block;
          background: var(--divider-color);
          border-radius: 4px;
        }
        :host([placeholder]) leo-avatar {
          opacity: .5;
        }
        leo-avatar {
          position: absolute;
          left: 16px;
          top: 24px;
        }
        .header {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
        }
        .author {
          margin-right: 8px;
          font-weight: 400;
          color: var(--primary-color);
          white-space: nowrap;
          @apply --layout-flex;
        }
        .date {
          font-size: 80%;
          font-weight: 300;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: right;
        }
        .text {
          margin-top: 4px;
          font-weight: 300;
        }
        paper-button {
          padding: 4px;
          margin: 0;
          margin-left: 8px;
          min-width: 0;
        }
        .likes {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-color);
        }
        .likes > iron-icon {
          margin-right: 2px;
          width: 16px;
          height: 16px;
          font-size: 18px;
          line-height: 14px;
        }
        .likes:not([liked]) > iron-icon {
          opacity: .4;
        }
      </style>

      <leo-avatar user="[[author]]"></leo-avatar>

      <div class="header">
        <div class="author">[[author]]</div>
        <div class="date">[[_getDate(timestamp)]]</div>
        <paper-button class="likes" liked$="[[liked]]" on-click="_toggleLike">
          <iron-icon icon="leo-icons:heart"></iron-icon>
          [[likesCount]]
        </paper-button>
      </div>
      <div class="text">[[text]]</div>
    `
  }
}

customElements.define('leo-comment', LeoComment)
