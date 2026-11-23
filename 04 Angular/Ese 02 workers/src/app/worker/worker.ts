import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Lavoratore{
  nome: string;
  cognome: string;
  mestiere: string;
  anniEsperienza: number;
  disponibile: boolean;
  icon: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-worker',
  styleUrl: './worker.css',
  templateUrl: './worker.html',
})


export class Worker {
  currentWorker : Lavoratore = {
    nome: 'Mario',
    cognome: 'Rossi',
    mestiere: 'Idraulico',
    anniEsperienza: 5,
    disponibile: false,
    icon: '🧑'
  }
  getStyle(worker: Lavoratore): Record<string, string>{
    return {
      'border-left-color': worker.disponibile ? '#6d5bd0' : '#bd5847'
    };
  }
}
