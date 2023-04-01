import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramComponent } from './program/program.component';
import { UserManagementComponent } from '@pages/master/user/user.component';
import { PerizinanManagementComponent } from '@pages/master/perizinan/admin/perizinan.component';

const routes: Routes = [
  {
    path: 'program',
    component: ProgramComponent
  },
  {
    path: 'user',
    component: UserManagementComponent
  },
  {
    path: 'perizinan',
    component: PerizinanManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
