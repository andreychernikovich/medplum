import { GET } from '@constants/requestType';
import { Author }  from '@src/types/ble';

const getBatchBody = (author: Author) => {
    const data = {
      resourceType: "Bundle",
      type: "batch",
      entry:[{ 
          request: {
              method: GET,
              url: `Observation?patient=${author.reference}&_sort=-_lastUpdated&_count=100`
            }
        },
        { 
          request: {
              method: GET,
              url: `Communication?subject=${author.reference}&_sort=-_lastUpdated&_count=100`
            }
          },
      ]}
    return data;
};

export default getBatchBody;


