import { Component, Input, OnInit } from '@angular/core';
import { AssetsService, UserManagementService, WargaService } from '@core/http/api';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './info-pribadi-form.component.html',
  styleUrls: ['./info-pribadi-form.component.scss']
})

export class InfoPribadiFormComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('mode') mode: 'edit'|'add' = 'add';

  formData: FormGroup;

  fileKTP: any;
  filePhoto: any;

  user: any;

  constructor(
    private assetService: AssetsService,
    private formBuilder: FormBuilder,
    private wargaService: WargaService,
    private userService: UserManagementService
  ) {
  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      namaLengkap: ['', [Validators.required]],
      tempatLahir: new FormControl('', [Validators.required]),
      tanggalLahir: ['', [Validators.required]],
      jenisKelamin: ['', [Validators.required]],
      alamat: ['', [Validators.required]],
      noKTP: ['', [Validators.required]],
      phone: ['']
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  async save() {
    try {
      Swal.showLoading();
      this.uploadFile().then(async (file: { ktp: string, foto: string }) => {
        // Add save biodata here
        await this.wargaService.storeWarga({
          email: this.user.email,
          alamat: this.formData.get('alamat').value,
          nik: this.formData.get('noKTP').value,
          nama_warga: this.formData.get('namaLengkap').value,
          nomor_telepon: this.formData.get('phone').value,
          warga_id: 0,
          news_subscribe: false
        }).toPromise();
        await this.userService.updateUser({
          ...this.user,
          phone: this.formData.get('phone').value,
        }, this.user.id).toPromise();
      });
      console.log(this.formData);
      Swal.hideLoading();
    } catch (e) {
      Swal.hideLoading();
      Swal.fire('Error', e.toString());
    }
  }

  uploadFile() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result1 = await this.assetService.uploadAssetFile({
          file: this.fileKTP
        }).toPromise();
        const result2 = await this.assetService.uploadAssetFile({
          file: this.filePhoto
        }).toPromise();
        resolve({
          ktp: result1.data,
          foto: result2.data
        });
      } catch (e) {
        reject(e.toString());
      }
    })
  }

  changeKtp(ev) {
    this.onImageChanged(ev).then((result) => {
      this.fileKTP = result;
    })
  }

  changeFoto(ev) {
    this.onImageChanged(ev).then((result) => {
      this.filePhoto = result;
    })
  }

  onImageChanged(event: Event) {
    return new Promise<any>((resolve, reject) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length) {
        const name = files[0].name;
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result as string;
          resolve(files[0]);
        };
        reader.onerror = (error) => {
          reject(error);
        }
        reader.readAsDataURL(files[0]);
      }
    });
  }
}
