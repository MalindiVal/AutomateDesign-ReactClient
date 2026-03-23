import DraggableState from "@/components/DraggableState";
import React from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  Line,
  Marker,
  Path,
  Text as SvgText
} from "react-native-svg";

export default function AutomateCanvas({ automate }: any) {
  if (!automate) return null;

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
        {automate.transitions.map((t: any) => {
          if (!t.etatDebut || !t.etatFinal) return null;

          const start = t.etatDebut.position;
          const end = t.etatFinal.position;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const offset = 30; // rayon du cercle

          const startX = start.x + (dx / distance) * offset;
          const startY = start.y + (dy / distance) * offset;

          const endX = end.x - (dx / distance) * offset;
          const endY = end.y - (dy / distance) * offset;

          if (t.etatDebut.id === t.etatFinal.id) {
            return (
              <React.Fragment key={t.id}>
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
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={t.id}>
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
            </React.Fragment>
          );
        })}

        {/* États */}
        {automate.etats.map((etat: any) => (
          <DraggableState key={etat.id} etat={etat} />
        ))}
      </Svg>
    </View>
  );
}
