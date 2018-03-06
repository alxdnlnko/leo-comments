import types from './action-types.js'

export default {
  loadComments: () => ({ type: types.COMMENTS_LOAD }),
  loadCommentsSuccess: (comments) => ({
    type: types.COMMENTS_LOAD_SUCCESS,
    payload: Object.keys(comments || {}).reduce((res, id) => ({ ...res, [id]: {
      ...comments[id],
      likers: Object.keys(comments[id].likers || {})
    }}), {})
  }),
  clearComments: () => ({ type: types.COMMENTS_CLEAR }),
  addComment: (id, comment) => ({
    type: types.COMMENTS_ADD, payload: { id, comment: {
      ...comment,
      likers: Object.keys(comment.likers || {})
    }}
  }),
  updateComment: (id, comment) => ({
    type: types.COMMENTS_UPDATE, payload: { id, comment: {
      ...comment,
      likers: Object.keys(comment.likers || {})
    }}
  }),
  createComment: (text) => ({ type: types.COMMENTS_CREATE, payload: { text }}),
  setLike: (commentId, user, newVal) => ({ type: types.COMMENTS_LIKE_SET, payload: { id: commentId, user, newVal }})
}
