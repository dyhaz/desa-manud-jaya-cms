/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { LandingPageResponse } from '../models/LandingPageResponse';
import type { LandingPageUpdateRequest } from '../models/LandingPageUpdateRequest';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class LandingService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Get landing page data
     * @returns LandingPageResponse Returns the landing page data
     * @throws ApiError
     */
    public landingPage(): Observable<LandingPageResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/landing-page',
        });
    }

    /**
     * Update landing page data
     * @param requestBody 
     * @returns any Landing page updated successfully
     * @throws ApiError
     */
    public updateLandingPage(
requestBody: LandingPageUpdateRequest,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/landing-page',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation error(s)`,
            },
        });
    }

}
