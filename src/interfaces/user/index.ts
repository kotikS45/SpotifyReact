export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    image: string;
    birthDate: string;
}

export interface LoginResponse {
    token: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
}

export interface RegisterUser {
    name: string;
    image: File | null;
    email: string;
    username: string;
    password: string;
    birthDate: string;
}