import { Routes } from '@angular/router';
import { FormularioFloristeriaComponent } from './formulario-floristeria/formulario-floristeria.component';
import { FormularioProductorComponent } from './formulario-productor/formulario-productor.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

export const routes: Routes = [
  {
    path: 'form-floristerias',
    component: FormularioFloristeriaComponent,
  },
  {
    path: 'form-productores',
    component: FormularioProductorComponent,
  },
  {
    path: '',
    component: MenuPrincipalComponent,
  },
];
