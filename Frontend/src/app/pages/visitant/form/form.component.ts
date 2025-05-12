import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import DOMPurify from 'dompurify';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  // Referencias a los inputs del HTML
  @ViewChild('name') nameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('email') emailRef!: ElementRef<HTMLInputElement>;

  // Variable para mostrar u ocultar el mensaje de carga
  loadingMessage = false;

  constructor(private http: HttpClient, private router: Router) { }


  // Función que se ejecuta al hacer clic en el botón "Enviar"
  saveData(): void {
    // Obtenemos los valores de los inputs directamente desde el DOM
    const rawName = this.nameRef.nativeElement.value;
    const rawEmail = this.emailRef.nativeElement.value;

    // Sanitizamos los valores para prevenir inyecciones XSS
    const sanitizedName = DOMPurify.sanitize(rawName);
    const sanitizedEmail = DOMPurify.sanitize(rawEmail);

    // Asignamos los valores sanitizados de nuevo a los inputs
    this.nameRef.nativeElement.value = sanitizedName;
    this.emailRef.nativeElement.value = sanitizedEmail;

    // Validamos que los campos no estén vacíos
    if (!sanitizedName || !sanitizedEmail) {
      alert('Debes ingresar los campos obligatorios.');
      return;
    }

    // Mostramos el mensaje de carga
    this.loadingMessage = true;

    // Enviamos una petición POST al backend con los datos
    this.http.post<any>('http://localhost:4000/form', {
      name: sanitizedName,
      email: sanitizedEmail,
    }).subscribe({
      next: (result) => {
        // Ocultamos el mensaje de carga
        this.loadingMessage = false;

        // Si el login falla, mostramos el mensaje de error
        if (!result.success) {
          const message = result.message
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          alert(message);
        }
        // Si el login es exitoso y hay una URL de redirección
        else if (result.redirectUrl) {
          this.router.navigate([result.redirectUrl]); // Redirigimos
        }
      },
      error: (err) => {
        // En caso de error de red o del servidor
        console.error('Error durante el proceso:', err);
        this.loadingMessage = false;
        alert('Ocurrió un error en el proceso.');
      }
    });
  }
}
