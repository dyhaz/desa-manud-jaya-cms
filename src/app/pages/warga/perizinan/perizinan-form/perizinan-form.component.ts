import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Table } from '@pages/master/perizinan/admin/perizinan.model';
import Swal from 'sweetalert2';
import { PerizinanTableService } from '@pages/master/perizinan/admin/perizinan.service';
import { JenisPerizinanService, PerizinanService, WargaService } from '@core/http/api';
import { saveAs } from 'file-saver';
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

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
  public jenisPerizinanList = [];
  public jenisPerizinan = '';
  @Output() public dismiss = new EventEmitter<any>();
  config: DropzoneConfigInterface = {
    maxFilesize: 50,
    acceptedFiles: 'application/pdf',
    method: 'POST',
    uploadMultiple: false,
    autoProcessQueue: true,
    accept: (file) => {
      this.onAccept(file);
    },
    addRemoveLinks: true,
    dictRemoveFile: 'Hapus',
    dictFileSizeUnits: { gb: 'GB', mb: 'MB', kb: 'KB', b: 'bytes' }
  };

  public today = new Date();

  constructor(
    private perizinanService: PerizinanService,
    private wargaService: WargaService,
    private jenisPerizinanService: JenisPerizinanService,
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

    this.getAllJenisPerizinan();
  }


  async approve() {
    try {
      if (this.mode === 'edit') {
        await this.perizinanService.updatePerizinan(this.perizinan.request_id,{
          alamat: '',
          jenis_id: this.perizinan.jenis_id,
          keterangan: this.perizinan.keterangan,
          jenis_perizinan: this.perizinan.jenis_id + '',
          status_request: 'Menunggu Persetujuan',
          nama: '',
          tanggal_request: this.perizinan.tanggal_request,
          tanggal_mulai: '',
          tanggal_selesai: ''
        }).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.dismiss.emit();
        this.modal.dismiss();
      } else {
        let warga;
        let user = JSON.parse(localStorage.getItem('currentUser'));
        const result = await this.wargaService.filterWarga('', '', user.email).toPromise();
        if (result.data.length > 0) {
          warga = result.data[0];
        } else {
          const result: any = await this.wargaService.storeWarga({
            nik: '' + Math.floor(Math.random() * 10000),
            email: user.email,
            nama_warga: user.name,
            nomor_telepon: '12345',
            warga_id: 0,
            alamat: 'Salemba'
          }).toPromise();
          if (result.data) {
            warga = result.data;
          }
        }

        await this.perizinanService.createPerizinan({
          alamat: '',
          jenis_id: this.perizinan.jenis_id,
          keterangan: this.perizinan.keterangan,
          jenis_perizinan: this.perizinan.jenis_id + '',
          status_request: 'Menunggu Persetujuan',
          nama: '',
          tanggal_request: this.perizinan.tanggal_request,
          warga_id: warga.warga_id,
          lampiran: this.perizinan.lampiran
        }).toPromise();
        Swal.fire('Updated!', 'Saved successfully.', 'success');
        this.dismiss.emit();
        this.modal.dismiss();
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

  async getAllJenisPerizinan() {
    try {
      const result = await this.jenisPerizinanService.getAllJenisPerizinan().toPromise();
      this.jenisPerizinan = result.data.filter(item => item.jenis_id + '' === this.perizinan?.jenis_id + '')[0]?.nama_perizinan;
      this.jenisPerizinanList = result.data.map(item => {
        return {
          value: item.jenis_id,
          name: item.nama_perizinan
        }
      });
    } catch(e) {
      await Swal.fire('Error', e);
    }
  }

  onAccept(file: any) {
    const fileToBase64 = (file:File):Promise<string> => {
      return new Promise<string> ((resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.toString());
        reader.onerror = error => reject(error);
      })
    }

    fileToBase64(file)
      .then(result=>{
        // To remove data url part
        this.perizinan.lampiran =  result.replace('data:', '')
          .replace(/^.+,/, '');
      });
  }

  downloadLampiran(lampiran: string) {
    try {
      lampiran = lampiran.replace('data:', '')
        .replace(/^.+,/, '');
      const blob = new Blob([atob(lampiran)], {type: 'application/pdf'});
      saveAs(blob, 'lampiran.pdf');
    } catch (e) {
      Swal.fire('Error', 'Lampiran tidak ditemukan')
    }
  }
}
