/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRequestPerizinan = {
    /**
     * Nama lengkap pemohon perizinan
     */
    nama: string;
    /**
     * Alamat lengkap pemohon perizinan
     */
    alamat: string;
    /**
     * Tanggal request perizinan
     */
    tanggal_request?: string;
    /**
     * Keterangan perizinan
     */
    keterangan?: string;
    /**
     * Lampiran perizinan
     */
    lampiran?: string;
    /**
     * Status perizinan
     */
    status_request?: string;
    /**
     * Jenis perizinan yang diajukan
     */
    jenis_perizinan?: string;
    /**
     * ID dari perizinan yang diajukan
     */
    jenis_id?: number;
    /**
     * ID dari warga yang mengajukan perizinan
     */
    warga_id: number;
};
