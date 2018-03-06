import { Element as PolymerElement, html }
  from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

import ReduxMixin, { actions, selectors } from './leo-store.js'
import './leo-comment.js'


class LeoComments extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      _user: {
        type: Array,
        statePath: selectors.getUser
      },

      _comments: {
        type: Array,
        statePath: selectors.getComments
      },

      _isLoading: {
        type: Boolean,
        statePath: selectors.getIsLoading
      }
    }
  }

  _isLiked(likers, user) {
    return likers.indexOf(user) !== -1;
  }

  _toggleLike({ model: { comment }}) {
    const isLiked = comment.likers.indexOf(this._user) !== -1
    this.dispatch(actions.setLike(comment.id, this._user, !isLiked))
  }

  static get template() {
    return html`
      <style>
        :host {
          padding-bottom: 16px;
          display: block;
        }
        .header {
          padding: 0 16px;
          font-weight: 300;
          color: var(--secondary-text-color);
        }
        leo-comment:not([placeholder]):not(:first-child)::before {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 80px;
          height: 0;
          border-top: 1px solid var(--divider-color);
        }
      </style>

      <div hidden$="[[!_isLoading]]">
        <leo-comment placeholder></leo-comment>
        <leo-comment placeholder></leo-comment>
      </div>

      <div>
        <template is="dom-repeat" items="[[_comments]]" as="comment">
          <leo-comment
            author="[[comment.author]]"
            text="[[comment.text]]"
            timestamp="[[comment.timestamp]]"
            likes-count="[[comment.likers.length]]"
            liked="[[_isLiked(comment.likers, _user)]]"
            on-toggle-like="_toggleLike">
          </leo-comment>
        </template>
      </div>
    `
  }
}

customElements.define('leo-comments', LeoComments)
