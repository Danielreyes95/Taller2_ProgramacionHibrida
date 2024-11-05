import { Component, OnInit } from '@angular/core'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'
import { addIcons } from 'ionicons';
import { settingsOutline, addCircle } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CitaService } from '../servicios/cita.service';
import { Citas } from '../citas/citas';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, RouterModule, IonIcon, IonButtons, IonButton, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  citaAleatoria: Citas | null = null;

  constructor(private citaService: CitaService) {
    addIcons({
      settingsOutline,
      addCircle
    });
  }
     
  async ngOnInit(): Promise<void> { 
    this.citaAleatoria = await this.obtenerCitaAleatoria(); 
  } 

  async obtenerCitaAleatoria(): Promise<Citas> { 
    const citas = await this.citaService.getCita(); 
    if (citas.length > 0) {
      const randomIndex = Math.floor(Math.random() * citas.length); 
      return citas[randomIndex];
    } else {
      return new Citas("No hay citas disponibles.", "Desconocido");
    }
  }
}
