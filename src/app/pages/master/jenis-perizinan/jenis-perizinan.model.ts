// Table data
export interface Table {
  jenis_id: number;
  nama_jenis: string;
  deskripsi_perizinan: string;
  created_at: string;
}

// Search Data
export interface SearchResult {
  tables: Table[];
  total: number;
}
