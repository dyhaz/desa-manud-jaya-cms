import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '@shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesModule } from '@pages/tables/tables.module';
import { JenisPerizinanService, PerizinanService, ProgramDesaService, UserManagementService } from '@core/http/api';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MyPerizinanComponent } from '@pages/warga/perizinan/perizinan.component';
import { PerizinanFormComponent } from '@pages/warga/perizinan/perizinan-form/perizinan-form.component';
import { PagesModule } from "@pages/pages.module";
import { WargaRoutingModule } from "@pages/warga/warga-routing.module";

@NgModule({
  declarations: [MyPerizinanComponent, PerizinanFormComponent],
  imports: [
    CommonModule,
    UIModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    Ng2SmartTableModule,
    WargaRoutingModule,
    TablesModule,
    DropzoneModule,
    CurrencyMaskModule,
    NgbNavModule,
    PagesModule
  ],
  exports: [
  ],
  providers: [
    ProgramDesaService,
    UserManagementService,
    PerizinanService,
    JenisPerizinanService,
    DatePipe,
  ]
})
export class WargaModule { }
