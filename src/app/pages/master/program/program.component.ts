import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './program.model';

import { tableData, editableTable } from './data';

import { ProgramService } from './program.service';
import { AdvancedSortableDirective, SortEvent } from '../../tables/advancedtable/advanced-sortable.directive';

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
  editableTable: any;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(public service: ProgramService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Glenna Reichert', title: 'Glenna Reichert' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: editableTable,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
    },
  };

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Program Desa', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }


  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = tableData;
    this.editableTable = editableTable;
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
}
