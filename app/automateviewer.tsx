import { Platform, Text, View } from "react-native";
import Canvas from "react-native-canvas";

export default function AutomateViewerScreen() {
  const handleCanvas = (canvas: Canvas) => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // définir taille canvas
    canvas.width = 300;
    canvas.height = 300;

    // fond gris
    ctx.fillStyle = "#c81a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // cercle rouge au centre
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Automate Viewer</Text>
      <Canvas
        ref={handleCanvas}
        style={{ borderWidth: 1, borderColor: "#000" }}
      />
      {Platform.OS === "web" && (
        <Text style={{ marginTop: 10, color: "gray" }}>
          Canvas compatible Web et Mobile
        </Text>
      )}
    </View>
  );
}
