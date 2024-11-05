import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/servicios/cita.service';
import { Citas } from 'src/app/citas/citas';
import { AgregarCitaComponent } from "../agregar-cita/agregar-cita.component";
import { ListaCitasComponent } from '../lista-citas/lista-citas.component';
import { IonItem, IonInput, IonContent, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal-citas',
  templateUrl: './principal-citas.component.html',
  styleUrls: ['./principal-citas.component.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, CommonModule, ReactiveFormsModule, IonButton, IonLabel, IonContent, IonInput, IonItem, AgregarCitaComponent, ListaCitasComponent],
})
export class PrincipalCitasComponent implements OnInit {
  listaCitas: Citas[] = [];

  constructor(private citaService: CitaService) {}

  async ngOnInit() {
    await this._actualizar();
  }

  private async _actualizar() {
    this.listaCitas = await this.citaService.getCita() as Citas[]; // Asegura que el resultado sea del tipo Citas[]
  }

  async onCreateCitas(event: { mensaje: string, autor: string }) {
    const cita = new Citas(event.mensaje, event.autor);
    await this.citaService.agregarCita(cita);
    await this._actualizar();
  }

  async onDeleteCita(cita: Citas) {
    await this.citaService.eliminarCita(cita);
    await this._actualizar();
  }
}
