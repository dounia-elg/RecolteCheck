import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="parcelles" options={{ title: "Parcelles" }} />
      <Tabs.Screen name="recoltes" options={{ title: "Récoltes" }} />
      <Tabs.Screen name="profil" options={{ title: "Profil" }} />
    </Tabs>
  );
}