import { Component, OnInit } from "@angular/core";
import { AssetsService } from "@core/http/api";
import Swal from "sweetalert2";
import { environment } from "@environments/environment";
import { DragulaService } from 'ng2-dragula';

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

  constructor(
    private assetsService: AssetsService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('officials', {
      moves: (el, container, handle) => handle.classList.contains('handle')
    });
    this.dragulaService.drag().subscribe(() => {
      const elements = document.querySelectorAll('.row .col-md-3');
      // this.columns = Array.from(elements).map((el: HTMLElement) => el.innerText);
    });
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
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Aparatur Desa', active: true }];
    this.initImages();
  }
}
