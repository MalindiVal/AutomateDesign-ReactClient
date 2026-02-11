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

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await storage.getToken();
      if (token) router.replace("/tabs");
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      if (Platform.OS === "web") {
        window.alert("Veuillez remplir tous les champs");
      } else {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
      }
      return;
    }

    try {
      const data = await utilisateurDao.login(username, password);
      await storage.setToken(data.token);
      router.replace("/tabs");
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Une erreur est survenue lors de la connexion : " + error);
      } else {
        Alert.alert("Erreur", "Impossible de contacter le serveur");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur AutomateDesign</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nom d'utilisateur</Text>
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

        <Button label="Connexion" onPress={handleLogin} />
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
