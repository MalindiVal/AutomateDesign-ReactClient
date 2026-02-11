import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log("Pressable touché");
          onPress && onPress();
        }}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#9A0932",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
