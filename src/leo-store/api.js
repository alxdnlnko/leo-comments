var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const database = firebase.database();

function loadComments() {
  return database.ref('comments/').once('value');
}

function getNewCommentId() {
  return database.ref().child('comments').push().key;
}

function setComment(id, comment) {
  return database.ref(`comments/${id}`).set(_extends({}, comment, {
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    likers: {}
  }));
}

function getCommentsRef() {
  return database.ref('comments');
}

function setLike(id, user, newVal) {
  return database.ref(`comments/${id}/likers/`).update({ [user]: newVal ? true : null });
}

function clearComments() {
  return database.ref().set({ comments: null });
}

export default {
  loadComments,
  getNewCommentId,
  setComment,
  setLike,
  clearComments,
  getCommentsRef
};