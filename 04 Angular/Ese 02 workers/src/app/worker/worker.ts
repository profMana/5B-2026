import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  /* currentWorker : Lavoratore = {
    nome: 'Mario',
    cognome: 'Rossi',
    mestiere: 'Idraulico',
    anniEsperienza: 5,
    disponibile: false,
    icon: '🧑'
  } */
  @Input({required: true}) currentWorker!: Lavoratore;

  @Output() readonly deleteWorkerEvent = new EventEmitter<Lavoratore>();

  getStyle(worker: Lavoratore): Record<string, string>{
    return {
      'border-left-color': worker.disponibile ? '#6d5bd0' : '#bd5847'
    };
  }
  updateStatus(): void{
    this.currentWorker.disponibile = !this.currentWorker.disponibile;
  }
  deleteWorker(): void{
    this.deleteWorkerEvent.emit(this.currentWorker);
  }
}
