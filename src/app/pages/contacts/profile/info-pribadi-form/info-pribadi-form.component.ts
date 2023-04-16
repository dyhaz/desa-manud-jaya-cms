import { Component, Input, OnInit } from "@angular/core";
import { AssetsService } from "@core/http/api";
import Swal from "sweetalert2";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor(
    private assetService: AssetsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      namaLengkap: ['', [Validators.required]],
      tempatLahir: new FormControl('', [Validators.required]),
      tanggalLahir: ['', [Validators.required]],
      jenisKelamin: ['', [Validators.required]],
      alamat: ['', [Validators.required]],
      noKTP: ['', [Validators.required]]
    });
  }

  async save() {
    try {
      Swal.showLoading();
      this.uploadFile().then((fileName) => {
        // Add save biodata here
      })
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
        const result = await this.assetService.uploadAssetFile({
          file: this.fileKTP
        }).toPromise();
        resolve(result.data);
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
