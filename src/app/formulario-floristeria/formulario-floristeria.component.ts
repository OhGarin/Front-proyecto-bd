import { Component, inject, OnInit } from '@angular/core';
import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../backend/backend.service';
import { Color, FlorCorte, Floristeria } from '../backend/types';
import { catchError } from 'rxjs';
import { BackendModule } from '../backend/backend.module';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario-floristeria',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgbAlertModule,
    BackendModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-floristeria.component.html',
  styleUrl: './formulario-floristeria.component.css',
})
export class FormularioFloristeriaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  exito: boolean = false;
  listaDeFloristerias: Floristeria[] = [];
  listaDeFlores: FlorCorte[] = [];
  listaDeColores: Color[] = [];

  nombreFloristeriaSeleccionada: string = '';
  especieFlorSeleccionada: string = '';
  nombreColorSeleccionado: string = '';

  formFloristeria = this.formBuilder.group({
    idFlorSeleccionada: [0, Validators.required],
    idFloristeriaSeleccionada: [0, Validators.required],
    nombreFlorNueva: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(40)]),
    ],
    codigoColorSeleccionado: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(6)]),
    ],
    precioInicialFlorNueva: [
      0,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(999.99),
      ]),
    ],
    tamanoTalloFlorNueva: [
      null,
      Validators.compose([Validators.min(0), Validators.max(999.99)]),
    ],
  });

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
    this.formFloristeria.controls.idFloristeriaSeleccionada.setValue(id);
    this.nombreFloristeriaSeleccionada = nombre;
  }

  setFlor(id: number, especie: string) {
    this.formFloristeria.controls.idFlorSeleccionada.setValue(id);
    this.especieFlorSeleccionada = especie;
  }

  setCodigoColor(codigo: string, nombre: string) {
    this.formFloristeria.controls.codigoColorSeleccionado.setValue(codigo);
    this.nombreColorSeleccionado = nombre;
  }

  closeAlert() {
    this.exito = false;
  }

  agregarACatalogo() {
    const formValue = this.formFloristeria.value;
    this.backend
      .agregarACatalogoFloristeria(
        formValue.idFloristeriaSeleccionada!,
        formValue.nombreFlorNueva!,
        formValue.idFlorSeleccionada!,
        formValue.codigoColorSeleccionado!,
        formValue.precioInicialFlorNueva!,
        formValue.tamanoTalloFlorNueva && formValue.tamanoTalloFlorNueva !== 0
          ? formValue.tamanoTalloFlorNueva
          : null
      )
      .pipe(
        catchError((err, _) => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.formFloristeria.reset();
        this.exito = true;
      });
  }
}
