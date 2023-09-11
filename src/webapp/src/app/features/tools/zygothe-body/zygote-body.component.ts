import { Component } from '@angular/core';

@Component({
  selector: 'app-zygothe-body',
  template: `
    <iframe src="https://www.zygotebody.com/" width="100%" height="100%"></iframe>
    <div></div>
  `,
  styles: [`
    div {
      position: absolute;
      right: 0;
      width: 22rem;
      height: 100%;
      background: white;
      z-index: 1;
    }
  `]
})
export class ZygoteBodyComponent {
  // zygote does not give us access to external DOM manipulation. In other words, we can't hide ads
  // so, we need a workaround. This was the first idea, if you have a better one, tell me
}
