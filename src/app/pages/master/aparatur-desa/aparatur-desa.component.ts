import { Component, OnInit, ViewChild } from "@angular/core";
import { AssetsService } from "@core/http/api";
import Swal from "sweetalert2";
import { environment } from "@environments/environment";
import { DragulaService } from 'ng2-dragula';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  @ViewChild('logoImageCropper') logoImageCropper: any;

  constructor(
    private assetsService: AssetsService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('officials', {
      moves: (el, container, handle) => handle.classList.contains('handle')
    });

    this.dragulaService.drag().subscribe(() => {
      const elements = document.querySelectorAll('.row .col-md-3');
    });

    this.dragulaService.drop().subscribe(() => {
      const elements = document.querySelectorAll('.row .col-md-3 .official-id');
      const ids = Array.from(elements).map((el: HTMLElement) => el.id);
      console.log(ids);
    })
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
    const formData = new FormData();
    if (this.logoImageFile) {
      formData.append('logoImage', this.logoImageFile);
    }
    formData.append('title', this.title);
    formData.append('subtitle', this.subtitle);
    formData.append('visi', this.visi);
    formData.append('misi', this.misi);
    formData.append('aboutManudJaya', this.aboutManudJaya);

    try {
      Swal.showLoading();
      // this.apiService.updateLandingPageData(formData).subscribe(response => {
      //   console.log(response);
      // });
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
    const canvas = this.logoImageCropper.canvas;
    canvas.toBlob((blob: Blob) => {
      this.logoImageFile = new File([blob], this.logoImageName, { type: 'image/jpeg' });
    }, 'image/jpeg');
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
          // Add save village official here
        } catch (e) {
          await Swal.fire('Error', e.toString());
        }
      };
      reader.readAsDataURL(official.photoFile);
    }
  }

  ngOnInit(): void {
    // this.apiService.getLandingPageData().subscribe(data => {
    //   this.logoImageName = data.logoImageName;
    //   this.logoImageUrl = data.logoImageUrl;
    //   this.title = data.title;
    //   this.subtitle = data.subtitle;
    //   this.visiMisi = data.visiMisi;
    //   this.aboutManudJaya = data.aboutManudJaya;
    // });
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Landing Page', active: true }];
    this.initImages();
  }
}
