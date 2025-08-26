import { format } from "date-fns/format";
import { API, URLS } from "src/config";
import { BASE_URL_AUTH } from "../../../services";

interface ILogin {
    email: string,
    password: string
}

export const login = async (props: ILogin) => {
    try {
        const { email, password } = props;
        const form = new FormData()
        form.append('username', email);
        form.append('password', password);

        const response = await fetch(`${BASE_URL_AUTH}/login`, {
            method: "POST",
            body: form,

        },);

        const contentType = response.headers.get('content-type') || '';
        const data = await response.json();
        console.log('Respuesta JSON:', data);
        if (!response.ok) {
            throw new Error('Error on response')
        }

        return data;
    } catch (error) {
        console.error({ error })
    }
    return null;
}
