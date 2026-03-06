import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { auth } from "../../src/config/firebase";
import { logout } from "../../src/services/authService";

export default function ProfilScreen() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnecter",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </View>
        <Text style={styles.name}>Mon Profil</Text>
        <Text style={styles.email}>{user?.email ?? "non connecté"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.cardValue}>{user?.email ?? "—"}</Text>

        <View style={styles.divider} />

        <Text style={styles.cardLabel}>Rôle</Text>
        <Text style={styles.cardValue}>🌾 Agriculteur</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f7f0",
    padding: 24,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,           
    backgroundColor: "#2d6a4f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: "800",
    color: "#ffffff",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b4332",
  },
  email: {
    fontSize: 14,
    color: "#52796f",
    marginTop: 4,
  },


  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#74a78e",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: "#1b4332",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#d8f3dc",
    marginVertical: 14,
  },

  
  logoutButton: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e63946",
  },
  logoutText: {
    color: "#e63946",
    fontWeight: "700",
    fontSize: 16,
  },
});
