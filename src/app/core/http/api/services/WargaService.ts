/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { DataResponse } from '../models/DataResponse';
import type { Error } from '../models/Error';
import type { Warga } from '../models/Warga';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class WargaService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all warga data
     * Returns all warga data
     * @returns DataResponse Successful operation
     * @returns Error an 'unexpected error' occurred
     * @throws ApiError
     */
    public getAllWarga(): Observable<DataResponse | Error> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/warga',
        });
    }

    /**
     * Store new warga
     * Stores new warga data
     * @param requestBody 
     * @returns Error an 'unexpected error' occurred
     * @returns DataResponse Warga data stored successfully
     * @throws ApiError
     */
    public storeWarga(
requestBody: Warga,
): Observable<Error | DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/warga',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Data validation error`,
            },
        });
    }

    /**
     * Get list of all warga
     * @param namaWarga Filter by nama warga
     * @param alamat Filter by alamat
     * @param email Filter by Email
     * @param nik Filter by NIK
     * @returns DataResponse List of all warga
     * @throws ApiError
     */
    public filterWarga(
namaWarga?: string,
alamat?: string,
email?: string,
nik?: string,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/warga/filter',
            query: {
                'nama_warga': namaWarga,
                'alamat': alamat,
                'email': email,
                'nik': nik,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Get warga data by id
     * Returns warga data based on given id
     * @param id ID of the warga to get
     * @returns DataResponse Successful operation
     * @returns Error an 'unexpected error' occurred
     * @throws ApiError
     */
    public getWargaById(
id: number,
): Observable<DataResponse | Error> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/warga/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Warga not found`,
            },
        });
    }

    /**
     * Update existing warga data
     * Updates existing warga data based on given id
     * @param id ID of the warga to update
     * @param requestBody 
     * @returns DataResponse Warga data updated successfully
     * @throws ApiError
     */
    public updateWarga(
id: number,
requestBody: Warga,
): Observable<DataResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/warga/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
