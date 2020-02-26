import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [ VerificaTokenGuard ],
    data: { 
      titulo: 'Dashboard' 
    } 
  },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
  { path: 'graficas', component: Graficas1Component, data: { titulo: 'Gráficas' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
  { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
  // Mantenimientos
  { 
      path: 'usuarios', 
      component: UsuariosComponent, 
      canActivate: [ AdminGuard ],
      data: { 
        titulo: 'Mantenimiento Usuarios' 
      }
  },
  { path: 'hospitales', component: HospitalComponent, data: { titulo: 'Mantenimiento Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento Médicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}