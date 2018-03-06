var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import types from './action-types.js';

export default {
  loadComments: () => ({ type: types.COMMENTS_LOAD }),
  loadCommentsSuccess: comments => ({
    type: types.COMMENTS_LOAD_SUCCESS,
    payload: Object.keys(comments || {}).reduce((res, id) => _extends({}, res, { [id]: _extends({}, comments[id], {
        likers: Object.keys(comments[id].likers || {})
      }) }), {})
  }),
  clearComments: () => ({ type: types.COMMENTS_CLEAR }),
  addComment: (id, comment) => ({
    type: types.COMMENTS_ADD, payload: { id, comment: _extends({}, comment, {
        likers: Object.keys(comment.likers || {})
      }) }
  }),
  updateComment: (id, comment) => ({
    type: types.COMMENTS_UPDATE, payload: { id, comment: _extends({}, comment, {
        likers: Object.keys(comment.likers || {})
      }) }
  }),
  createComment: text => ({ type: types.COMMENTS_CREATE, payload: { text } }),
  setLike: (commentId, user, newVal) => ({ type: types.COMMENTS_LIKE_SET, payload: { id: commentId, user, newVal } })
};