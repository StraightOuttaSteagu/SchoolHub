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
      lastMessage: 'Lorem Ipsum dolor sit amet dddddddddddd d d dd',
      id: "eifjwefj"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "vdssvd"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "gfbgfbf"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "drgrdg"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "ewfwef"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "sdsdfds"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "gwgweg"
    },{
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "etbtrbr"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "rthrra"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "adrbtar"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "etuesmsyt"
    },
    {
      name: 'Oteleanu lia',
      lastMessage: 'Lorem Ipsum dolor sit amet',
      id: "eifjwefj"
    }
  ]

  messages: any = [
    // {
    //   sender: true,
    //   timestamp: new Date("Fri Sep 12 2023 22:30:48 GMT+0300"),
    //   body: "Lorem ipsum dolor sit amet consectetur. Ultrices sagittis ac potenti enim senectus diam nulla. Ac orci netus convallis.",
    //   seen: true
    // }
    {
      sender: true,
      timestamp: new Date("Fri Sep 12 2023 22:30:48 GMT+0300"),
      body: `Sure                              
      Just a second`,
      seen: true
    },
    {
      sender: false,
      timestamp: new Date("Fri Sep 12 2023 22:30:48 GMT+0300"),
      body: ` Hello! I don't understand exercise 1 from page 88. Could you give me some help? `,
      seen: true
    },
  ];

  ngOnInit() {
    const chatID = this._route.snapshot.paramMap.get('user');
    console.log(chatID)
  }


  hasTimeCard(index: number) {
    return index == this.messages.length - 1 || this.messages[index].timestamp.toDateString() != this.messages[index + 1].timestamp.toDateString();
  }

  addMessage(message: HTMLInputElement) {
    this.messages.unshift({
      sender: false,
      timestamp: new Date(),
      body: message.value,
      seen: true
    });
    
    message.value = '';
  }
}
