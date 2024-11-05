import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonButton, IonLabel, IonItem, IonText } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss'],
  standalone: true,
  imports: [IonText, IonItem, IonLabel, IonButton, FormsModule,ReactiveFormsModule, CommonModule]
})

export class AgregarCitaComponent implements OnInit { 
  @Output() onCreate = new EventEmitter<{ mensaje: string, autor: string }>(); 
  citaForm: FormGroup; 
  
  constructor(private fb: FormBuilder) { 
    this.citaForm = this.fb.group({ 
      mensaje: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]] 
    });
  }
  
  ngOnInit() {}

  createCita() { 
    if (this.citaForm.valid) { 
      this.onCreate.emit(this.citaForm.value); 
      this.citaForm.reset(); 
    } 
  } 
  
  get mensaje() { 
    return this.citaForm.get('mensaje') as FormControl; 
  } 
  
  get autor() { 
    return this.citaForm.get('autor') as FormControl; 
  } 
}
