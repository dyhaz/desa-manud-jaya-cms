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
    public getUsers(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/users',
        });
    }

    /**
     * Create a new user
     * @param requestBody 
     * @returns any User created
     * @throws ApiError
     */
    public createUser(
requestBody: {
name: string;
email: string;
password: string;
phone?: string;
user_level?: string;
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
    public updateUser(
requestBody: {
name: string;
email: string;
password: string;
phone?: string;
user_level?: string;
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

    /**
     * Retrieve a single user by email
     * @param email 
     * @returns any User record retrieved successfully
     * @throws ApiError
     */
    public showUserByEmail(
email: any,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/user-by-email/{email}',
            path: {
                'email': email,
            },
            errors: {
                404: `User record not found`,
            },
        });
    }

    /**
     * Change user password
     * Changes the password of the authenticated user
     * @param requestBody 
     * @returns any Password changed successfully
     * @throws ApiError
     */
    public changePassword(
requestBody: {
/**
 * The user's ID
 */
id?: number;
/**
 * The user's current password
 */
current_password: string;
/**
 * The user's new password
 */
new_password: string;
/**
 * Confirmation of the user's new password
 */
new_password_confirmation: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/user/password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized - invalid current password`,
            },
        });
    }

    /**
     * Disable a user
     * Disable a user by setting the active flag to false.
     * @param id ID of the user to disable.
     * @returns any User disabled successfully.
     * @throws ApiError
     */
    public disableUser(
id: number,
): Observable<{
message?: string;
}> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/users/{id}/disable',
            path: {
                'id': id,
            },
            errors: {
                404: `User not found.`,
            },
        });
    }

}
