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
  reservations: any[] = [];
  cargando = true;
  error = '';
  totalReservas = 0; // Nueva propiedad para almacenar el total

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerReservas();
    this.obtenerConteoReservas(); // Llama la función para contar
  }

  obtenerReservas() {
    this.http.get<any[]>('http://localhost:4000/reserv')
      .subscribe({
        next: (data) => {
          this.reservations = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener reservas:', err);
          this.error = 'No se encontraron reservas.';
          this.cargando = false;
        }
      });
  }

  obtenerConteoReservas() {
    this.http.get<{ total: number }>('http://localhost:4000/reserv/count')
      .subscribe({
        next: (data) => {
          this.totalReservas = data.total;
        },
        error: (err) => {
          console.error('Error al contar reservas:', err);
        }
      });
  }
}

