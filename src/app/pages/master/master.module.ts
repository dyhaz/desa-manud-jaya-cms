import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '@shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgramComponent } from './program/program.component';
import { MasterRoutingModule } from '@pages/master/master-routing.module';
import { TablesModule } from '@pages/tables/tables.module';
import {
  JenisPerizinanService, LandingService,
  PerizinanService,
  ProgramDesaService,
  UserManagementService,
  WargaService
} from '@core/http/api';
import { ProgramFormComponent } from '@pages/master/program/program-form/program-form.component';
import { UserManagementComponent } from '@pages/master/user/user.component';
import { UserFormComponent } from '@pages/master/user/user-form/user-form.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PerizinanManagementComponent } from '@pages/master/perizinan/admin/perizinan.component';
import { PerizinanFormComponent } from '@pages/master/perizinan/admin/perizinan-form/perizinan-form.component';
import { JenisPerizinanComponent } from '@pages/master/jenis-perizinan/jenis-perizinan.component';
import {
  JenisPerizinanFormComponent
} from '@pages/master/jenis-perizinan/jenis-perizinan-form/jenis-perizinan-form.component';
import { PagesModule } from '@pages/pages.module';
import { AparaturDesaComponent } from '@pages/master/aparatur-desa/aparatur-desa.component';
import { DragulaModule } from 'ng2-dragula';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    declarations: [ProgramComponent, ProgramFormComponent, UserManagementComponent, UserFormComponent, PerizinanManagementComponent, PerizinanFormComponent, JenisPerizinanComponent, JenisPerizinanFormComponent, AparaturDesaComponent],
  imports: [
    CommonModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule,
    MasterRoutingModule,
    TablesModule,
    DropzoneModule,
    CurrencyMaskModule,
    PagesModule,
    DragulaModule,
    ImageCropperModule
  ],
    exports: [
    ],
    providers: [
        ProgramDesaService,
        UserManagementService,
        WargaService,
        PerizinanService,
        JenisPerizinanService,
        DatePipe,
        LandingService
    ]
})
export class MasterModule { }
