import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngFor y ngIf

interface ScoreEntry {
  rank: number;
  name: string;
  score: number;
  time: string; // Tiempo de supervivencia o de juego
}

@Component({
  selector: 'app-scores',
  imports: [CommonModule],
  templateUrl: './scores.html',
  styleUrl: './scores.css',
})
export class Scores implements OnInit{
scores: ScoreEntry[] = [
    { rank: 1, name: 'NARANJOSO_GOD', score: 99999, time: '30:00' },
    { rank: 2, name: 'ElMishi', score: 85210, time: '28:45' },
    { rank: 3, name: 'PixelPro', score: 77777, time: '25:12' },
    { rank: 4, name: 'GatoPardo', score: 65432, time: '22:05' },
    { rank: 5, name: 'BugHunter', score: 50111, time: '18:59' },
    { rank: 6, name: 'Player69', score: 45000, time: '17:30' },
    { rank: 7, name: 'Anon_Dev', score: 33200, time: '15:00' },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí es donde en el futuro se haría la llamada HTTP
    // this.fetchScoresFromApi(); 
  }
}
