/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { CreateRequestPerizinan } from '../models/CreateRequestPerizinan';
import type { DataResponse } from '../models/DataResponse';
import type { UpdateRequestPerizinan } from '../models/UpdateRequestPerizinan';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class PerizinanService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all perizinan requests
     * @returns DataResponse Returns all perizinan requests
     * @throws ApiError
     */
    public getPerizinan(): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/perizinan',
        });
    }

    /**
     * Create a new perizinan request
     * @param requestBody Request body for creating a new perizinan request
     * @returns DataResponse Perizinan request created successfully
     * @throws ApiError
     */
    public createPerizinan(
requestBody: CreateRequestPerizinan,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/perizinan',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation error`,
            },
        });
    }

    /**
     * Get a perizinan request by ID
     * @param id ID of the perizinan request to retrieve
     * @returns DataResponse Returns the specified perizinan request
     * @throws ApiError
     */
    public getPerizinanById(
id: number,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/perizinan/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Perizinan request not found`,
            },
        });
    }

    /**
     * Update a perizinan request by ID
     * @param id ID of the perizinan request to update
     * @param requestBody Request body for updating a perizinan request
     * @returns DataResponse Perizinan request updated successfully
     * @throws ApiError
     */
    public updatePerizinan(
id: number,
requestBody: UpdateRequestPerizinan,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/perizinan/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Perizinan request not found`,
                422: `Validation error`,
            },
        });
    }

    /**
     * Delete a perizinan request by ID
     * @param id ID of the perizinan request to delete
     * @returns void 
     * @throws ApiError
     */
    public deletePerizinan(
id: number,
): Observable<void> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/perizinan/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Perizinan request not found`,
            },
        });
    }

}
