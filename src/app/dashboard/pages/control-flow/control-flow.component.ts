import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A' | 'B' | 'F';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './control-flow.component.html',
  styles: ``,
})
export default class ControlFlowComponent {
  // Propiedad que controla si el contenido debe mostrarse o no
  public showContent = signal(false);

  // Propiedad que almacena una señal de calificación con un valor inicial 'A'
  public grade = signal<Grade>('A');

  // Propiedad que almacena una lista de frameworks como una señal
  public frameworks = signal(['Angular', 'Vue', 'Svelte', 'Qwik', 'React']);

  // Propiedad que almacena una lista de frameworks vacía como una señal
  public frameworks2 = signal([]);

  // Método que cambia el valor de showContent invirtiendo su valor actual
  public toggleContent() {
    // Actualiza el valor de showContent usando la función de actualización
    this.showContent.update((value) => !value);
  }
}
