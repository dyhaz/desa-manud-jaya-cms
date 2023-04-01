// Table data
export interface Table {
    keterangan: string;
    lampiran: string;
    tanggal_request : string;
    status_request : string;
    request_id: number;
    jenis_id: number;
    warga_id: number;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
