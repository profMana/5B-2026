import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importo JSON per caricamento dati iniziali
import workersJson from './workers.json'

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-workers-list',
  styleUrl: './workers-list.css',
  templateUrl: './workers-list.html',
})
export class WorkersList {

  mestieri: string[] = ['Muratore', 'Idraulico', 'Elettricista', 'Falegname', 
      'Imbianchino', 'Giardiniere', 'Meccanico', 'Cuoco'];
  
  // Definizione dei valori iniziali (BINDING-BIDIREZIONALE)
  nome: string = '';
  cognome: string = '';
  mestiere: string = 'Muratore';
  disponibile: boolean = true;
  anniEsperienza: number = 0;


}
