/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { DataResponse } from '../models/DataResponse';
import type { JenisPerizinanInput } from '../models/JenisPerizinanInput';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class JenisPerizinanService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all jenis perizinan
     * Returns all jenis perizinan data
     * @returns DataResponse Successful operation
     * @throws ApiError
     */
    public getAllJenisPerizinan(): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/jenis-perizinan',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Create new jenis perizinan
     * Create a new jenis perizinan data
     * @param requestBody Jenis Perizinan data
     * @returns DataResponse Jenis Perizinan created successfully
     * @throws ApiError
     */
    public createJenisPerizinan(
requestBody: JenisPerizinanInput,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/jenis-perizinan',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Get jenis perizinan by ID
     * Returns a single jenis perizinan data
     * @param id Jenis Perizinan ID
     * @returns DataResponse Successful operation
     * @throws ApiError
     */
    public getJenisPerizinan(
id: number,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/jenis-perizinan/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Jenis Perizinan not found`,
            },
        });
    }

    /**
     * Update jenis perizinan by ID
     * Update a single jenis perizinan data
     * @param id Jenis Perizinan ID
     * @param requestBody Jenis Perizinan data
     * @returns DataResponse Jenis Perizinan updated successfully
     * @throws ApiError
     */
    public updateJenisPerizinan(
id: number,
requestBody: JenisPerizinanInput,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/jenis-perizinan/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete by ID
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public deleteJenisPerizinan(
id: any,
): Observable<void> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/jenis-perizinan/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Jenis Perizinan record not found`,
            },
        });
    }

}
