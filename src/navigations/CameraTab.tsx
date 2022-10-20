import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Album from "../screens/Album";
import Camera from "../screens/Camera";

const Tab = createMaterialTopTabNavigator();

const CameraTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="camera" component={Camera} />
      <Tab.Screen name="album" component={Album} />
    </Tab.Navigator>
  );
};

export default CameraTab;
