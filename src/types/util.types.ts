
export interface BuildResponse {
    status: number;
    message: string;
    data?: any;
}

export interface AuthContext {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface TokenPayload {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
}