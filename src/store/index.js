import { createStore, applyMiddleware  } from 'redux';
// import reducer from './reducers/themeReducer'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk'
import reducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
    
  }
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export {
    store,persistor
}




  

  
 
  