import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BackendModule } from '../backend/backend.module';
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
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}
}
