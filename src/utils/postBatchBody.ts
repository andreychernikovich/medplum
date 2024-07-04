import { BatchBody } from '@src/types/observation';

const postBatchBody = (offlineData: BatchBody[]) => {
    const data = {
      resourceType: "Bundle",
      type: "batch",
      entry: offlineData
    }
    return data;
};

export default postBatchBody;


