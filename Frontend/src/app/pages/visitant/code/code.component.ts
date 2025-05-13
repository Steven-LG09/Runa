import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import DOMPurify from 'dompurify';

@Component({
  standalone: true,
  selector: 'app-code',
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  // Referencias a los inputs del HTML
  @ViewChild('code') codeRef!: ElementRef<HTMLInputElement>;

  // Variable para mostrar u ocultar el mensaje de carga
  loadingMessage = false;

  constructor(private http: HttpClient, private router: Router) { }

  // Función que se ejecuta al hacer clic en el botón "Buscar"
  search(): void {
    // Obtenemos los valores de los inputs directamente desde el DOM
    const rawCode = this.codeRef.nativeElement.value;

    // Sanitizamos los valores para prevenir inyecciones XSS
    const sanitizedCode = DOMPurify.sanitize(rawCode);

    // Asignamos los valores sanitizados de nuevo a los inputs
    this.codeRef.nativeElement.value = sanitizedCode;

    // Validamos que los campos no estén vacíos
    if (!sanitizedCode) {
      alert('Debes ingresar los campos obligatorios.');
      return;
    }
    // Mostramos el mensaje de carga
    this.loadingMessage = true;
  }
}
