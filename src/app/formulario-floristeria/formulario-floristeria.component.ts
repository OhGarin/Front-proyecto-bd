import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../backend/backend.service';
import { Color, FlorCorte, Floristeria } from '../backend/types';
import { catchError } from 'rxjs';
import { BackendModule } from '../backend/backend.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-floristeria',
  standalone: true,
  imports: [NgbDropdownModule, BackendModule, FormsModule],
  templateUrl: './formulario-floristeria.component.html',
  styleUrl: './formulario-floristeria.component.css',
})
export class FormularioFloristeriaComponent implements OnInit {
  listaDeFloristerias: Floristeria[] = [];
  listaDeFlores: FlorCorte[] = [];
  listaDeColores: Color[] = [];

  idFlorSeleccionada: number = 0;
  idFloristeriaSeleccionada: number = 0;
  nombreFlorNueva: string = '';
  codigoColorSeleccionado: string = '';
  precioInicialFlorNueva: number = 0;
  tamanoTalloFlorNueva: number | null = null;

  nombreFloristeriaSeleccionada: string = '';
  especieFlorSeleccionada: string = '';
  nombreColorSeleccionado: string = '';

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend
      .obtenerFloristerias()
      .subscribe((listaDeFloristeriasBackend) => {
        this.listaDeFloristerias = listaDeFloristeriasBackend;
      });
    this.backend.obtenerFloresDeCorte().subscribe((listaDeFloresBackend) => {
      this.listaDeFlores = listaDeFloresBackend;
    });
    this.backend.obtenerColores().subscribe((listaDeColoresBackend) => {
      this.listaDeColores = listaDeColoresBackend;
    });
  }

  setFloristeria(id: number, nombre: string) {
    this.idFloristeriaSeleccionada = id;
    this.nombreFloristeriaSeleccionada = nombre;
  }

  setFlor(id: number, especie: string) {
    this.idFlorSeleccionada = id;
    this.especieFlorSeleccionada = especie;
  }

  setCodigoColor(codigo: string, nombre: string) {
    this.codigoColorSeleccionado = codigo;
    this.nombreColorSeleccionado = nombre;
  }

  agregarACatalogo() {
    this.backend
      .agregarACatalogoFloristeria(
        this.idFloristeriaSeleccionada,
        this.nombreFlorNueva,
        this.idFlorSeleccionada,
        this.codigoColorSeleccionado,
        this.precioInicialFlorNueva,
        this.tamanoTalloFlorNueva
      )
      .pipe(
        catchError((err, _) => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.idFlorSeleccionada = 0;
        this.idFloristeriaSeleccionada = 0;
        this.nombreColorSeleccionado = '';
        this.codigoColorSeleccionado = '';
        this.precioInicialFlorNueva = 0;
      });
  }
}
