import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
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

  scores$!: Observable<ScoreEntry[]>;

  constructor(private scoresService: ScoresService) { }

  ngOnInit() {
    this.scores$ = this.scoresService.getTopScores();
  }
}