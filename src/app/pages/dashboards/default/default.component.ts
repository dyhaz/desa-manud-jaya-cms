import { Component, OnInit, ViewChild } from '@angular/core';
import { monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { Router } from "@angular/router";
import { DashboardService, WargaService } from "@core/http/api";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string = new Date().getFullYear() + '';
  yearList: string[] = [];

  simplePieChart: any;

  public loginName = '';
  public loginPhoto = '';
  public user: any;

  @ViewChild('content') content;
  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private eventService: EventService,
    private router: Router,
    private dashboardService: DashboardService,
    private wargaService: WargaService
  ) {
  }

  async ngOnInit() {

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');

     this.isVisible = attribute;
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
         console.log(horizontal);
       }
     }

    /**
     * Initialize last 3 years
     */
    for(let i = 0 ; i < 3 ; i++) {
      this.yearList.push(String(new Date().getFullYear() - i));
    }

    /**
     * Fetches the data
     */
    await this.fetchData();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.loginName = currentUser.name;
      this.loginPhoto = currentUser.photo;
      this.user = currentUser;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.openModal();
    }, 2000);
  }

  /**
   * Fetches the data
   */
  public async fetchData(year?: string) {
    // this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = year ? year : new Date().getFullYear() + '';
    const budget = await this.getAnggaranChart(year);
    this.emailSentBarChart = {
      chart: {
        height: 340,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Total Anggaran',
        data: [1,2,3,4,5,6,7,8,9,10,11,12].map(item => {
          const anggaran = budget.filter((item2) => item2.month + '' === item + '')[0]?.total_anggaran;
          return anggaran ? Number(anggaran) : 0;
        })
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      colors: ['#556ee6', '#f1b44c', '#34c38f'],
      legend: {
        position: 'bottom',
      },
      fill: {
        opacity: 1
      },
    };
    this.configService.getConfig().subscribe(async (data) => {
      this.transactions = data.transactions;
      this.statData = data.statData;

      const dashboard = await this.dashboardService.dashboard().toPromise();
      this.statData.forEach((stat: any) => {
        if (stat.title === 'Total Program') {
          stat.value = dashboard.data.totalPrograms;
        }

        if (stat.title === 'Total Budget') {
          const options = { style: 'currency', currency: 'IDR' }; // formatting options
           // format the number as IDR currency
          stat.value = Number(dashboard.data.totalBudget).toLocaleString('id-ID', options);
        }

        if (stat.title === 'Program Aktif') {
          stat.value = dashboard.data.ongoingPrograms;
        }
      });
      this.simplePieChart = {
        data: {
          series: dashboard.data.perizinan.filter(item => item.jumlahRequest > 0).map(item => {
            return item.jumlahRequest;
          }),
          labels: dashboard.data.perizinan.filter(item => item.jumlahRequest > 0).map(item => {
            return `${item.jenisPerizinan}`;
          })
        },
        options: {
          height: 500,
          type: 'pie',
          showLabel: true
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          verticalAlign: 'middle',
          floating: false,
          fontSize: '14px',
          offsetX: 0,
          offsetY: -10
        },
        responsive: [{
          breakpoint: 600,
          options: {
            chart: {
              height: 240
            },
            legend: {
              show: false
            },
          }
        }],
        colors: ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c'],
        type: 'Pie'
      };
      for (let i = 0 ; i < 99; i ++) {
        this.simplePieChart.colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
      }
    });
  }

  async getAnggaranChart(year?: string) {
    try {
      if (!year) {
        const budget = await this.dashboardService.anggaran().toPromise();
        return budget.data;
      } else {
        const budget = await this.dashboardService.anggaranByMonth(year).toPromise();
        return budget.data;
      }
    } catch (e) {
      Swal.fire('Error', e.toString());
    }

    return [];
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

  viewProfile() {
    this.router.navigate(['/contacts/profile']);
  }

  async addSubscription(value) {
     try {
       const result = await this.wargaService.filterWarga('', '', value).toPromise();
       const warga = result.data[0];
       if (warga) {
         await this.wargaService.updateWarga(warga.id, {
           ...warga,
           news_subscribe: true
         })
         Swal.fire('Sukses!', 'Terima kasih. Silakan cek inbox konfirmasi lebih lanjut.', 'success');
       }
     } catch (e) {
     }
  }
}
