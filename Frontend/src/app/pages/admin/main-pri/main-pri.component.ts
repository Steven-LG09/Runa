import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-pri',
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './main-pri.component.html',
  styleUrl: './main-pri.component.css'
})
export class MainPriComponent implements OnInit {

  // Arreglo donde se guardará la lista de reservaciones recibida desde el backend
  reservations: any[] = [];

  // Bandera para mostrar estado de carga
  cargando = true;

  // Mensaje de error si ocurre algo durante la carga de datos
  error = '';

  // Inyecta el servicio HttpClient en el constructor (Angular lo provee automáticamente)
  constructor(private http: HttpClient) { }

  // Método que se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit(): void {
    // Llama al backend usando HttpClient con método GET
    this.http.get<any[]>('http://localhost:4000/reserv') // Reemplaza con tu URL real
      .subscribe({
        // Si la petición es exitosa, se ejecuta esta función
        next: (data) => {
          this.reservations = data;     // Guarda los datos en el arreglo
          this.cargando = false;    // Ya no está cargando
        },
        // Si ocurre un error en la petición, se ejecuta esto
        error: (err) => {
          console.error('Error al obtener reservas:', err); // Imprime error en consola
          this.error = 'No se encontraron reservas.';       // Muestra mensaje de error en la interfaz
          this.cargando = false;                            // Termina el estado de carga
        }
      });
  }

}
