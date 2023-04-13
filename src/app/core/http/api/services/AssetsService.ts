/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class AssetsService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Upload a new asset file.
     * Upload a new asset file.
     * @param formData Asset file to upload
     * @returns any Asset file uploaded successfully
     * @throws ApiError
     */
    public uploadAssetFile(
formData: {
/**
 * Asset file to upload
 */
file: Blob;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/assets',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid request`,
            },
        });
    }

    /**
     * Download an asset file.
     * Download an asset file.
     * @param filename The filename of the asset to download
     * @returns any Asset file downloaded successfully
     * @throws ApiError
     */
    public downloadAssetFile(
filename: string,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/assets/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                404: `Asset file not found`,
            },
        });
    }

    /**
     * Upload a new asset file from base64-encoded data.
     * Upload a new asset file from base64-encoded data.
     * @param requestBody Asset file to upload in base64-encoded format
     * @returns any Asset file uploaded successfully
     * @throws ApiError
     */
    public uploadAssetFileFromBase64(
requestBody: {
/**
 * Base64-encoded asset file to upload
 */
file: string;
/**
 * File extension of the asset file (e.g. 'jpg', 'png', 'pdf')
 */
extension?: string;
},
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/assets2',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request`,
            },
        });
    }

}
