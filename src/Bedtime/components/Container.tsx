import React, { ReactNode, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  runOnJS,
  useDerivedValue
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
  SLEEPDURATION,
  TAU
} from "../Constants";

import Label from "./Label";

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2B2D",
    borderRadius: 16,
    padding: 30
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  duration: {
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "white"
  },
  goalText: {
    fontSize: 12,
    color: "white",
    alignSelf: "center"
  }
});

const Container = ({ start, end, children }: ContainerProps) => {
  const [goal, setGoal] = useState(false);
  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    runOnJS(setGoal)(TAU-d > SLEEPDURATION);
    return formatDuration2(radToMinutes(d));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="BEDTIME" icon="bed" />
        <Label theta={end} label="WAKE UP" icon="bell" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
      {goal ? (
        <Text style={styles.goalText}>This schedule meets you sleep goal.</Text>
      ) : (
        <Text style={styles.goalText}>
          This schedule does not meets you sleep goal.
        </Text>
      )}
    </View>
  );
};

export default Container;
