import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { addParcelle } from "../src/services/parcelleService";

export default function AjouterParcelleScreen() {
  const [nom, setNom] = useState("");
  const [surface, setSurface] = useState("");
  const [culture, setCulture] = useState("");
  const [periode, setPeriode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nom || !surface || !culture || !periode)
      return Alert.alert("Erreur", "Tous les champs sont requis.");

    try {
      setLoading(true);
      await addParcelle({ nom, surface: Number(surface), culture, periodeRecolte: periode });
      router.back();
    } catch (err: any) {
      Alert.alert("Erreur", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle Parcelle</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {[
          { label: "Nom de la parcelle", value: nom, set: setNom, placeholder: "ex: Champ Nord" },
          { label: "Surface (hectares)", value: surface, set: setSurface, placeholder: "ex: 3.5", keyboard: "decimal-pad" },
          { label: "Type de culture", value: culture, set: setCulture, placeholder: "ex: Blé, Maïs..." },
          { label: "Période de récolte", value: periode, set: setPeriode, placeholder: "ex: Juillet - Août" },
        ].map(({ label, value, set, placeholder, keyboard }: any) => (
          <View key={label}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#aaa"
              value={value}
              onChangeText={set}
              keyboardType={keyboard ?? "default"}
              style={styles.input}
            />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.button, loading && { opacity: 0.5 }]}
        >
          <Text style={styles.buttonText}>{loading ? "Enregistrement..." : "Enregistrer"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f7f0" },
  header: { backgroundColor: "#2d6a4f", paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#fff" },
  label: { fontSize: 13, fontWeight: "600", color: "#2d6a4f", marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: "#b7e4c7", borderRadius: 12, padding: 13, fontSize: 15, color: "#1b4332", backgroundColor: "#fff", marginBottom: 16 },
  button: { backgroundColor: "#2d6a4f", borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
