import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import My from "../screens/My";
import MyRewards from "../screens/MyRewards";
import MyProjects from "../screens/MyProjects";
import MyCommunity from "../screens/MyCommunity";
import MyFinances from "../screens/MyFinances";
import ChatList from '../screens/ChatList';
import { Entypo, MaterialCommunityIcons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import ProjectDetails from "../screens/ProjectDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: "" }}>
      <Tab.Screen
        name="MyRewards"
        component={MyRewards}
        options={{
          tabBarLabel: "MyRewards",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="medal" size={24} color="cornflowerblue" />
          ),
        }}
      />
      <Tab.Screen
        name="MyFinances"
        component={MyFinances}
        options={{
          tabBarLabel: "MyFinances",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="finance" size={24} color="cornflowerblue" />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarLabel: "My",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="cloud" size={40} color="cornflowerblue" />
          ),
        }}
      />
      <Tab.Screen
        name="MyProjects"
        component={MyProjects}
        options={{
          tabBarLabel: "MyProjects",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={24} color="cornflowerblue" />
          ),
        }}
      />
      <Tab.Screen
        name="MyCommunity"
        component={ChatList}
        options={{
          tabBarLabel: "MyCommunity",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={24} color="cornflowerblue" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={MyCommunity}
        options={({ route }) => ({ title: route.params.chatName })}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
