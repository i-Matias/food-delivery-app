import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="signIn"
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign Up",
        }}
      />
    </Stack>
  );
}
