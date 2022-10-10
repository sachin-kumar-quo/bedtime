import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CircularSlider from "./CircularSlider";
import { PADDING } from "./Constants";
import Container from "./components/Container";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1B1D",
    padding: PADDING
  },
  title: {
    fontSize: 36,
    color: "white",
    marginBottom: 32
  },
  healthOption: {
    backgroundColor: "#2C2B2D",
    borderRadius: 16,
    padding: 15,
    marginTop: 10,
    width: '96%',
  },
  heathText: {
    color: "orange",
    alignSelf: 'center',
    fontSize:16
  }
});

const Bedtime = () => {
  const start = useSharedValue(Math.PI);
  const end = useSharedValue(2*Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Wake Up Only</Text>
      <Container start={start} end={end}>
        <CircularSlider start={start} end={end} />
      </Container>
      <View style={styles.healthOption}>
        <Text style={styles.heathText}>
          Edit Sleep Schedule in Health
        </Text>
      </View>
    </View>
  );
};

export default Bedtime;
