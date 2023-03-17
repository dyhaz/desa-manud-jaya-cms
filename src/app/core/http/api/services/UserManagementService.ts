/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class UserManagementService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all users
     * @returns any List of users
     * @throws ApiError
     */
    public c457726701591D1183B53Aa71Fc13441(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users',
        });
    }

    /**
     * createUser
     * @param requestBody 
     * @returns any User created
     * @throws ApiError
     */
    public a0265360B2014512D6Dbfaf0E7(
requestBody: {
name: string;
email: string;
password: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation error`,
            },
        });
    }

    /**
     * Retrieve a single user by ID
     * @param id 
     * @returns any User record retrieved successfully
     * @throws ApiError
     */
    public showUser(
id: any,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `User record not found`,
            },
        });
    }

    /**
     * Update a user record
     * Update a specific user record.
     * @param requestBody 
     * @param id ID of the user to update.
     * @returns any Success
     * @throws ApiError
     */
    public b9091397C8B25F12C6Adb74Be6Ce3A5A(
requestBody: {
name: string;
email: string;
password: string;
},
id?: any,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `User record not found`,
            },
        });
    }

}
