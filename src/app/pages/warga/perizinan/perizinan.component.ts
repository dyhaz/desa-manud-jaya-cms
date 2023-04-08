import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './perizinan.model';

import { AdvancedSortableDirective, SortEvent } from '@pages/tables/advancedtable/advanced-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { PerizinanTableService } from '@pages/warga/perizinan/perizinan.service';
import { JenisPerizinanService, PerizinanService } from '@core/http/api';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-perizinan-management',
  templateUrl: './perizinan.component.html',
  styleUrls: ['./perizinan.component.scss'],
  providers: [PerizinanTableService, DecimalPipe]
})

export class MyPerizinanComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];

  public selected: any;
  public user: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  @ViewChild('content') editmodal: TemplateRef<any>;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;
  private jenisPerizinanList: any[] = [];

  constructor(
    public service: PerizinanTableService,
    public perizinanManagementService: PerizinanService,
    public domSanitizer: DomSanitizer,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    private jenisPerizinanService: JenisPerizinanService
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Perizinan Management', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
    this.getAllJenisPerizinan();
    this.changeDetectorRef.detectChanges();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }


  /**
   * fetches the table value
   */
  async _fetchData(status = 'Menunggu Persetujuan') {
    this.service.status = status;
    this.service.reloadData();
    const result = await this.perizinanManagementService.getPerizinanByEmail(this.user.email, status).toPromise();
    this.tableData = { ...result.data, ...result.data.warga };
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

  async getAllJenisPerizinan() {
    try {
      const result = await this.jenisPerizinanService.getAllJenisPerizinan().toPromise();
      this.jenisPerizinanList = result.data;
    } catch(e) {
      await Swal.fire('Error', e);
    }
  }

  getNamaJenisPerizinan(idJenis: any) {
    return this.jenisPerizinanList.filter(item => item.jenis_id + '' === idJenis + '')[0]?.nama_perizinan;
  }

  downloadLampiran(lampiran: string) {
    lampiran = lampiran.replace('data:', '')
      .replace(/^.+,/, '');
    const blob = new Blob([atob(lampiran)], {type: 'application/pdf'});
    saveAs(blob, 'lampiran.pdf');
  }
}
