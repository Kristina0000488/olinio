export type NewUser = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    phonenumber: string,
    country: string,
}

export type ResponseStatusCode = {
    statusCode: 204 | 200 | 400,
    message: string,
}

export type User = NewUser & {
    id: number;
}