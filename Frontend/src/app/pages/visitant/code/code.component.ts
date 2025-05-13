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

  // Variable para almacenar el resultado de la búsqueda
  resultado: any = null;

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

    // Hacemos una petición POST al backend con el código sanitizado
    this.http.post<any>('http://localhost:4000/search', {
      code: sanitizedCode
    }).subscribe({

      // Si la respuesta es exitosa
      next: (response) => {
        this.resultado = response;         // Guardamos el resultado recibido en la variable `resultado`
        this.loadingMessage = false;       // Ocultamos el mensaje de carga
      },

      // Si ocurre un error en la petición
      error: (error) => {
        console.error('Error:', error);    // Mostramos el error en la consola
        this.resultado = null;             // Limpiamos el resultado anterior (si lo había)
        this.loadingMessage = false;       // Ocultamos el mensaje de carga
        alert('Error al buscar el código.'); // Mostramos un mensaje al usuario
      }
    });
  }
}
