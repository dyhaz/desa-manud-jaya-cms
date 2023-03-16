/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class AuthenticationService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Login a user and generate an access token
     * @param requestBody 
     * @returns any Login successful
     * @throws ApiError
     */
    public login(
requestBody: {
email: string;
password: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
                422: `Validation error`,
            },
        });
    }

    /**
     * Logout the authenticated user and revoke their access token
     * @returns any Logout successful
     * @throws ApiError
     */
    public logout(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/logout',
        });
    }

    /**
     * Verify user email
     * Verify the email address of a user using the provided email verification token
     * @param token The email verification token
     * @returns any Email verified successfully
     * @throws ApiError
     */
    public c21085A5063650Bfdc146Fad8261Ce(
token: string,
): Observable<{
message?: string;
}> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/verify-email/{token}',
            path: {
                'token': token,
            },
            errors: {
                400: `Invalid token`,
            },
        });
    }

    /**
     * Sends an email verification link to the user.
     * Sends an email verification link to the user. The link contains a unique token that the user can use to verify their email address.
     * @param requestBody The email address of the user.
     * @returns any The email verification link has been sent successfully.
     * @throws ApiError
     */
    public sendEmailVerificationLink(
requestBody: {
email: string;
},
): Observable<{
message?: string;
}> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/send-email-verification-link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The request is invalid.`,
                404: `The user does not exist.`,
                500: `An error occurred while sending the email verification link.`,
            },
        });
    }

}
