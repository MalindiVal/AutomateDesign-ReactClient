import { StyleSheet, View } from "react-native";

import Button from "@/components/Button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Button label="Créer un automate" />
      <Button label="Ouvrir un automate" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
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
