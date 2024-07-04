export enum ResourceType {
  Patient = "Patient",
}

export type PatientResource = {
  resourceType: string,
  id: string,
  name: [
    {
      family: string,
      given: [string],
    },
  ],
  address: [
    {
      city: string,
    },
  ],
  birthDate: string,
  telecom: [
    {
      value: string,
    }
  ],
};
