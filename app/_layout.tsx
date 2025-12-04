import { Stack, } from "expo-router";


export default function RootLayout() {
  const auth = true;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {auth
        ?
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Home",
            headerShown: false,
          }} />
        :
        <Stack.Screen
          name="index"
          options={{
            title: "Create account",
            headerShown: false
          }} />}

      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign in",
          headerShown: false
        }} />

      <Stack.Screen
        name="create-discussion"
        options={{
          title: "Create discussion",
          headerShown: true
        }} />
    </Stack>
  );
}
