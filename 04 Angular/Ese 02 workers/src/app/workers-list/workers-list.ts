import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importo JSON per caricamento dati iniziali
import workersJson from './workers.json'
// Importo componente workers
import { Lavoratore, Worker } from '../worker/worker';

@Component({
  imports: [FormsModule, CommonModule, Worker],
  selector: 'app-workers-list',
  styleUrl: './workers-list.css',
  templateUrl: './workers-list.html',
})
export class WorkersList {
  public workers: Lavoratore[] = workersJson;
  mestieri: string[] = ['Muratore', 'Idraulico', 'Elettricista', 'Falegname',
    'Imbianchino', 'Giardiniere', 'Meccanico', 'Cuoco'];

  // Definizione dei valori iniziali (BINDING-BIDIREZIONALE)
  nome: string = '';
  cognome: string = '';
  mestiere: string = 'Muratore';
  disponibile: boolean = true;
  anniEsperienza: number = 0;

  addWorker(): void {
    const nuovoWorker: Lavoratore = {
      nome: this.nome.trim(),
      cognome: this.cognome.trim(),
      mestiere: this.mestiere,
      anniEsperienza: this.anniEsperienza,
      disponibile: this.disponibile,
      icon: '👷'
    };
    this.workers.push(nuovoWorker)

    this.nome = '';
    this.cognome = '';
    this.mestiere = 'Muratore';
    this.disponibile = true;
    this.anniEsperienza = 0;

  }
}
