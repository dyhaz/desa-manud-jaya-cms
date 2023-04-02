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
import { AdvancedSortableDirective } from '@pages/tables/advancedtable/advanced-sortable.directive';
import { JenisPerizinanService, PerizinanService, ProgramDesaService, UserManagementService } from '@core/http/api';
import { ProgramFormComponent } from '@pages/master/program/program-form/program-form.component';
import { UserManagementComponent } from '@pages/master/user/user.component';
import { UserFormComponent } from '@pages/master/user/user-form/user-form.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PerizinanManagementComponent } from '@pages/master/perizinan/admin/perizinan.component';
import { PerizinanFormComponent } from '@pages/master/perizinan/admin/perizinan-form/perizinan-form.component';

@NgModule({
  declarations: [ProgramComponent, ProgramFormComponent, UserManagementComponent, UserFormComponent, PerizinanManagementComponent, PerizinanFormComponent, AdvancedSortableDirective],
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
        CurrencyMaskModule
    ],
  providers: [
    ProgramDesaService,
    UserManagementService,
    PerizinanService,
    JenisPerizinanService,
    DatePipe,
  ]
})
export class MasterModule { }
