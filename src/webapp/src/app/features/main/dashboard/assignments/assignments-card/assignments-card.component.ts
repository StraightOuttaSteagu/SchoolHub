import { Component, Input } from '@angular/core';
import { CollapseAnimationFade, removeText } from 'src/app/shared/animations';

@Component({
  selector: 'app-assignments-card',
  templateUrl: './assignments-card.component.html',
  styleUrls: ['./assignments-card.component.scss'],
  animations: [CollapseAnimationFade, removeText]
})
export class AssignmentsCardComponent {
  @Input() data: any[] = [];
  @Input() title: string = "";

  collapsed: boolean = false;
}
