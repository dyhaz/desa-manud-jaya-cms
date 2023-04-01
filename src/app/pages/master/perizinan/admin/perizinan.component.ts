import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './perizinan.model';

import { AdvancedSortableDirective, SortEvent } from '@pages/tables/advancedtable/advanced-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { PerizinanTableService } from '@pages/master/perizinan/admin/perizinan.service';
import { PerizinanService } from '@core/http/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-perizinan-management',
  templateUrl: './perizinan.component.html',
  styleUrls: ['./perizinan.component.scss'],
  providers: [PerizinanTableService, DecimalPipe]
})

export class PerizinanManagementComponent implements OnInit {
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
    public service: PerizinanTableService,
    public perizinanManagementService: PerizinanService,
    public domSanitizer: DomSanitizer,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Perizinan Management', active: true }];
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
    const result = await this.perizinanManagementService.getPerizinan().toPromise();
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

  downloadLampiran(lampiran: string) {
    lampiran = lampiran.replace('data:', '')
      .replace(/^.+,/, '');
    const blob = new Blob([atob(lampiran)], {type: 'pdf'});
    saveAs(blob, 'lampiran.pdf');
  }
}
