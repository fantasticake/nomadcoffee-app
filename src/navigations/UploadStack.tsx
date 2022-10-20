import { createStackNavigator } from "@react-navigation/stack";
import NewShop from "../screens/NewShop";
import Upload from "../screens/Upload";
import CameraTab from "./CameraTab";

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="upload" component={Upload}></Stack.Screen>
      <Stack.Screen name="newShop" component={NewShop}></Stack.Screen>
      <Stack.Screen name="cameraTab" component={CameraTab}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UploadStack;
