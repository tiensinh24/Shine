export interface TokenRequest {
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    grantType: string;
}