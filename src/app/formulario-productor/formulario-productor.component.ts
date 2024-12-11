import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendModule } from '../backend/backend.module';
import { Color, Productor, FlorCorte } from '../backend/types';
import { BackendService } from '../backend/backend.service';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-formulario-productor',
  standalone: true,
  imports: [NgbDropdownModule, BackendModule, FormsModule],
  templateUrl: './formulario-productor.component.html',
  styleUrl: './formulario-productor.component.css',
})
export class FormularioProductorComponent implements OnInit {
  listaDeProductores: Productor[] = [];
  listaDeColores: Color[] = [];
  listaDeFlores: FlorCorte[] = [];
  idProductorSeleccionado: number = 0;

  nombreProductorSeleccionado: string = '';
  codigoColorSeleccionado: string = '';
  nombrePropioFlorNueva: string = '';
  descripcionFlorNueva: string = '';
  idFlorSeleccionada: number = 0;
  especieFlorSeleccionada: string = '';
  nombreColorSeleccionado: string = '';
  vbnFlorNueva: number = 0;

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.obtenerProductores().subscribe((listaDeProductoresBackend) => {
      this.listaDeProductores = listaDeProductoresBackend;
    });
    this.backend.obtenerFloresDeCorte().subscribe((listaDeFloresBackend) => {
      this.listaDeFlores = listaDeFloresBackend;
    });
    this.backend.obtenerColores().subscribe((listaDeColoresBackend) => {
      this.listaDeColores = listaDeColoresBackend;
    });
  }

  setProductor(id: number, nombre: string) {
    this.idProductorSeleccionado = id;
    this.nombreProductorSeleccionado = nombre;
  }

  setCodigoColor(codigo: string, nombre: string) {
    this.codigoColorSeleccionado = codigo;
    this.nombreColorSeleccionado = nombre;
  }

  setFlor(id: number, especie: string) {
    this.idFlorSeleccionada = id;
    this.especieFlorSeleccionada = especie;
  }

  agregarACatalogo() {
    this.backend
      .agregarACatalogoProductor(
        this.idProductorSeleccionado,
        this.vbnFlorNueva,
        this.nombrePropioFlorNueva,
        this.descripcionFlorNueva,
        this.idFlorSeleccionada,
        this.codigoColorSeleccionado
      )
      .pipe(
        catchError((err, _) => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.idFlorSeleccionada = 0;
        this.idProductorSeleccionado = 0;
        this.nombreColorSeleccionado = '';
        this.codigoColorSeleccionado = '';
        this.nombreColorSeleccionado = '';
        this.nombreProductorSeleccionado = '';
        this.especieFlorSeleccionada = '';
        this.nombrePropioFlorNueva = '';
        this.vbnFlorNueva = 0;
      });
  }
}
