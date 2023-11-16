import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {

  // Arreglo que almacena los elementos del menú a mostrar en el sidemenu
  public menuItems = routes

    // Mapea las rutas para obtener sus hijos (children)
    .map((route) => route.children ?? [])

    // Aplana el arreglo de rutas para tener una lista plana de rutas hijas
    .flat()

    // Filtra las rutas para asegurarse de que tengan un path definido
    .filter((route) => route && route.path)

    // Filtra las rutas para eliminar aquellas que contienen parámetros dinámicos (':')
    .filter((route) => !route.path?.includes(':'));

  constructor() {
    // const dashboardRoutes = routes
    //   .map( route => route.children ?? [] )
    //   .flat()
    //   .filter( route => route && route.path )
    //   .filter( route => !route.path?.includes(':') )
    // console.log(dashboardRoutes);
  }
}
