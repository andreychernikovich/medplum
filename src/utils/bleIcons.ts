import { BODY_TEMPERATURE, HUMIDITY, NOTE } from "@constants/measurements";

export const getIcon = (type: string) => {
  switch(type) {
    case BODY_TEMPERATURE:
      return "thermometer-outline";
    case HUMIDITY:
      return "water-sharp";
    case NOTE:
      return "reader-outline";
  }
};