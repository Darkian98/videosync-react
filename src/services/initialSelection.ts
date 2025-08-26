import { API, URLS } from "src/config";

interface ISendInitialSelection {
  date: string,
  hour: string,
}

interface IGetInitialSelection {
  uuid: string,
}


export const SendInitialSelection = async (props: ISendInitialSelection) => {
  try {

    const {date, hour } = props;

    const url = `${URLS.dev + API.initialSelection}`;

    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date,  // ejemplo: '2025-05-08'
        hour   // ejemplo: '9:25'
      })
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error enviando fecha y hora:', error);
    throw error;
  }
};

export const GetInitialSelection = async (props: IGetInitialSelection) => {
  try {
    const { uuid } = props;
    const url = `${URLS.dev + API.initialSelection}/${uuid}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo datos:', error);
    throw error;
  }
};

