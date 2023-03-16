/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class ProgramDesaService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get list of program desa
     * Returns list of program desa
     * @returns any successful operation
     * @throws ApiError
     */
    public getProgramDesa(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/program',
            errors: {
                400: `Bad request`,
            },
        });
    }

    /**
     * Get ProgramDesa information
     * Returns ProgramDesa data
     * @param id ProgramDesa ID
     * @returns any Successful operation
     * @throws ApiError
     */
    public getProgramDesaById(
id: number,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/program_desa/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `ProgramDesa not found`,
            },
        });
    }

    /**
     * Update existing ProgramDesa
     * Returns updated ProgramDesa data
     * @param id ProgramDesa ID
     * @param requestBody 
     * @returns any Successful operation
     * @throws ApiError
     */
    public updateProgramDesa(
id: number,
requestBody: {
nama_program: string;
deskripsi_program: string;
tanggal_mulai: string;
tanggal_selesai: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/program_desa/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `ProgramDesa not found`,
            },
        });
    }

    /**
     * Store new ProgramDesa
     * Returns ProgramDesa data
     * @param requestBody 
     * @returns any Successful operation
     * @throws ApiError
     */
    public storeProgramDesa(
requestBody: {
nama_program: string;
deskripsi_program: string;
tanggal_mulai: string;
tanggal_selesai: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/program_desa',
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
    public deleteProgram(
id: any,
): Observable<void> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/program/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Program record not found`,
            },
        });
    }

}
