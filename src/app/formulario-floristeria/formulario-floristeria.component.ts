import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../backend/backend.service';
import { Color, FlorCorte, Floristeria } from '../backend/types';
import { catchError } from 'rxjs';
import { BackendModule } from '../backend/backend.module';

@Component({
  selector: 'app-formulario-floristeria',
  standalone: true,
  imports: [NgbDropdownModule, BackendModule],
  templateUrl: './formulario-floristeria.component.html',
  styleUrl: './formulario-floristeria.component.css',
})
export class FormularioFloristeriaComponent implements OnInit {
  floristerias: Floristeria[] = [];
  flores: FlorCorte[] = [];
  colores: Color[] = [];

  idFlor: number = 0;
  idFloristeria: number = 0;
  nombre: string = '';
  codigoColor: string = '';

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.obtenerFloristerias().subscribe((floristerias) => {
      this.floristerias = floristerias;
    });
    this.backendService.obtenerFloresDeCorte().subscribe((flores) => {
      this.flores = flores;
    });
    this.backendService.obtenerColores().subscribe((colores) => {
      this.colores = colores;
    });
  }

  setFloristeria(id: number) {
    this.idFloristeria = id;
  }

  setFlor(id: number) {
    this.idFlor = id;
  }

  setCodigoColor(codigo: string) {
    this.codigoColor = codigo;
  }

  agregarACatalogo() {
    this.backendService
      .agregarACatalogoFloristeria(
        this.idFloristeria,
        this.nombre,
        this.idFlor,
        this.codigoColor
      )
      .pipe(
        catchError((err, _) => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.idFlor = 0;
        this.idFloristeria = 0;
        this.nombre = '';
        this.codigoColor = '';
      });
  }
}
