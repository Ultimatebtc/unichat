import { Stack } from "expo-router";

export default function RootLayout() {
  const session = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={session}>
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
      </Stack.Protected>

      <Stack.Protected guard={!session}>
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
      </Stack.Protected>
    </Stack>
  );
}
