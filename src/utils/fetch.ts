import HttpException from "../error/HttpException.ts";

export function makeOptions ( method: string, body: object | null) {
    const opts: RequestInit = {
        method: method,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

export async function handleHttpErrors(res: Response) {
    if (!res.ok) {
        const errorResponse = await res.json();
        let msg = errorResponse.message
            ? errorResponse.message
            : "Uventet fejl opstod";
        if (res.status === 400) {
            msg = "Der opstod en fejl i din forespørgsel. Prøv venligst igen.";
        }
        if (res.status === 401) {
            msg =
                "Du er ikke logget ind eller din session er udløbet. Log venligst ind igen.";
        }
        if (res.status === 403) {
            msg = "Du har ikke adgang til denne ressource.";
        }
        if (res.status === 404) {
            msg = "Ressourcen blev ikke fundet.";
        }
        if (res.status >= 500) {
            msg = "Der skete en fejl på serveren. Prøv venligst igen senere.";
        }
        throw new HttpException(msg, res.status);
    }
    if (res.status === 204) {
        return res;
    }
    return res.json();
}