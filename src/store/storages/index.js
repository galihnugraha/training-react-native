import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rootReducer from '../reducers'

const persistConfig = {
  key: "redux", // id untuk local storage
  storage: AsyncStorage, // local storage yang dipakai
  // list data yang perlu di simpan dan tidak terhapus
	whitelist: ["dataCount", 'dataLogin'], 
  blacklist: [], // list data yang tidak perlu disimpan(optional).
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
    console.log('ERROR SET STORAGE :', e)
  }
}

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
    console.log('ERROR GET STORAGE :', e)
  }
}

export const clearData = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // error reading value
    console.log('ERROR DELETE STORAGE :', e)
  }
}