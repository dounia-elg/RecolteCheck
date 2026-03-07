import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { addRecolte } from "../src/services/recolteService";
import { getParcelles } from "../src/services/parcelleService";

export default function AjouterRecolteScreen() {
  const [parcelles, setParcelles] = useState<any[]>([]);
  const [selectedParcelle, setSelectedParcelle] = useState<any>(null);
  const [zone, setZone] = useState("");
  const [poids, setPoids] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getParcelles().then(setParcelles);
  }, []);

  const handleSubmit = async () => {
    if (!selectedParcelle) return Alert.alert("Erreur", "Sélectionnez une parcelle.");
    if (!zone || !poids || !date) return Alert.alert("Erreur", "Tous les champs sont requis.");

    try {
      setLoading(true);
      await addRecolte({
        parcelleId: selectedParcelle.id,
        parcelleName: selectedParcelle.nom,
        zone,
        poids: Number(poids),
        date,
      });
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
        <Text style={styles.headerTitle}>Nouvelle Récolte</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>

        {/* ── PARCELLE PICKER ── */}
        <Text style={styles.label}>Parcelle concernée</Text>
        <View style={styles.pickerContainer}>
          {parcelles.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => setSelectedParcelle(p)}
              style={[
                styles.pickerItem,
                selectedParcelle?.id === p.id && styles.pickerItemSelected,
              ]}
            >
              <Text style={[
                styles.pickerText,
                selectedParcelle?.id === p.id && styles.pickerTextSelected,
              ]}>
                {p.nom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Zone (dans la parcelle)</Text>
        <TextInput
          placeholder="ex: Zone A, Bloc 2..."
          placeholderTextColor="#aaa"
          value={zone}
          onChangeText={setZone}
          style={styles.input}
        />

        <Text style={styles.label}>Poids récolté (kg)</Text>
        <TextInput
          placeholder="ex: 250"
          placeholderTextColor="#aaa"
          value={poids}
          onChangeText={setPoids}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Date de récolte</Text>
        <TextInput
          placeholder="ex: 15 Juillet 2024"
          placeholderTextColor="#aaa"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.button, loading && { opacity: 0.5 }]}
        >
          <Text style={styles.buttonText}>{loading ? "Enregistrement..." : "Enregistrer la récolte"}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f7f0" },
  header: { backgroundColor: "#2d6a4f", paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#fff" },
  label: { fontSize: 13, fontWeight: "600", color: "#2d6a4f", marginBottom: 8, marginTop: 4 },
  input: { borderWidth: 1.5, borderColor: "#b7e4c7", borderRadius: 12, padding: 13, fontSize: 15, color: "#1b4332", backgroundColor: "#fff", marginBottom: 16 },
  button: { backgroundColor: "#2d6a4f", borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  // Parcelle selector buttons
  pickerContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  pickerItem: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: "#b7e4c7", backgroundColor: "#fff" },
  pickerItemSelected: { backgroundColor: "#2d6a4f", borderColor: "#2d6a4f" },
  pickerText: { fontSize: 14, color: "#2d6a4f", fontWeight: "600" },
  pickerTextSelected: { color: "#fff" },
});
