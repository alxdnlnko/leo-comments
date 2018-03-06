import api from './api.js'
import actions from './actions.js'
import types from './action-types.js'
import selectors from './selectors.js'

const { eventChannel, effects: { call, fork, select, takeEvery, put }} = ReduxSaga


function* loadComments() {
  yield put(actions.loadComments());
  const comments = yield call(api.loadComments)
  yield put(actions.loadCommentsSuccess(comments.val()))
}

function* createComment({ payload: { text }}) {
  const user = yield select(selectors.getUser)
  const id = yield call(api.getNewCommentId)
  const comment = {
    id,
    author: user,
    text,
    timestamp: +new Date(),
    likers: { }
  }
  yield put(actions.addComment(id, comment))
  yield call(api.setComment, id, comment)
}

function _createCommentsChannel(ref) {
  return eventChannel(emit => {

    ref.on('child_added', data => {
      emit({ event: 'child_added', payload: data.val() })
    })

    ref.on('child_changed', data => {
      emit({ event: 'child_changed', payload: data.val() })
    })

    return () => ref.off()
  })
}

function* commentsChanged(change) {
  if (change.event === 'child_added')
    yield put(actions.addComment(change.payload.id, change.payload))
  else
    yield put(actions.updateComment(change.payload.id, change.payload))
}

function* clearComments() {
  yield call(api.clearComments);
}

function* setLike({ payload: { id, user, newVal }}) {
  yield call(api.setLike, id, user, newVal)
}

export default function*() {
  yield call(loadComments)

  const commentsChannel = _createCommentsChannel(api.getCommentsRef())
  yield takeEvery(commentsChannel, commentsChanged)
  yield takeEvery(types.COMMENTS_CLEAR, clearComments)
  yield takeEvery(types.COMMENTS_CREATE, createComment)
  yield takeEvery(types.COMMENTS_LIKE_SET, setLike)
}
