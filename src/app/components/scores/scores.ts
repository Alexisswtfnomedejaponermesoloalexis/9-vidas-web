import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para el pipe | async
import { Observable } from 'rxjs';
import { ScoresService, ScoreEntry } from '../../services/scores';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scores.html',
  styleUrls: ['./scores.css']
})
export class ScoresComponent implements OnInit {

  // Variable que recibirá los datos en vivo
  scores$!: Observable<ScoreEntry[]>;

  constructor(private scoresService: ScoresService) { }

  ngOnInit() {
    // Conectamos la variable al servicio
    this.scores$ = this.scoresService.getTopScores();
  }
}