import { POST } from "@constants/requestType";
import { OfflineProps, RequestBody } from "@src/types/observation";

export const parseOfflineData = (values: OfflineProps[]) => {
    const offlineData = values.map((measurement: OfflineProps)=>{
        return JSON.parse(measurement?.body);
    })
    return offlineData;
}

export const getOfflineDataForPost = (offlineData: RequestBody[]) => {
    const batchBody = offlineData.map((resource)=>{
        return {
            resource,
            request: {
                method: POST,
                url: resource.resourceType
            }
        }
    })
    return batchBody;
}