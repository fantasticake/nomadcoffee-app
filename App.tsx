import * as Font from "expo-font";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "./src/navigations/TabNav";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo";
import { tokenVar } from "./src/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const preload = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) tokenVar(token);
      await Font.loadAsync(Ionicons.font);
      await Asset.loadAsync([require("./assets/favicon.png")]);
    };
    try {
      preload();
    } catch (e) {
      console.warn(e);
    } finally {
      SplashScreen.hideAsync();
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </ApolloProvider>
  );
}

