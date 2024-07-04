import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MedplumClient } from "@medplum/core";
import {Provider} from 'react-redux';
import {
  ExpoClientStorage,
  polyfillMedplumWebAPIs,
} from "@medplum/expo-polyfills";
import { MedplumProvider } from "@medplum/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import MainContainer from "@navigation/MainContainer";

import { configureStore } from './src/store';
const { store } = configureStore();

import { BASE_API_URL } from "@constants/environment";

const medplum = new MedplumClient({
  baseUrl: BASE_API_URL,
  storage: new ExpoClientStorage(),
});

polyfillMedplumWebAPIs();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MedplumProvider medplum={medplum}>
          <View style={styles.container}>
            <NavigationContainer>
              <MainContainer />
            </NavigationContainer>
            <StatusBar style="auto" />
          </View>
        </MedplumProvider>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
});
