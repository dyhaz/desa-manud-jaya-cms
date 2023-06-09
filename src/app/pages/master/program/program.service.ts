import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Table, SearchResult } from './program.model';
import { SortDirection } from '@pages/tables/advancedtable/advanced-sortable.directive';
import { ProgramDesaService } from "@core/http/api";
import Swal from "sweetalert2";

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * Sort the table data
 * @param tabless Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: Table[], column: string, direction: string): Table[] {
  if (direction === '' || column === '') {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 * @param pipe
 */
function matches(tables: Table, term: string, pipe: PipeTransform) {
  return tables.nama_program?.toLowerCase()?.includes(term.toLowerCase())
    || tables.deskripsi_program?.toLowerCase()?.includes(term)
    || tables.tanggal_mulai?.toLowerCase()?.includes(term)
    || tables.tanggal_selesai?.toLowerCase()?.includes(term)
    || pipe.transform(tables.anggaran)?.includes(term)
    || tables.foto?.toLowerCase()?.includes(term);
}

@Injectable({
  providedIn: 'root'
})

export class ProgramService {
  private tableData: Table[] = null;
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _tables$ = new BehaviorSubject<Table[]>([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);
  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };

  constructor(
    private pipe: DecimalPipe,
    private programDesa: ProgramDesaService
  ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(async () => await this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      result.subscribe((res) => {
        this._tables$.next(res.tables);
        this._total$.next(res.total);
      })
    });
    this._search$.next();
  }

  /**
   * Returns the value
   */
  get tables$() {
    return this._tables$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get startIndex() {
    return this._state.startIndex;
  }

  get endIndex() {
    return this._state.endIndex;
  }

  get totalRecords() {
    return this._state.totalRecords;
  }

  /**
   * set the value
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) {
    this._set({page});
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) {
    this._set({startIndex});
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) {
    this._set({endIndex});
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) {
    this._set({totalRecords});
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * Search Method
   */
  private async _search(): Promise<Observable<SearchResult>> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    let tables = null;
    let total = 0;

    // 1. sort
    try {
      let result;
      if (!this.tableData) {
        result = await this.programDesa.getProgramDesa().toPromise();
        this.tableData = result.data;
      }

      tables = sort(this.tableData, sortColumn, sortDirection);

      // 2. filter
      tables = tables.filter(table => matches(table, searchTerm, this.pipe));
      total = tables.length;

      // 3. paginate
      this.totalRecords = tables.length;
      this._state.startIndex = (page - 1) * this.pageSize + 1;
      this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
        this.endIndex = this.totalRecords;
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }

    tables = tables?.slice(this._state.startIndex - 1, this._state.endIndex);
    return of(
      {tables, total}
    );
  }
}
