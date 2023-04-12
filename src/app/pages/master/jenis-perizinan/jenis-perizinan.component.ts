import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './jenis-perizinan.model';

import { JenisIzinTableService } from './jenis-perizinan.service';
import { AdvancedSortableDirective, SortEvent } from '../../tables/advancedtable/advanced-sortable.directive';
import { JenisPerizinanService } from '@core/http/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from "sweetalert2";

@Component({
  selector: 'app-jenis-izin-management',
  templateUrl: './jenis-perizinan.component.html',
  styleUrls: ['./jenis-perizinan.component.scss'],
  providers: [JenisIzinTableService, DecimalPipe]
})

export class JenisPerizinanComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];

  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  @ViewChild('content') editmodal: TemplateRef<any>;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(
    public service: JenisIzinTableService,
    public jenisPerizinanService: JenisPerizinanService,
    public domSanitizer: DomSanitizer,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'User Management', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
    this.changeDetectorRef.detectChanges();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }


  /**
   * fetches the table value
   */
  async _fetchData() {
    const result = await this.jenisPerizinanService.getAllJenisPerizinan().toPromise();
    this.tableData = result.data;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  openModal(table?: Table) {
    this.selected = table;
    this.modalService.open(this.editmodal);
  }

  async delete(table?: Table) {
    try {
      await this.jenisPerizinanService.deleteJenisPerizinan(table.jenis_id).toPromise();
      await Swal.fire('Deleted!', 'Jenis Perizinan has been deleted.', 'success');
      await this._fetchData();
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }
}
