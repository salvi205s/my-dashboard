import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
@Component({
  standalone: true, // Indica que el componente no tiene dependencias de otros módulos
  changeDetection: ChangeDetectionStrategy.OnPush, // Usa la estrategia OnPush para la detección de cambios
  imports: [CommonModule, TitleComponent], // Importa CommonModule y TitleComponent
  template: `
    <!-- Contenido del componente en formato de plantilla literaria -->
    <app-title [title]="currentFramework()" />
    <!-- Utiliza el componente app-title con un atributo title ligado al método currentFramework() -->

    <!-- Muestra el contenido de la señal frameworkAsSignal como JSON -->
    <pre> {{ frameworkAsSignal() | json }} </pre>

    <!-- Muestra el contenido de la propiedad frameworkAsProperty como JSON -->
    <pre> {{ frameworkAsProperty | json }} </pre>
  `,
})
export default class ChangeDetectionComponent {
  // Propiedades del componente

  // Método que devuelve un string con el nombre del framework obtenido de la señal frameworkAsSignal
  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  // Señal frameworkAsSignal que contiene un objeto con el nombre y la fecha de lanzamiento del framework
  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  // Propiedad frameworkAsProperty que contiene un objeto con el nombre y la fecha de lanzamiento del framework
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  // Constructor del componente
  constructor() {
    setTimeout(() => {
      // Dentro de 3 segundos, se ejecuta este bloque de código

      // Modifica el nombre del framework en la propiedad frameworkAsSignal mediante una actualización
      this.frameworkAsSignal.update((value) => {
        value.name = 'React';

        // Retorna un nuevo objeto con las modificaciones
        return { ...value };
      });

      // Imprime 'Hecho' en la consola
      console.log('Hecho');
    }, 3000);
  }
}
