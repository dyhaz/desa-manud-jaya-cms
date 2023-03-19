// Table data
export interface Table {
    name: string;
    email: string;
    photo: string;
    created_at: string;
    id: number;
    password?: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
