import { Automate } from "@/models/Automate";
import { Canvas, Group, Line, useFont } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import DraggableState from "./DraggableState";

const { width, height } = Dimensions.get("window");

const screenCenterX = width / 2;
const screenCenterY = height / 2;

type Props = {
  automate: Automate;
};

export default function AutomateCanvas({ automate }: Props) {
  const font = useFont(require("@/assets/fonts/Roboto-Regular.ttf"), 14);
  const [data, setData] = React.useState<Automate>(automate);
  const updateEtatPosition = (id: string, x: number, y: number) => {
    setData((prev) => ({
      ...prev,
      etats: prev.etats.map((e) =>
        e.id === id ? { ...e, position: { x, y } } : e,
      ),
    }));
  };

  if (!data || !font) return null;

  const minX = Math.min(...data.etats.map((e) => e.position.x));
  const maxX = Math.max(...data.etats.map((e) => e.position.x));
  const minY = Math.min(...data.etats.map((e) => e.position.y));
  const maxY = Math.max(...data.etats.map((e) => e.position.y));

  const contentWidth = maxX - minX;
  const contentHeight = maxY - minY;

  const PADDING = 80;

  const scaleX = (width - PADDING) / contentWidth;
  const scaleY = (height - PADDING) / contentHeight;

  const scale = Math.min(scaleX, scaleY);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const offsetX = screenCenterX - centerX * scale;
  const offsetY = screenCenterY - centerY * scale;

  return (
    <Canvas style={{ flex: 1 }}>
      <Group
        transform={[
          { translateX: offsetX },
          { translateY: offsetY },
          { scale: scale },
        ]}
      >
        {/* Transitions */}
        {data.transitions.map((t: any) => {
          const startEtat = data.etats.find((e) => e.id === t.etatDebut.id);
          const endEtat = data.etats.find((e) => e.id === t.etatFinal.id);

          if (!startEtat || !endEtat) return null;

          const start = startEtat.position;
          const end = endEtat.position;

          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

          const offset = 30;
          const startX = start.x + (dx / distance) * offset;
          const startY = start.y + (dy / distance) * offset;
          const endX = end.x - (dx / distance) * offset;
          const endY = end.y - (dy / distance) * offset;

          return (
            <Line
              key={t.id}
              p1={{ x: startX, y: startY }}
              p2={{ x: endX, y: endY }}
              strokeWidth={2}
              color="black"
            />
          );
        })}

        {/* États */}
        {data.etats.map((etat: any) => (
          <DraggableState
            key={etat.id}
            etat={etat}
            scale={scale}
            onMove={updateEtatPosition}
          />
        ))}
      </Group>
    </Canvas>
  );
}
