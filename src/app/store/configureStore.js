// import {createStore} from 'redux';
// import rootReducer from '../reducers/index';

// export default function configureStore(initialState) {
//   const store = createStore(rootReducer, initialState);
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducer = rootReducer;
//       store.replaceReducer(nextReducer);
//     });
//   }
//   return store;
// }
import {compose, createStore} from 'redux';
import rootReducer from '../reducers';

import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';

export default function configureStore(initialState) {
  const reducer = compose(
    mergePersistedState()
  )(rootReducer, initialState);

  const storage = adapter(window.localStorage);

  const createPersistentStore = compose(
    persistState(storage, 'state')
  )(createStore);

  const store = createPersistentStore(reducer);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
