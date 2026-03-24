import { utilisateurDao } from "@/api/utilisateurDao";
import Button from "@/components/Button";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await storage.getToken();
      if (token) router.replace("/tabs");
    };
    checkToken();
  }, []);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      if (Platform.OS === "web") {
        window.alert("Veuillez remplir tous les champs");
      } else {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
      }
      return;
    }

    if (password !== confirmPassword) {
      if (Platform.OS === "web") {
        window.alert("Les mots de passe ne correspondent pas");
      } else {
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      }
    } else {
      try {
        const data = await utilisateurDao.register(username, password);
        await storage.setToken(data.token);
        router.replace("/tabs");
      } catch (error) {
        if (Platform.OS === "web") {
          window.alert(
            "Une erreur est survenue lors de l'inscription : " + error,
          );
        } else {
          Alert.alert("Erreur", "Impossible de contacter le serveur");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur AutomateDesign</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Pseudo</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe de nouveau"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button label="Inscription" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    maxWidth: 350,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#3a3f47",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
  },
});
