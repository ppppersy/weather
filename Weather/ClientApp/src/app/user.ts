export class User {
    _id: string;
    userName: string;
    name: string;
    email: string;
    selectedCities: City[]
}

export class City {
    city: string;
    state: string;
    country: string
}