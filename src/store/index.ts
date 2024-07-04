import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { withExtraArgument } from 'redux-thunk';
import { reduxStorage } from '@utils/storage';

import bleReducer from '../reducers/bleReducer';
import navigationReducer from '../reducers/navigation';
import {
  BLE_REDUCER,
  NAVIGATION_REDUCER,
} from 'src/constants/reducers';
import { bleManager } from '@services/ble';

type PersistConfig = {
    key: string;
    storage: Storage;
    timeout: number | undefined;
    whitelist: string[];
    blacklist: string[];
}

export const configureStore = () => {
  const middlewares = [
    withExtraArgument(bleManager),
  ];

  const persistConfig: PersistConfig = {
    key: 'root',
    storage: reduxStorage,
    whitelist: [
      NAVIGATION_REDUCER,
    ],
    blacklist: [BLE_REDUCER],
  };

  const rootReducer = combineReducers({
    ble: bleReducer,
    navigation: navigationReducer,
  });

  const persitedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persitedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  return {store, persistor};
};
