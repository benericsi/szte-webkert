export interface User { 
    email: string;
    name: { 
        firstname: string;
        lastname: string;
    }
    password: string;
}