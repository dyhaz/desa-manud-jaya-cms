import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './program.model';

import { ProgramService } from './program.service';
import { AdvancedSortableDirective, SortEvent } from '../../tables/advancedtable/advanced-sortable.directive';
import { ProgramDesaService } from '@core/http/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { ProgramFormComponent } from '@pages/master/program/program-form/program-form.component';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  providers: [ProgramService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class ProgramComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];

  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  @ViewChild('content') editmodal: TemplateRef<any>;
  @ViewChild('form') form: ProgramFormComponent;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(
    public service: ProgramService,
    private programDesa: ProgramDesaService,
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    public datePipe: DatePipe
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Program Desa', active: true }];
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
    const result = await this.programDesa.getProgramDesa().toPromise();
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

  async deleteItem(table: Table) {
    try {
      await this.programDesa.deleteProgram(table.program_id).toPromise();
      await Swal.fire('Deleted!', 'Program has been deleted.', 'success');
      await this._fetchData();
    } catch (e) {
      await Swal.fire('Error', e?.body?.error);
    }
  }

  openModal(table?: Table) {
    this.selected = table;
    this.modalService.open(this.editmodal);
  }
}
