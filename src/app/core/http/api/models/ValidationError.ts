/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Error validasi data request
 */
export type ValidationError = {
    /**
     * Pesan error yang menunjukkan data request tidak valid
     */
    message?: string;
    /**
     * Daftar error validasi pada setiap properti request
     */
    errors?: Array<string>;
};
