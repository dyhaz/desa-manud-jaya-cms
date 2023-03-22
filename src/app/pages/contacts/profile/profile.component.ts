import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { Table } from "@pages/master/user/user.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  @ViewChild('content') editmodal: TemplateRef<any>;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueBarChart: ChartType;
  statData;

  public loginName = '';
  public loginPhoto = '';

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
    this._fetchData();

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.loginName = JSON.parse(currentUser).name;
      this.loginPhoto = JSON.parse(currentUser).photo;
    }
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }

  openModal() {
    this.modalService.open(this.editmodal);
  }
}
