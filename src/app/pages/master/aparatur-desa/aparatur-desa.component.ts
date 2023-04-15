import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetsService, LandingPageUpdateRequest, LandingService } from '@core/http/api';
import Swal from "sweetalert2";
import { environment } from "@environments/environment";
import { DragulaService } from 'ng2-dragula';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Official {
  name: string;
  position: string;
  photo: string;
  photoFile?: File;
  photoUrl?: string;
  id: number
}

@Component({
  selector: 'app-officials-edit',
  templateUrl: './aparatur-desa.component.html',
  styleUrls: ['./aparatur-desa.component.scss']
})
export class AparaturDesaComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  officials: Official[] = [
    {
      position: 'Kepala Desa',
      name: 'Erick, S.E',
      photo: 'kepala-desa.jpg',
      id: 1
    },
    {
      position: 'Kepala Urusan Keuangan',
      name: 'Chandrawati S.E',
      photo: 'kepala-urusan-keuangan.jpg',
      id: 2
    },
    {
      position: 'Kepala Urusan Pelayanan',
      name: 'Busyaeri, S.IP',
      photo: 'kepala-urusan-pelayanan.jpg',
      id: 3
    },
    {
      position: 'Sekda',
      name: 'Rafael S.Sos',
      photo: 'sekda.jpg',
      id: 4
    },
  ];
  logoImageName: string = 'logo-light.png';
  logoImageUrl: string = environment.apiConfig.baseUrl + '/api/assets/logo-light.png';
  logoImageFile: File;
  title: string = 'Selamat Datang di Sistem Informasi Manud Jaya!';
  subtitle: string = 'KAMI SENANG MELAYANI ANDA';
  visi: string = 'Terwujudnya warga Desa Manud Jaya yang harmonis, sejahtera, dan berkeadilan Pancasila dan UUD 1945 dalam bingkai NKRI yang ber-Bhineka Tunggal Ika.';
  misi: string = '1. Penguatan reformasi birokrasi menuju pemerintahan yang efektif, efisien, bersih, akuntable, dan menghadirkan pelayanan publik prima.\n' +
    '2. Pengembangan Sumber Daya Manusia unggul, berkarakter, dan berbudaya.\n' +
    '3. Pendayagunaan potensi lokal dengan penerapan teknologi dan penyerapan investasi berorientasi pada pertumbuhan ekonomi inklusif.\n' +
    '4. Peningkatan kualitas lingkungan hidup, infrastruktur, dan pengelolaan risiko bencana.';
  aboutManudJaya: string = 'Manud Jaya merupakan desan yang berbatasan dengan ibukota. Sebanyak 50% dari warganya merupakan pendatang, sebagian wwarganya bekerja di kota sebagian lagi membuka usaha tingkat UMKM. Dengan wilayahnya yang dekat dengan ibukota dan juga dekat dengan bandara Internasional. Desa Manud Jaya memiliki potensi sebagai penunjang ibukota. Letaknya yang strategis, juga 90 % (persen) wilayahnya bebas banjir, hal ini karena daerah ini memiliki area persawahan dan daerah resapan air yang cukup luas. Dalam hal ini Aparat Desa Manud Jaya seharusnya mempersiapkan pembangunan desa ini dengan sangat matang dan terencana. Jika tidak maka akan berdampak pada kualitas lingkungan, yang bisa berakibat justru Desa Manud Jaya yang selama ini 90 % (persen) daerahnya bebas banjir, malah mungkin akan bernasib sama dengan Ibu Kota. Karena pembangunan yang tidak teratur itu justru menimbulkan semakin berkurangnya daerah resapan air. Maka oleh karena itu haruslah ada upaya yang maksimal dari aparat desa terkait agar tidak sembarangan dalam melakukan pembangunan, dan harus tetap menjaga keseimbangan alam agar bisa tetap dinikmati oleh generasi selanjutnya.';
  showCropper = false;
  imageChangedEvent: any = '';
  public Editor = ClassicEditor;
  @ViewChild('logoImageCropper', { static: false }) logoImageCropper: ImageCropperComponent;

  constructor(
    private assetsService: AssetsService,
    private dragulaService: DragulaService,
    private landingService: LandingService
  ) {
    try {
      this.dragulaService.createGroup('officials', {
        moves: (el, container, handle) => handle.classList.contains('handle')
      });

      this.dragulaService.drag().subscribe(() => {
        const elements = document.querySelectorAll('.row .col-md-3');
      });

      this.dragulaService.drop().subscribe(() => {
        const elements = document.querySelectorAll('.row .col-md-3 .official-id');
        const ids = Array.from(elements).map((el: HTMLElement) => Number(el.id));
        // Sort the officials array based on the order of the IDs in the ids array
        this.officials.sort((a, b) => {
          return ids.indexOf(a.id) - ids.indexOf(b.id);
        });
      })
    } catch (e) {
    }
  }

  onLogoImageChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length) {
      this.logoImageName = files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        this.logoImageUrl = reader.result as string;
        this.logoImageFile = files[0];
        this.imageLoaded();
      };
      reader.readAsDataURL(files[0]);
    }
  }

  async onSubmit() {
    try {
      Swal.showLoading();

      if (this.logoImageFile) {
        const uploadRes = await this.assetsService.uploadAssetFile({
          file: this.logoImageFile
        }).toPromise();
        this.logoImageUrl = environment.apiConfig.baseUrl + '/api/assets/' + uploadRes.data;
      }

      const payload: LandingPageUpdateRequest = {
        visi: this.visi,
        misi: this.misi,
        subtitle: this.subtitle,
        title: this.title,
        about_manud_jaya: this.aboutManudJaya,
        logo_image: this.logoImageUrl
      };

      if (this.officials.length > 0) {
        payload.aparat_desa = this.officials.map((item) => {
          return {
            photo: item.photo,
            name: item.name,
            position: item.position
          }
        });
      }

      await this.landingService.updateLandingPage(payload).toPromise();
      await Swal.hideLoading();
      Swal.fire('Created!', 'Saved successfully.', 'success');
    } catch (e) {
      await Swal.hideLoading();
      await Swal.fire('Error', e.toString());
    }
  }

  base64ToBlob(base64: string): Blob {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  imageCropped(event: ImageCroppedEvent): void {
    const croppedImage = event.base64;

    const base64ToFile = (image: string) => {
      // base64 string
      const base64String = image ?? "data:image/png;base64,iVBORw0KG...";

      // convert base64 to Blob
      const byteCharacters = atob(base64String.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // create File object
      this.logoImageFile = new File([blob], this.logoImageName, { type: "image/jpeg" });
    }

    base64ToFile(croppedImage);
  }

  imageLoaded(): void {
    this.showCropper = true;
  }

  async initImages() {
    try {
      for (const item of this.officials) {
        item.photoUrl = environment.apiConfig.baseUrl + '/api/assets/' + item.photo;
      }
    } catch (e) {
      await Swal.fire('Error', e.toString());
    }
  }

  handlePhotoInputChange(event: Event, official: Official) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      official.photoFile = files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        official.photoUrl = reader.result as string;
        try {
          const result = await this.assetsService.uploadAssetFile({
            file: official.photoFile
          }).toPromise();
          official.photo = result.data;
          await this.initImages();
        } catch (e) {
          await Swal.fire('Error', e.toString());
        }
      };
      reader.readAsDataURL(official.photoFile);
    }
  }

  reset() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        this.landingService.landingPage().subscribe((result: any) => {
          const { data } = result;
          this.logoImageName = data.logo_image;
          this.logoImageUrl = data.logo_image;
          this.title = data.title;
          this.subtitle = data.subtitle;
          this.visi = data.visi;
          this.misi = data.misi;
          this.aboutManudJaya = data.about_manud_jaya;
          this.officials = JSON.parse(data.aparat_desa);
          this.officials.forEach((item, index) => {
            item.id = index + 1;
          })
        });
      }
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Landing Page', active: true }];
    this.initImages();
  }
}
