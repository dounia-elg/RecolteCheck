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
import { login } from "../src/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const e = email.trim();

    if (!e) return Alert.alert("Erreur", "L'email est requis.");
    if (!password) return Alert.alert("Erreur", "Le mot de passe est requis.");

    try {
      setLoading(true);
      await login(e, password);
      router.replace("/(tabs)/parcelles");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Connexion échouée.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.logo}>🌾</Text>
          <Text style={styles.appName}>RécolteCheck</Text>
          <Text style={styles.tagline}>Gérez vos parcelles facilement</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.subtitle}>Bienvenue ! Connectez-vous à votre compte.</Text>

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

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            placeholder="Votre mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Pas encore de compte ?{" "}
            <Link href="/register" style={styles.registerLink}>
              S'inscrire
            </Link>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f7f0",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

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

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
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

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2d6a4f",
    marginBottom: 6,
  },

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

  registerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#52796f",
    fontSize: 14,
  },
  registerLink: {
    color: "#2d6a4f",
    fontWeight: "700",
  },
});
