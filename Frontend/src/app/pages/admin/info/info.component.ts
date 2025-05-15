import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-info',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  nombre: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  documento: any = null;
  cargando: any = null;
  error: any = null;

  ngOnInit(): void {
    this.nombre = this.route.snapshot.paramMap.get('name') || '';

    this.http.get<any>('http://localhost:4000/info', {
      params: { name: this.nombre }
    })
      .subscribe({
        next: (data) => {
          this.documento = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener documento:', err);
          this.error = 'No se encontro el documento.';
          this.cargando = false;
        }
      });
  }

}
