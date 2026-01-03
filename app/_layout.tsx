import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
<Stack.Screen
  name="index" options={{ title: "Home",headerTitleAlign: 'center', }}
/>
<Stack.Screen
  name="details" options={{ title: "Details", 
    headerBackButtonDisplayMode: "minimal",
    headerTitleAlign: 'center',
    presentation: "formSheet",
    sheetAllowedDetents: [0.4, 0.6, 1],
    sheetInitialDetentIndex: 0,
    sheetCornerRadius: 24,         
    sheetLargestUndimmedDetentIndex: 0,
    sheetGrabberVisible: true,
    headerShown: false
  }}
/>
  </Stack>;
}
