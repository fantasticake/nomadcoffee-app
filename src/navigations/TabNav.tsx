import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import UploadStack from "./UploadStack";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="uploadStack"
        component={UploadStack}
      />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNav;
