import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/paper-button/paper-button.js'
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'
import '../node_modules/@polymer/iron-icon/iron-icon.js'

import ReduxMixin, { actions, selectors } from './leo-store.js'
import './leo-comments.js'
import './leo-comments-add.js'
import './leo-icons.js'


class LeoProduct extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      _user: {
        type: Array,
        statePath: selectors.getUser
      },

      _isLoading: {
        type: Boolean,
        statePath: selectors.getIsLoading
      },

      _commentsCount: {
        type: Number,
        statePath: selectors.getCommentsCount
      },

      _commentsCountText: {
        type: String,
        computed: '__commentsCountText(_isLoading, _commentsCount)'
      }
    }
  }

  __commentsCountText(isLoading, commentsCount) {
    if (isLoading) return '...'
    return commentsCount
  }

  _createComment({ detail: { text }}) {
    this.dispatch(actions.createComment(text))
  }

  _clearComments() {
    this.dispatch(actions.clearComments());
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .card {
          padding-bottom: 16px;
          background-color: #fff;
          border: 1px solid #eaeaea;
          border-bottom-width: 3px;
        }
        .product {}
        .product-image {
          width: 100%;
          height: 240px;
          background-color: var(--primary-color);
          @apply --layout-vertical;
          @apply --layout-center-center;
        }
        .product-image > iron-icon {
          width: 96px;
          height: 96px;
          color: rgba(255,255,255,.4);
        }
        .product-desc {
          padding: 32px 16px;
          font-weight: 400;
        }
        .header {
          padding: 16px;
          font-weight: 300;
          color: var(--secondary-text-color);
          border-top: 1px solid var(--divider-color);
        }
        .header-comments {
          padding-bottom: 0;
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
        }
        .header-comments > paper-button {
          position: relative;
          left: 4px;
          top: 2px;
          padding: 4px;
          font-size: 14px;
          text-transform: none;
          color: var(--primary-color);
        }
        .loader {
          font-size: 13px;
          color: var(--secondary-text-color);
        }
      </style>

      <div class="card">
        <div class="product">
          <div class="product-image">
            <iron-icon icon="leo-icons:gift"></iron-icon>
          </div>
          <div class="product-desc">
            Самый лучший товар по самой низкой цене!
          </div>
        </div>

        <div class="header header-comments">
          <span>Комментарии ([[_commentsCountText]])</span>
          <paper-button on-click="_clearComments" hidden$="[[!_commentsCount]]">Очистить</paper-button>
        </div>
        <leo-comments></leo-comments>

        <div class="header">
          Добавить комментарий
        </div>
        <leo-comments-add
          user="[[_user]]"
          on-add-comment="_createComment"
          disabled="[[_isLoading]]"></leo-comments-add>

      </div>
    `
  }
}

customElements.define('leo-product', LeoProduct)
