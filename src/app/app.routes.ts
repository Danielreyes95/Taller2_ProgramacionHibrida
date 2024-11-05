import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import { HomePage } from './home/home.page'; 
import { GestionPage } from './pagina/gestion/gestion.page'; 
import { ConfiguracionPage } from './pagina/configuracion/configuracion.page'; 

const routes: Routes = [ 
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomePage }, 
  { path: 'gestion', component: GestionPage }, 
  { path: 'configuracion', component: ConfiguracionPage } 
]; 

export { routes };
