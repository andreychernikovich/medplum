import { BODY_TEMPERATURE, HUMIDITY } from "@constants/measurements";
import { Author, Device } from "@src/types/ble";
import { Observation } from "@src/types/observation";

import getTempRequestBody from "./tempRequestBody";
import getHumidityRequestBody from "./humidityRequestBody";

export const getRequestBody = (device: Device, author: Author, lastMeasure: Observation, type: string) => {
    switch(type) {
      case BODY_TEMPERATURE:
        return getTempRequestBody(device, author, lastMeasure);
      case HUMIDITY:
        return getHumidityRequestBody(device, author, lastMeasure);
    }
};