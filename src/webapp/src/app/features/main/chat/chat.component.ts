import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements ViewDidEnter {

  hasChat: boolean = true;

  constructor(private _menu: MenuController, private _route: ActivatedRoute) { }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }

  users = [
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet'
    },
  ]

  messages = [
    {
      sender: true,
      timestamp: new Date("Fri Sep 09 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: false,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 06 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 09 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: false,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 06 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 09 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: false,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 06 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 09 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: false,
      timestamp: new Date("Fri Sep 08 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    },
    {
      sender: true,
      timestamp: new Date("Fri Sep 06 2023 22:30:48 GMT+0300"),
      body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
      seen: true
    }
  ];

  ngOnInit() {
    const chatID = this._route.snapshot.paramMap.get('user');
  }


  hasTimeCard(index: number) {
    return index == this.messages.length - 1 || this.messages[index].timestamp.toDateString() != this.messages[index + 1].timestamp.toDateString();
  }
}
