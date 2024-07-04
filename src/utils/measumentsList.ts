import { NOTE } from "@constants/measurements";
import { 
    CommunicationEntry,
    CommunicationResponse,
    ObservationEntry,
    ObservationResponse
} from "@src/types/observation";

export const getObservationsList = (entry: ObservationEntry) =>{
    return entry.resource.entry.map((observation: ObservationResponse)=>{
        const rez = {
            title: observation?.resource?.code.coding[0].display,
            subtitle: observation?.resource?.valueQuantity?.value,
            comment: '',
            type: observation?.resource?.code.coding[0].display,
            date: observation?.resource?.effectiveDateTime,
            id: observation?.resource?.id,
        }
        return rez;
    });
}

export const getCommunicationsList = (entry: CommunicationEntry) =>{
    return entry.resource.entry.map((i: CommunicationResponse) => {
        const rez = {
            title: NOTE,
            subtitle: i?.resource?.payload[0]?.contentString,
            comment: i?.resource?.payload[0]?.contentString,
            type: NOTE,
            date: i?.resource?.meta?.lastUpdated,
            id: i?.resource?.id,
        }
        return rez;
    });
}
