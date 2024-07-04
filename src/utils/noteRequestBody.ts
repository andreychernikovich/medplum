import { Author } from "@src/types/ble";

const getNoteRequestBody = (note: string, author: Author, name: Array<any>) => {
    const data = {
      resourceType: "Communication",
      status: "preparation",
      subject: {
        reference: author.reference,
        display: author.display
      },
      sender: {
        reference: author.reference,
        display: name[0].family
      },
      payload: [
        {
          contentString: note
        }
      ]
  }
    return data;
};

export default getNoteRequestBody;
