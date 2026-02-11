import Button from "@/components/Button";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

        <Button label="Connexion" />
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
