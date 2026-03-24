import React from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedProps,
    useSharedValue,
} from "react-native-reanimated";
import { Circle, Text as SvgText } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

export default function DraggableState({ etat }: any) {
  const x = useSharedValue(etat.position.x);
  const y = useSharedValue(etat.position.y);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
    });

  const animatedCircleProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value,
  }));

  const animatedTextProps = useAnimatedProps(() => ({
    x: x.value,
    y: y.value + 4,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View>
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          r={30}
          stroke="black"
          strokeWidth="2"
          fill="white"
        />

        {etat.estFinal && (
          <AnimatedCircle
            animatedProps={animatedCircleProps}
            r={24}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        )}

        <AnimatedText
          animatedProps={animatedTextProps}
          fontSize="12"
          textAnchor="middle"
        >
          {etat.nom}
        </AnimatedText>
      </View>
    </GestureDetector>
  );
}
