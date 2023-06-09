import { Component, OnInit, ViewChildren, QueryList, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './user.model';

import { UserService } from './user.service';
import { AdvancedSortableDirective, SortEvent } from '../../tables/advancedtable/advanced-sortable.directive';
import { UserManagementService } from '@core/http/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-management',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, DecimalPipe]
})

export class UserManagementComponent implements OnInit {
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
    public service: UserService,
    public userManagementService: UserManagementService,
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
    const result = await this.userManagementService.getUsers().toPromise();
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
      await this.userManagementService.disableUser(table.id).toPromise();
      await Swal.fire('Deleted!', 'User telah dihapus.', 'success');
      await this._fetchData();
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }
}
