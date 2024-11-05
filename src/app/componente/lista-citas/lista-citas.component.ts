import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { Citas } from 'src/app/citas/citas';
import { IonItem, IonLabel, IonList, IonButton, IonIcon } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, FormsModule, IonItem, IonLabel, IonList]
})
export class ListaCitasComponent  {
  constructor(){
    addIcons({
      trashOutline,
    });
  }
  

  @Input() citas: Citas [] = []
  @Output() onDelete = new EventEmitter<Citas>();


  deleteCita(cita: Citas) { this.onDelete.emit(cita);
  }
  
}
