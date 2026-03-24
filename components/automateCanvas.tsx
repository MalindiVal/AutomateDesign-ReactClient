import DraggableState from "@/components/DraggableState";
import React from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  G,
  Line,
  Marker,
  Path,
  Text as SvgText,
} from "react-native-svg";

type Etat = {
  id: string;
  nom: string;
  position: { x: number; y: number };
  estFinal?: boolean;
};

type Transition = {
  id: string;
  etatDebut: Etat;
  etatFinal: Etat;
  condition: string;
};

type Automate = {
  etats: Etat[];
  transitions: Transition[];
};

export default function AutomateCanvas({ automate }: any) {
  const [data, setData] = React.useState<Automate>(automate);

  const updateEtatPosition = (id: string, x: number, y: number) => {
    setData((prev) => ({
      ...prev,
      etats: prev.etats.map((e) =>
        e.id === id ? { ...e, position: { x, y } } : e,
      ),
    }));
  };

  if (!data) return null;

  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%">
        <Defs>
          <Marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <Path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </Marker>
        </Defs>
        {/* Transitions */}
        {data.transitions.map((t: any) => {
          if (!t.etatDebut || !t.etatFinal) return null;

          const start = t.etatDebut.position;
          const end = t.etatFinal.position;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

          const offset = 30; // rayon du cercle

          const startX = start.x + (dx / distance) * offset;
          const startY = start.y + (dy / distance) * offset;

          const endX = end.x - (dx / distance) * offset;
          const endY = end.y - (dy / distance) * offset;

          if (t.etatDebut.id === t.etatFinal.id) {
            return (
              <G key={t.id}>
                <Path
                  d={`M ${start.x} ${start.y - 30}
            C ${start.x + 50} ${start.y - 80},
              ${start.x - 50} ${start.y - 80},
              ${start.x} ${start.y - 30}`}
                  stroke="black"
                  fill="none"
                  markerEnd="url(#arrow)"
                />
                <SvgText
                  x={start.x}
                  y={start.y - 85}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {t.condition}
                </SvgText>
              </G>
            );
          }

          return (
            <G key={t.id}>
              <Line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="black"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
              <SvgText
                x={(start.x + end.x) / 2}
                y={(start.y + end.y) / 2 - 5}
                fontSize="12"
                textAnchor="middle"
              >
                {t.condition}
              </SvgText>
            </G>
          );
        })}

        {/* États */}
        {data.etats.map((etat: any) => (
          <DraggableState
            key={etat.id}
            etat={etat}
            onMove={updateEtatPosition}
          />
        ))}
      </Svg>
    </View>
  );
}
