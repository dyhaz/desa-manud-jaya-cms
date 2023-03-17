/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class PelaksanaProgramService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all PelaksanaPrograms
     * @returns any List of PelaksanaPrograms
     * @throws ApiError
     */
    public getAllPelaksanaProgram(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/pelaksana-program',
        });
    }

    /**
     * Create a new PelaksanaProgram
     * @param requestBody 
     * @returns any PelaksanaProgram created
     * @throws ApiError
     */
    public createPelaksanaProgram(
requestBody: {
nama_pelaksana: string;
jabatan: string;
kontak: string;
program_id: number;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/pelaksana-program',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation error`,
            },
        });
    }

    /**
     * Retrieve a single Pelaksana Program record by ID
     * @param id 
     * @returns any Pelaksana Desa record retrieved successfully
     * @throws ApiError
     */
    public showPelaksanaProgram(
id: any,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/pelaksana-program/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Pelaksana Desa record not found`,
            },
        });
    }

    /**
     * Update a Pelaksana Program record
     * Update a specific Pelaksana Program record.
     * @param id ID of the Pelaksana Program to update.
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public updatePelaksanaProgram(
id: number,
requestBody: {
nama_pelaksana: string;
jabatan: string;
kontak: string;
program_id: number;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/pelaksana-program/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Pelaksana Program not found`,
            },
        });
    }

    /**
     * Delete by ID
     * @param id 
     * @returns void 
     * @throws ApiError
     */
    public deletePelaksanaProgram(
id: any,
): Observable<void> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/pelaksana-program/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Pelaksana Program record not found`,
            },
        });
    }

}
