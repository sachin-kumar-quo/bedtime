import React, { ComponentProps, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { formatDuration, PI, radToMinutes, TAU } from "../Constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  row: {
    color: "#9D9EA7",
  },
  time: {
    color: "white",
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    color: "#9D9EA7",
  },
});

interface LabelProps {
  theta: Animated.SharedValue<number>;
  label: string;
  icon: ComponentProps<typeof Icon>["name"];
}

const Label = ({ theta, label, icon }: LabelProps) => {
  const time = useDerivedValue(() => {
    const minutes = radToMinutes(((TAU + theta.value - TAU / 4) % TAU));
    return formatDuration(minutes);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.row}>
        <Icon name={icon} size={14} />
        <Text style={styles.label}>{"\u00A0" + label}</Text>
      </Text>
      <ReText style={styles.time} text={time} />
      <Text style={styles.label}>Tomorrow</Text>
    </View>
  );
};

export default Label;
