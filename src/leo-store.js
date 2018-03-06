import PolymerRedux from '../node_modules/polymer-redux/polymer-redux.js'

import reducers from './leo-store/reducers.js'
import actions from './leo-store/actions.js'
import selectors from './leo-store/selectors.js'
import sagas from './leo-store/sagas.js'


const { createStore, applyMiddleware, compose } = Redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = ReduxSaga.default()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(reducers, enhancer)

sagaMiddleware.run(sagas)


export default PolymerRedux(store)
export { reducers, actions, selectors }
