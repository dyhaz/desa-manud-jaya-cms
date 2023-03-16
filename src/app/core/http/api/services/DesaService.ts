/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class DesaService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Retrieve a single Desa record by ID
     * @param id 
     * @returns any Desa record retrieved successfully
     * @throws ApiError
     */
    public showDesa(
id: any,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/desa/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Desa record not found`,
            },
        });
    }

    /**
     * Get all Desa records
     * Returns a list of all Desa records.
     * @returns any Successful operation
     * @throws ApiError
     */
    public getAllDesa(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/desa',
            errors: {
                401: `Unauthorized`,
                404: `Not found`,
            },
        });
    }

    /**
     * Create a new Desa record
     * Creates a new Desa record with the given data.
     * @param requestBody 
     * @returns any Successful operation
     * @throws ApiError
     */
    public createDesa(
requestBody: {
nama_desa: string;
kecamatan: string;
kabupaten_kota: string;
provinsi: string;
jumlah_penduduk: number;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/desa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                422: `Validation error`,
            },
        });
    }

    /**
     * Update a Desa record
     * Update a specific Desa record.
     * @param id ID of the Desa to update.
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public c9797173349891B9Ed85Bfdda17B267F(
id: number,
requestBody: {
nama_desa: string;
kecamatan: string;
kabupaten_kota: string;
provinsi: string;
jumlah_penduduk: number;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/desa/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Desa not found`,
            },
        });
    }

}
