import * as Font from "expo-font";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const preload = async () => {
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
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

