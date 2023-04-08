import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPerizinanComponent } from '@pages/warga/perizinan/perizinan.component';

const routes: Routes = [
  {
    path: 'perizinan',
    component: MyPerizinanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WargaRoutingModule { }
