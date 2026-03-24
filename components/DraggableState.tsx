import { Circle, Group, Text, useFont } from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    runOnJS,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";

type Props = {
  etat: {
    id: string;
    nom: string;
    position: { x: number; y: number };
    estFinal?: boolean;
  };
  onMove: (id: string, x: number, y: number) => void;
};

export default function DraggableState({ etat, onMove }: Props) {
  const font = useFont(require("@/assets/fonts/Roboto-Regular.ttf"), 14);

  const x = useSharedValue(etat.position.x);
  const y = useSharedValue(etat.position.y);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const textY = useDerivedValue(() => y.value + 5);
  const textX = useDerivedValue(() => x.value - etat.nom.length * 3);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      runOnJS(onMove)(etat.id, x.value, y.value);
    });

  if (!font) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Group>
        <Circle cx={x} cy={y} r={30} color="white" />
        <Circle
          cx={x}
          cy={y}
          r={30}
          color="black"
          style="stroke"
          strokeWidth={2}
        />

        {etat.estFinal && (
          <Circle
            cx={x}
            cy={y}
            r={24}
            color="black"
            style="stroke"
            strokeWidth={2}
          />
        )}

        <Text x={textX} y={textY} text={etat.nom} font={font} color="black" />
      </Group>
    </GestureDetector>
  );
}
