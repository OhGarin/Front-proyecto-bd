import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendModule } from '../backend/backend.module';
import { Color, Productor, FlorCorte } from '../backend/types';
import { BackendService } from '../backend/backend.service';
import { FormsModule } from '@angular/forms';

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
  vbnFlorNueva:number = 0;


  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}

  setProductor(id: number, nombre: string) {
    this.idProductorSeleccionado = id;
    this.nombreProductorSeleccionado = nombre;
  }

  setCodigoColor(codigo: string, nombre: string) {
    this.codigoColorSeleccionado = codigo;
    this.codigoColorSeleccionado = nombre;
  }

  setFlor(id: number, especie: string) {
    this.idFlorSeleccionada = id;
    this.especieFlorSeleccionada = especie;
  }

}
