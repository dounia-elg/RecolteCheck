import { Stack, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../src/config/firebase";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const redirected = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setChecking(false);

  
      if (redirected.current) return;
      redirected.current = true;

      if (user) {
        router.replace("/(tabs)/parcelles");
      } else {
        router.replace("/register");
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {checking && (
        <View
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}