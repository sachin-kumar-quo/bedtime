import React, { useState } from "react";
import { View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
  SLEEPDURATION,
  TAU,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

const CircularSlider = ({ start, end }: CircularProps) => {
  const [sufficientSleep, setSufficientSleep] = useState(false);
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );
  const animatedProps = useAnimatedProps(() => {
    const p1 = startPos.value;
    const p2 = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    runOnJS(setSufficientSleep)(TAU - duration > SLEEPDURATION);
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });
  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              stroke="#FD9F07"
              strokeWidth={STROKE}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant sufficientSleep={sufficientSleep} />
        <Cursor pos={startPos} sufficientSleep={sufficientSleep} />
        <Cursor pos={endPos} sufficientSleep={sufficientSleep} />
      </Svg>
      <Gesture
        start={start}
        end={end}
        startPos={startPos}
        endPos={endPos}
      />
    </View>
  );
};

export default CircularSlider;
