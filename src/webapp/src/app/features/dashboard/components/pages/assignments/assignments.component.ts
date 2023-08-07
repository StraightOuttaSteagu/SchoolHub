import { Component } from '@angular/core';
import { CollapseAnimationFade } from '../../../../../shared/animations';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  animations: [CollapseAnimationFade]
})
export class AssignmentsComponent {
  getHref(){
    return window.location.href;
  }
}
