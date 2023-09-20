import { Component } from '@angular/core';
import { icons } from '../../../../shared/icons';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent {
  icons: any = icons;

  announcements: any = [
    {
      title: 'CARIOTIPUL UMAN PATOLOGIC',
      description: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
      subject: 'Biologie',
      date: '10.10.2023',
      icon: 'leaf',
    },
    {
      title: 'Realizare compoziție',
      description:
        'Realizați o compoziție plastică în care să redați atmosfera sărbătorilor de iarnă, și în care să aveți ca element principal un felinar.',
      subject: 'Educație plastică',
      date: '12.10.2023',
      icon: 'pencils',
    },
    {
      title: 'CARIOTIPUL UMAN PATOLOGIC',
      description: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
      subject: 'Biologie',
      date: '10.10.2023',
      icon: 'beaker',
    },
    {
      title: 'Realizare compoziție',
      description:
        'Realizați o compoziție plastică în care să redați atmosfera sărbătorilor de iarnă, și în care să aveți ca element principal un felinar.',
      subject: 'Educație plastică',
      date: '12.10.2023',
      icon: 'books',
    },
    {
      title: 'CARIOTIPUL UMAN PATOLOGIC',
      description: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
      subject: 'Biologie',
      date: '10.10.2023',
      icon: 'beaker',
    },
    {
      title: 'Realizare compoziție',
      description:
        'Realizați o compoziție plastică în care să redați atmosfera sărbătorilor de iarnă, și în care să aveți ca element principal un felinar.',
      subject: 'Educație plastică',
      date: '12.10.2023',
      icon: 'books',
    },
  ];
}
