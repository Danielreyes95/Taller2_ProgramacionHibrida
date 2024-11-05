import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonItem, IonLabel, IonList, IonIcon } from '@ionic/angular/standalone';
import { CitaService } from 'src/app/servicios/cita.service';
import { Citas } from 'src/app/citas/citas';
import { PrincipalCitasComponent } from 'src/app/componente/principal-citas/principal-citas.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  standalone: true,
  imports: [IonIcon, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PrincipalCitasComponent]
})
export class GestionPage implements OnInit {
  nuevaCita = { 
    mensaje: '', 
    autor: '' 
  }; 
  
  citas: Citas[] = []; 
  
  constructor(private citaService: CitaService) {} 

  async ngOnInit(): Promise<void> { 
    this.citas = await this.citaService.getCita(); 
  } 
  
  async agregarCita() { 
    if (this.nuevaCita.mensaje && this.nuevaCita.autor) { 
      const nuevaCita = new Citas(this.nuevaCita.mensaje, this.nuevaCita.autor); 
      await this.citaService.agregarCita(nuevaCita); 
      this.citas = await this.citaService.getCita(); 
      this.nuevaCita = { mensaje: '', autor: '' }; 
    }
  } 
  
  eliminarCita(cita: Citas) { 
    this.citas = this.citas.filter(c => c !== cita); 
  } 
}
