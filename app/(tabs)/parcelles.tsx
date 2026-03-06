import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getParcelles, deleteParcelle } from "../../src/services/parcelleService";

export default function ParcellesScreen() {
  const [parcelles, setParcelles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getParcelles();
    setParcelles(data);
    setLoading(false);
  }, []);

  useFocusEffect(() => {
    load();
  });

  const handleDelete = (id: string, nom: string) => {
    Alert.alert("Supprimer", `Supprimer "${nom}" ?`, [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: async () => { await deleteParcelle(id); load(); } },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2d6a4f" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Parcelles</Text>
        <Text style={styles.subtitle}>{parcelles.length} parcelle(s)</Text>
      </View>

      {parcelles.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 48 }}>🌱</Text>
          <Text style={styles.emptyText}>Aucune parcelle pour l'instant</Text>
          <Text style={styles.emptyHint}>Appuyez sur + pour en ajouter une</Text>
        </View>
      ) : (
        <FlatList
          data={parcelles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{item.nom}</Text>
                <Text style={styles.cardDetail}>🌿 Culture : {item.culture}</Text>
                <Text style={styles.cardDetail}>📐 Surface : {item.surface} ha</Text>
                <Text style={styles.cardDetail}>📅 Période de récolte : {item.periodeRecolte}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.nom)}>
                <Ionicons name="trash-outline" size={22} color="#e63946" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/ajouterParcelle")}>
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
