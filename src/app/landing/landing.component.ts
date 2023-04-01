import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CreateRequestPerizinan, PerizinanService, ProgramDesaService } from "@core/http/api";
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

/**
 * Crypto landing page
 */
export class LandingComponent implements OnInit {
  @ViewChild('portfolioModal1') portfolioModal: TemplateRef<any>;
  public selectedProgram = 0;
  public loading = false;
  public warga: any = {};
  public requestPerizinan: CreateRequestPerizinan = {
    alamat: '',
    jenis_perizinan: '',
    jenis_id: 1,
    nama: '',
    status_request: 'Menunggu Persetujuan',
    tanggal_request: (new Date()).toISOString().split('T')[0],
    keterangan: '',
    warga_id: 1,
    lampiran: ''
  };

  // set the currenr year
  year: number = new Date().getFullYear();
  currentSection = 'home';

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 24,
    nav: false,
    dots: false,
    responsive: {
      672: {
        items: 3
      },
      912: {
        items: 4
      },
    }
  }

  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive: {
      672: {
        items: 3
      },

      576: {
        items: 2
      },

      936: {
        items: 4
      },
    }
  }

  public programDesaList: any[] = [];

  private _trialEndsAt;

  private _diff: number;
  _days: number;
  _hours: number;
  _minutes: number;
  _seconds: number;

  constructor(
    private programDesa: ProgramDesaService,
    public domSanitizer: DomSanitizer,
    private modalService: NgbModal,
    private perizinanService: PerizinanService
  ) {

  }

  ngOnInit() {
    this._trialEndsAt = "2021-12-31";

    interval(3000).pipe(
      map((x) => {
        this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });

    this.loadProgramDesa();
  }

  async loadProgramDesa() {
    try {
      this.loading = true;
      const result = await this.programDesa.getProgramDesaLanding().toPromise();
      this.programDesaList = result.data;
      this.programDesaList.forEach(item => {
        item.foto = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + item.foto);
      });
      this.loading = false;
    } catch (e) {
      this.loading = false;
      Swal.fire('Error', e.toString());
    }
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('navbar-shrink')
    } else {
      navbar.classList.remove('navbar-shrink')
    }
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('topnav-menu-content').classList.toggle('show');
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  showModal(index: number) {
    this.selectedProgram = index;
    // modal.setAttribute('style', 'display: block !important; opacity: 100');
    this.modalService.open(this.portfolioModal, { size: 'lg' });
  }

  closeModal() {
    // modal.setAttribute('style', 'display: none !important; opacity: 0');
    this.modalService.dismissAll();
  }

  async sendMessage() {
    try {
      await this.perizinanService.createPerizinan(this.requestPerizinan).toPromise();
      Swal.fire('Sukses!', 'Request Anda telah diterima', 'success');
    } catch (e) {
      await Swal.fire('Error', 'Input yang Anda berikan tidak valid. Silakan cek kembali dan pastikan semua kolom telah diisi dengan benar.');
    }

  }

  uploadLampiran(ev) {
    const fileToBase64 = (file:File):Promise<string> => {
      return new Promise<string> ((resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.toString());
        reader.onerror = error => reject(error);
      })
    }

    fileToBase64(ev.target.files[0])
      .then(result=>{
        this.requestPerizinan.lampiran =  result;
      });
  }
}
