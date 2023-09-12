import { Component } from '@angular/core';

@Component({
  selector: 'app-chemistry-play',
  templateUrl: './chemistry-play.component.html',
  styleUrls: ['./chemistry-play.component.scss']
})
export class ChemistryPlayComponent {
  compounds = [
    'H2',
    'O2'
  ]
}
