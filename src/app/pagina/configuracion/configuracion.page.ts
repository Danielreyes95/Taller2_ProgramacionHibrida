import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {

  borrarCitasInicio: boolean = false; 
  
  constructor() {} 
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  toggleBorrarCitasInicio() { 
    this.borrarCitasInicio = !this.borrarCitasInicio; 
  }

}
