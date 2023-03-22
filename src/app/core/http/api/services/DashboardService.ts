/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class DashboardService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Show the dashboard with summary data.
     * @returns any Dashboard record retrieved successfully
     * @throws ApiError
     */
    public dashboard(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/dashboard',
        });
    }

    /**
     * Get the total anggaran for each month in the current year.
     * @returns any Dashboard record retrieved successfully
     * @throws ApiError
     */
    public anggaran(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/dashboard/anggaran',
        });
    }

}
