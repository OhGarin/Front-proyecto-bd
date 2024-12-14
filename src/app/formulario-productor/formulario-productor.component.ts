import { Component, inject, OnInit } from '@angular/core';
import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendModule } from '../backend/backend.module';
import { Color, Productor, FlorCorte } from '../backend/types';
import { BackendService } from '../backend/backend.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-formulario-productor',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgbAlertModule,
    BackendModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-productor.component.html',
  styleUrl: './formulario-productor.component.css',
})
export class FormularioProductorComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  exito: boolean = false;
  listaDeProductores: Productor[] = [];
  listaDeColores: Color[] = [];
  listaDeFlores: FlorCorte[] = [];

  nombreProductorSeleccionado: string = '';
  especieFlorSeleccionada: string = '';
  nombreColorSeleccionado: string = '';

  formProductor = this.formBuilder.group({
    idFlorSeleccionada: [0, Validators.required],
    idProductorSeleccionado: [0, Validators.required],
    nombrePropioFlorNueva: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(40)]),
    ],
    codigoColorSeleccionado: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(6)]),
    ],
    descripcionFlorNueva: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(300)]),
    ],
    vbnFlorNueva: [0, Validators.required],
  });

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
    this.formProductor.controls.idProductorSeleccionado.setValue(id);
    this.nombreProductorSeleccionado = nombre;
  }

  setCodigoColor(codigo: string, nombre: string) {
    this.formProductor.controls.codigoColorSeleccionado.setValue(codigo);
    this.nombreColorSeleccionado = nombre;
  }

  setFlor(id: number, especie: string) {
    this.formProductor.controls.idFlorSeleccionada.setValue(id);
    this.especieFlorSeleccionada = especie;
  }

  closeAlert() {
    this.exito = false;
  }

  agregarACatalogo() {
    const form = this.formProductor.value;
    this.backend
      .agregarACatalogoProductor(
        form.idProductorSeleccionado!,
        form.vbnFlorNueva!,
        form.nombrePropioFlorNueva!,
        form.descripcionFlorNueva!,
        form.idFlorSeleccionada!,
        form.codigoColorSeleccionado!
      )
      .pipe(
        catchError((err, _) => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.formProductor.reset();
      });
  }
}
