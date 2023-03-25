/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class JenisProgramService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get all jenis program
     * Returns a list of all the jenis program.
     * @returns any Successful operation
     * @throws ApiError
     */
    public showJenisProgram(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/jenis-program',
        });
    }

    /**
     * Create a new jenis program
     * Creates a new jenis program record.
     * @param requestBody Jenis program details
     * @returns any Jenis program created successfully
     * @throws ApiError
     */
    public addJenisProgram(
requestBody: {
nama?: string;
deskripsi?: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/jenis-program',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }

}
