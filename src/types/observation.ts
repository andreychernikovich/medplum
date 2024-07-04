export type Observation = {
  id: string | number[];
  title?: string;
  subtitle?: string;
  comment?: string;
  type: string;
  date: string;
}

export type ObservationResponse  = {
  resource: {
    code: {
      coding: [{ display: string }]
    },
    valueQuantity: {
      value: number
    },
    effectiveDateTime: Date,
    id?: string
  }
}

export type CommunicationResponse  = {
  resource: {
    code: {
      coding: [{ display: string }]
    },
    id?: string,
    payload: [{contentString: string}],
    meta: {
      lastUpdated: Date,
    }
  }
}

export type RequestBody = {
  resourceType: string,
  status: string,
  subject: {
    reference: string,
    display: string
  },
  effectiveDateTime: Date,
  code: {
    coding: [
      {
        code:string,
        display: string,
        system: string,
       }],
  },
  valueQuantity: {
    value: number,
    system: string,
    unit: string,
    code: string,
  },
  device: {
    identifier: {
      system: string,
      value: string
    }
  }
}

export type OfflineProps = {
  body: string,
  created_at: number,
  id: string,
}

export type BatchBody = {
  request: {
    method: string,
    url: string,
  },
  resource: RequestBody
}

export type PostBatchBody = {
  resourceType: string,
  type: string,
  entry: BatchBody[]
}

export type LinkResponse = {
  url: string,
  relation: string,
}

export type ObservationEntry = {
  resource: {
    entry: ObservationResponse[],
    link: LinkResponse[],
    resourceType: string,
    type: string,
  }
}

export type CommunicationEntry = {
  resource: {
    entry: CommunicationResponse[],
    link: LinkResponse[],
    resourceType: string,
    type: string,
  }
}
