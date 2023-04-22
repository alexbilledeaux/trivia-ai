import React from "react";
import {useRef, useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FirebaseAnalytics } from 'expo-firebase-analytics';

// Screens
import HomeScreen from "./screens/HomeScreen";
import ReportScreen from "./screens/ReportScreen";
import LobbyScreen from "./screens/LobbyScreen";
import TriviaScreen from "./screens/TriviaScreen";
import CreateLobbyScreen from "./screens/CreateLobbyScreen";
import EndScreen from "./screens/EndScreen";
import ReviewQuestionScreen from "./screens/ReviewQuestionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      theme={TriviaTheme}
      // Implimenting FB analytics from Week 11
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={ async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await FirebaseAnalytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator screenOptions={navStyling}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create Lobby" component={CreateLobbyScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="ReviewQuestion" component={ReviewQuestionScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Trivia" component={TriviaScreen} />
        <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: "#3B3B3D",
    borderStyle: "none"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const TriviaTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#05B7FD'
  }
}
