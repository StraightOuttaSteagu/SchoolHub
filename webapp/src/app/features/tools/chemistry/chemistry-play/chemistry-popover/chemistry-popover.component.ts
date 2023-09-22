import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ElementPopoverComponent } from '../element-popover/element-popover.component';

@Component({
  selector: 'app-chemistry-popover',
  templateUrl: './chemistry-popover.component.html',
  styleUrls: ['./chemistry-popover.component.scss']
})
export class ChemistryPopoverComponent {

  @Input() data!: {formula: string, mass: number, elements: string[]};

  constructor (private _popoverController: PopoverController) { }

  async displayPopover(e: any, i: number): Promise<void> {
    const popover = await this._popoverController.create({
      component: ElementPopoverComponent,
      event: e,
      componentProps: {
        data: this.data.elements[i]
      }
    });

    await popover.present();
  }
}
