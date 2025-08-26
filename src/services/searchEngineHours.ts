import { format } from "date-fns/format";
import { API, URLS } from "src/config";

interface ISearchEngineHours {
    productId?: string,
    date: string,
    tour?: string
}

export const searchEngineHours = async (props: ISearchEngineHours) => {
    try {
        const {
            date,
            productId = 'visita-real-alcazar-de-sevilla',
            tour = 'visita-real-alcazar-de-sevilla'
        } = props;

        const searchParams = {
            date: format(date, "yyyy-MM-dd"),
            productId,
            tour
        }

        const url = `${URLS.dev + API.ticket}?${new URLSearchParams(searchParams)}`;

        const response = await fetch(url, { method: "GET", cache: "no-store" });

        if (!response.ok) {
            throw new Error('Error on response')
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error({ error })
    }
    return null;
}
