// Table data
import { Warga } from '@core/http/api';

export interface Table {
    keterangan: string;
    lampiran: string;
    tanggal_request : string;
    status_request : string;
    request_id: number;
    jenis_id: number;
    warga_id: number;
    warga: Warga
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
