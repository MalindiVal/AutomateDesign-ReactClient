import { View } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

export default function AutomateCanvas({ automate }: any) {
  if (!automate) return null;

  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%">
        {/* Transitions */}
        {automate.transitions.map((t: any) => {
          if (!t.etatDebut || !t.etatFinal) return null;

          const start = t.etatDebut.position;
          const end = t.etatFinal.position;

          return (
            <>
              <Line
                key={t.id}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="black"
                strokeWidth="2"
              />
              <SvgText
                x={(start.x + end.x) / 2}
                y={(start.y + end.y) / 2 - 5}
                fontSize="12"
                textAnchor="middle"
              >
                {t.condition}
              </SvgText>
            </>
          );
        })}

        {/* États */}
        {automate.etats.map((etat: any) => (
          <>
            <Circle
              key={etat.id}
              cx={etat.position.x}
              cy={etat.position.y}
              r={30}
              stroke="black"
              strokeWidth="2"
              fill="white"
            />

            {/* Double cercle si final */}
            {etat.estFinal && (
              <Circle
                cx={etat.position.x}
                cy={etat.position.y}
                r={24}
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            )}

            <SvgText
              x={etat.position.x}
              y={etat.position.y + 4}
              fontSize="12"
              textAnchor="middle"
            >
              {etat.nom}
            </SvgText>
          </>
        ))}
      </Svg>
    </View>
  );
}
