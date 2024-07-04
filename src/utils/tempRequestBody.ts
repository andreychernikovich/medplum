import { 
  BODY_TEMPERATURE,
  BODY_TEMPERATURE_UNIT,
  TEMPERATURE_UNIT
} from '@constants/measurements';
import { Device, Author }  from '@src/types/ble';
import { Observation } from '@src/types/observation';

const getTempRequestBody = (device: Device, author: Author, value: Observation) => {
    const data = {
        resourceType: "Observation",
        status: "preliminary",
        subject: {
          reference: author.reference,
          display: author.display
        },
        effectiveDateTime: new Date(),
        code: {
          coding: [
            {
              code: BODY_TEMPERATURE,
              display: BODY_TEMPERATURE,
              system: device.name,
            }
          ],
        },
        valueQuantity: {
          value: Number(value.subtitle),
          system: device.name,
          unit: TEMPERATURE_UNIT,
          code: BODY_TEMPERATURE_UNIT
        },
        device: {
          identifier: {
            system: device.name,
            value: device.id
          }
        }
    }
    return data;
};

export default getTempRequestBody;
