import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import ListAutomates from "@/components/ListAutomates";

export default function Index() {
  return (
    <View style={styles.container}>
      <Button label="Créer un automate" />
      <Button label="Ouvrir un automate" />
      <Text style={styles.title}>Automates Récents</Text>
      {/* Liste des automates récents */}
      <ListAutomates />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
