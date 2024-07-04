import { HUMIDITY, HUMIDITY_CODE, HUMIDITY_UNIT } from '@constants/measurements';
import { Author, Device }  from '@src/types/ble';
import { Observation } from '@src/types/observation';

const getHumidityRequestBody = (device: Device, author: Author, value: Observation) => {
    const data = {
        resourceType: "Observation",
        status: "preliminary",
        subject: {
          reference: author.reference,
          display: author.display,
        },
        effectiveDateTime: new Date(),
        code: {
          coding: [
            {
              code: HUMIDITY_CODE,
              display: HUMIDITY,
              system: device.name,
            }
          ],
        },
        valueQuantity: {
          value: Number(value.subtitle),
          system: device.name,
          unit: HUMIDITY_UNIT,
          code: HUMIDITY_UNIT
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

export default getHumidityRequestBody;
