// Table data
export interface Table {
    name: string;
    position: string;
    office: string;
    age: any;
    date: string;
    salary: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
