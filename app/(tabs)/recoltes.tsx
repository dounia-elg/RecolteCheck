import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getRecoltes, deleteRecolte } from "../../src/services/recolteService";

export default function RecoltesScreen() {
  const [recoltes, setRecoltes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getRecoltes();
    setRecoltes(data);
    setLoading(false);
  }, []);

  useFocusEffect(load);

  const handleDelete = (id: string, parcelle: string) => {
    Alert.alert("Supprimer", `Supprimer la récolte de "${parcelle}" ?`, [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: async () => { await deleteRecolte(id); load(); } },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2d6a4f" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Récoltes</Text>
        <Text style={styles.subtitle}>{recoltes.length} récolte(s)</Text>
      </View>

      {recoltes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 56 }}>🌾</Text>
          <Text style={styles.emptyText}>Aucune récolte enregistrée</Text>
          <Text style={styles.emptyHint}>Appuyez sur + pour en ajouter une</Text>
        </View>
      ) : (
        <FlatList
          data={recoltes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{item.parcelleName}</Text>
                <Text style={styles.cardDetail}>📍 Zone : {item.zone}</Text>
                <Text style={styles.cardDetail}>⚖️ Poids : {item.poids} kg</Text>
                <Text style={styles.cardDetail}>📅 Date : {item.date}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.parcelleName)}>
                <Ionicons name="trash-outline" size={22} color="#e63946" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/ajouterRecolte")}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f7f0" },
  header: { backgroundColor: "#2d6a4f", paddingTop: 56, paddingBottom: 24, paddingHorizontal: 24 },
  title: { fontSize: 26, fontWeight: "800", color: "#fff" },
  subtitle: { fontSize: 14, color: "#b7e4c7", marginTop: 4 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyText: { fontSize: 18, fontWeight: "700", color: "#2d6a4f", textAlign: "center", marginTop: 12 },
  emptyHint: { fontSize: 14, color: "#74a78e", textAlign: "center", marginTop: 8 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", elevation: 3 },
  cardName: { fontSize: 17, fontWeight: "700", color: "#1b4332", marginBottom: 4 },
  cardDetail: { fontSize: 13, color: "#52796f", marginTop: 2 },
  fab: { position: "absolute", bottom: 24, right: 24, width: 60, height: 60, borderRadius: 30, backgroundColor: "#2d6a4f", justifyContent: "center", alignItems: "center", elevation: 8 },
});
