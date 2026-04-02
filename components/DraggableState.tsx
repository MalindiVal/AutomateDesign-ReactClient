import { Etat } from "@/models/Etats";
import { Circle, Group, Text, useFont } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
    runOnJS,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";

type Props = {
  etat: Etat;
  scale: number;
  onMove: (id: string, x: number, y: number) => void;
};

export default function DraggableState({ etat, scale, onMove }: Props) {
  const font = useFont(
    Platform.OS === "web"
      ? "/fonts/Roboto-Regular.ttf"
      : require("@/assets/fonts/Roboto-Regular.ttf"),
    14,
  );

  const x = useSharedValue(etat.position.x);
  const y = useSharedValue(etat.position.y);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const textY = useDerivedValue(() => y.value + 5);
  const textX = useDerivedValue(() => x.value - etat.nom.length * 3);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.log("START");
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      console.log("MOVE");
      x.value = startX.value + event.translationX / scale;
      y.value = startY.value + event.translationY / scale;
    })
    .onEnd(() => {
      runOnJS(onMove)(etat.id, x.value, y.value);
    });

  useEffect(() => {
    x.value = etat.position.x;
    y.value = etat.position.y;
  }, [etat.position.x, etat.position.y]);

  if (!font) return null;

  return (
    <View>
      {/*<GestureDetector gesture={panGesture}>*/}
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
      {/*</GestureDetector>*/}
    </View>
  );
}
