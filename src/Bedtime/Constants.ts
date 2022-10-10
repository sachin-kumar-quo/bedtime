import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const PADDING = 24;
export const SIZE = width - PADDING * 5;
export const STROKE = 40;
export const R = (SIZE - STROKE) / 2;
export const { PI } = Math;
export const TAU = 2 * PI;
export const CENTER = { x: SIZE / 2, y: SIZE / 2 };
export const SLEEPDURATION = (480 * TAU) / (24 * 60);

export const containedInSquare = (
  value: Vector,
  center: Vector,
  side: number
) => {
  "worklet";
  const topLeft = { x: center.x - side / 2, y: center.y - side / 2 };
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};

export const normalize = (value: number) => {
  "worklet";
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
};

export const absoluteDuration = (start: number, end: number) => {
  "worklet";
  return start > end ? end + (TAU - start) : end - start;
};

export const radToMinutes = (rad: number) => {
  "worklet";
  console.log(rad);
  return (24 * 60 * (rad)) / TAU;
};

const preFormatDuration = (raw: number) => {
  "worklet";
  console.log('raw', raw);
  const duration = Math.round(1440-raw);
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return { hours, minutes };
};

export const formatDuration = (duration: number) => {
  "worklet";
  console.log('format',duration)
  const { hours, minutes } = preFormatDuration(1440-duration);
  return `${("" + hours).padStart(2, "0")}:${("" + minutes).padStart(2, "0")}`;
};
export const formatDuration2 = (duration: number) => {
  "worklet";
  const { hours, minutes } = preFormatDuration(duration);
  return `${hours} hr ${minutes} min`;
};

export const arc = (x: number, y: number, large = false, sweep = false) => {
  "worklet";
  return `A ${R} ${R} 0 ${large ? "0" : "1"} ${sweep ? "0" : "1"} ${x} ${y}`;
};