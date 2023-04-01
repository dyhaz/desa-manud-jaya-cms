/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Data yang diperlukan untuk memperbarui permintaan perizinan
 */
export type UpdateRequestPerizinan = {
    /**
     * Nama lengkap pemohon perizinan
     */
    nama: string;
    /**
     * Alamat lengkap pemohon perizinan
     */
    alamat: string;
    /**
     * Jenis perizinan yang diminta
     */
    jenis_perizinan: string;
    /**
     * ID dari perizinan yang diajukan
     */
    jenis_id: number;
    /**
     * Tanggal request perizinan
     */
    tanggal_request?: string;
    /**
     * Keterangan perizinan
     */
    keterangan?: string;
    /**
     * Status perizinan
     */
    status_request?: string;
    /**
     * Tanggal mulai berlakunya perizinan
     */
    tanggal_mulai: string;
    /**
     * Tanggal berakhirnya perizinan
     */
    tanggal_selesai: string;
};
