import types from './action-types.js'

const { combineReducers } = Redux


const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case types.COMMENTS_LOAD_SUCCESS:
      return { ...payload }
    case types.COMMENTS_CLEAR:
      return {}
    case types.COMMENTS_ADD:
      if (state[payload.id]) return state
      return { ...state, [payload.id]: { ...payload.comment }}
    case types.COMMENTS_UPDATE:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload.comment
        }
      }
    case types.COMMENTS_LIKE_SET:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          likers: ( payload.newVal ?
            [ ...state[payload.id].likers, payload.user ] :
            state[payload.id].likers.filter(u => u !== payload.user))
        }
      }
    default:
      return state;
  }
}

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case types.COMMENTS_LOAD_SUCCESS:
      return [ ...Object.keys(payload) ]
    case types.COMMENTS_CLEAR:
      return []
    case types.COMMENTS_ADD:
      if (state.indexOf(payload.id) !== -1) return state
      return [ ...state, payload.id ]
    default:
      return state
  }
}

const _initUser = () => {
  let user = _getCookie('leo-comments-user')
  if (user) return user

  user = `User-${Math.random().toString(36).substring(7)}`
  _setCookie('leo-comments-user', user, 90)
  return user
}
const user = (state = _initUser()) => state

const isLoading = (state = false, { type }) => {
  switch (type) {
    case types.COMMENTS_LOAD:
      return true
    case types.COMMENTS_LOAD_SUCCESS:
      return false
    default:
      return state
  }
}

export default combineReducers({
  user,
  byId,
  allIds,
  isLoading
})


function _getCookie(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

function _setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    var expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
