import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { TitleComponent } from '@shared/title/title.component';
import { User } from '@interfaces/req-response';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />

    @if( user() ) {
    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>

    } @else {
    <p>Cargando información</p>
    }
  `,
})

// -------------------------------------------------------------------------------------------------

export default class UserComponent {

  // Inyección de ActivatedRoute para obtener información de la ruta actual
  private route = inject(ActivatedRoute);

  // Inyección de UsersService para obtener información de usuarios
  private usersService = inject(UsersService);

  // Se utiliza toSignal para convertir un Observable en una señal
  // Se obtiene la información del usuario a través de la ruta activa y el servicio de usuarios
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id)) //switchMap solo guarda el ultimo valor del observable
    )
  );

  // Se define una señal para el título de la etiqueta
  public titleLabel = computed(() => {
    // Se verifica si existe información del usuario
    if (this.user()) {
      // Se retorna un mensaje con el nombre y apellido del usuario si está disponible
      return `Información del usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }

    // Si no hay información del usuario, se retorna un mensaje genérico
    return 'Información del usuario';
  });

  // constructor() {
  //   this.route.params.subscribe(params => {
  //     console.log({params});
  //   })
  // }
}
