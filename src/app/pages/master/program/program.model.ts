// Table data
export interface Table {
    nama_program: string;
    deskripsi_program: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    foto: string;
    anggaran: string;
    program_id: number;
    status?: any;
    updated_at?: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
