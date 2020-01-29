import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
          { path: 'graficas', component: Graficas1Component, data: { titulo: 'Gráficas' } },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    },
    { path: '**', component: NopagefoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}