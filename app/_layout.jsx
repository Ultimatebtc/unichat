import { Stack } from "expo-router";
import { AuthProvider, AuthContext } from "../config/auth-context";
import { useState, useContext, useEffect } from "react";

export default function RootLayout() {
  const { currentUser } = useContext(AuthContext);
  const [session,setSession] = useState(false);

  useEffect(() => {
    if (currentUser !== true) {
      setSession(true);
    } else {
      setSession(false);
    }
  },[currentUser]);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "Home",
              headerShown: false,
            }} />
          <Stack.Screen
            name="create-discussion"
            options={{
              title: "Create discussion",
              headerShown: true
            }} />

          <Stack.Screen
            name="index"
            options={{
              title: "Create account",
              headerShown: false
            }} />
          <Stack.Screen
            name="sign-in"
            options={{
              title: "Sign in",
              headerShown: false
            }} />
      </Stack>
    </AuthProvider>
  );
}
