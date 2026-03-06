import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, Link } from "expo-router";
import { register } from "../src/services/authService";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const e = email.trim();

    if (!e) return Alert.alert("Erreur", "L'email est requis.");
    if (!password) return Alert.alert("Erreur", "Le mot de passe est requis.");
    if (password.length < 6)
      return Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");

    try {
      setLoading(true);
      await register(e, password);
      router.replace("/(tabs)/parcelles");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "L'inscription a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // KeyboardAvoidingView pushes the form up when the keyboard opens
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌾</Text>
          <Text style={styles.appName}>RécolteCheck</Text>
          <Text style={styles.tagline}>Gérez vos parcelles facilement</Text>
        </View>

        {/* ── CARD ── */}
        <View style={styles.card}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Rejoignez RécolteCheck en tant qu'agriculteur</Text>

          {/* Email input */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="exemple@email.com"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Password input */}
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            placeholder="Minimum 6 caractères"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Register button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Création en cours..." : "S'inscrire"}
            </Text>
          </TouchableOpacity>

          {/* Login link */}
          <Text style={styles.loginText}>
            Vous avez déjà un compte ?{" "}
            <Link href="/login" style={styles.loginLink}>
              Se connecter
            </Link>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ── STYLES ──────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f7f0", // Light green background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  // Header section (logo + title above the card)
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    fontSize: 56,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2d6a4f",
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#52796f",
    marginTop: 4,
  },

  // White card that holds the form
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Shadow for Android
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b4332",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#74a78e",
    marginBottom: 20,
  },

  // Input label
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2d6a4f",
    marginBottom: 6,
  },

  // Text inputs
  input: {
    borderWidth: 1.5,
    borderColor: "#b7e4c7",
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    color: "#1b4332",
    backgroundColor: "#f8fdf9",
    marginBottom: 16,
  },

  // Register button
  button: {
    backgroundColor: "#2d6a4f",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },

  // "Already have an account?" text
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#52796f",
    fontSize: 14,
  },
  loginLink: {
    color: "#2d6a4f",
    fontWeight: "700",
  },
});
