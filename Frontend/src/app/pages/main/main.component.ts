import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  images = [0, 1, 2, 3, 4, 5, 6, 7];

    mostrarMensaje() {
    alert('¡Acción No Disponible!');
  }
}
