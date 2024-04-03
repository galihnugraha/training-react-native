import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { persistor, store } from "./src/store/storages"
import { PersistGate } from 'redux-persist/integration/react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'

import Router from './src/services/router'
import FONTS from './src/assets/fonts'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts(FONTS.JosefinSans)

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View style={{ flex:1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null}  persistor={persistor}>
          <NavigationContainer>
            <Router/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  )
}