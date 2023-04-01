import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/perizinan/admin/perizinan.model';
import Swal from 'sweetalert2';
import { PerizinanTableService } from '@pages/master/perizinan/admin/perizinan.service';
import { PerizinanService } from '@core/http/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-perizinan-form',
  templateUrl: './perizinan-form.component.html',
  styleUrls: [],
  providers: [PerizinanTableService, DecimalPipe]
})

export class PerizinanFormComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';
  @Input('perizinan') perizinan: Table = {
    lampiran: '',
    tanggal_request: '',
    keterangan: '',
    status_request: '',
    jenis_id: 0,
    request_id: 0,
    warga_id: 0,
    warga: {
      nik: '',
      warga_id: 0,
      nama_warga: '',
      alamat: '',
      created_at: '',
      email: '',
      nomor_telepon: '',
      updated_at: ''
    }
  };
  @Output() public dismiss = new EventEmitter<any>();

  public today = new Date();

  constructor(
    private perizinanService: PerizinanService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    if (!this.perizinan) {
      this.perizinan = {
        lampiran: '',
        tanggal_request: '',
        keterangan: '',
        status_request: '',
        jenis_id: 0,
        request_id: 0,
        warga_id: 0,
        warga: {
          nik: '',
          warga_id: 0,
          nama_warga: '',
          alamat: '',
          created_at: '',
          email: '',
          nomor_telepon: '',
          updated_at: ''
        }
      };
    }
  }


  async approve() {
    try {
      if (this.mode === 'edit') {
        await this.perizinanService.updatePerizinan(this.perizinan.request_id,{
          alamat: '',
          jenis_id: this.perizinan.jenis_id,
          keterangan: this.perizinan.keterangan,
          jenis_perizinan: this.perizinan.jenis_id + '',
          status_request: 'Disetujui',
          nama: '',
          tanggal_request: this.perizinan.tanggal_request,
          tanggal_mulai: '',
          tanggal_selesai: ''
        }).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.dismiss.emit();
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

  async reject() {
    try {
      if (this.mode === 'edit') {
        await this.perizinanService.updatePerizinan(this.perizinan.request_id,{
          alamat: '',
          jenis_id: this.perizinan.jenis_id,
          keterangan: this.perizinan.keterangan,
          jenis_perizinan: this.perizinan.jenis_id + '',
          status_request: 'Ditolak',
          nama: '',
          tanggal_request: this.perizinan.tanggal_request,
          tanggal_mulai: '',
          tanggal_selesai: ''
        }).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.dismiss.emit();
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

  downloadLampiran(lampiran: string) {
    lampiran = lampiran.replace('data:', '')
      .replace(/^.+,/, '');
    const blob = new Blob([atob(lampiran)], {type: 'application/pdf'});
    saveAs(blob, 'lampiran.pdf');
  }
}
