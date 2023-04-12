import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/jenis-perizinan/jenis-perizinan.model';
import Swal from 'sweetalert2';
import { JenisPerizinanService } from '@core/http/api';
import { UserService } from '@pages/master/user/user.service';

@Component({
  selector: 'app-jenis-perizinan-form',
  templateUrl: './jenis-perizinan-form.component.html',
  styleUrls: [],
  providers: [UserService, DecimalPipe]
})

export class JenisPerizinanFormComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';
  @Input('jenisIzin') jenisIzin: Table = {
    jenis_id: 0,
    deskripsi_perizinan: '',
    nama_perizinan: '',
    created_at: ''
  };

  public today = new Date();

  constructor(
    private jenisPerizinanService: JenisPerizinanService,
    public datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    if (!this.jenisIzin) {
      this.jenisIzin = {
        jenis_id: 0,
        deskripsi_perizinan: '',
        created_at: '',
        nama_perizinan: ''
      };
    }
  }


  async save() {
    try {
      if (this.mode === 'edit') {
        await this.jenisPerizinanService.updateJenisPerizinan(this.jenisIzin.jenis_id, {
          nama_jenis: this.jenisIzin.nama_perizinan,
          deskripsi_perizinan: this.jenisIzin.deskripsi_perizinan
        }).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      } else {
        await this.jenisPerizinanService.createJenisPerizinan({
          nama_jenis: this.jenisIzin.nama_perizinan,
          deskripsi_perizinan: this.jenisIzin.deskripsi_perizinan
        }).toPromise();
        Swal.fire('Created!', 'Saved successfully.', 'success');
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

}
