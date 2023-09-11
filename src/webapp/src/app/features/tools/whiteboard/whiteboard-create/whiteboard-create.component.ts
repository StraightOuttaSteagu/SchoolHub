import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { wordObject, pageObject } from '../objects';
import { ElementCalculationsService } from '../element-calculations.service';
import { MathService } from '../math.service';

@Component({
  selector: 'app-whiteboard-create',
  templateUrl: './whiteboard-create.component.html',
  styleUrls: ['./whiteboard-create.component.scss'],
  host: {
    '(document:keydown)': '(canvasMode?canvasKeydown:textKeydown).bind(this)($event)'
  }
})
export class WhiteboardCreateComponent {

  alertButtons = ['Save'];
  alertInputs = [
    {
      placeholder: 'Lesson name',
    }
  ];

  private _color: string = '#000000';

  private _action: 'color' | 'erase' | 'stretch' | 'move' | 'bend' | 'select' | 'groupMove' | 'groupRotate' | 'groupSize' | null = null;
  
  private _doubleColor: boolean = false;

  private _actionDetails: any = null;

  private _stretch: boolean = false;

  private _pt!: SVGPoint;

  selectBox: { x: number, y: number, width: number, height: number} = { x: -100, y: -100, width: 0, height: 0 };

  rotationCircleTrack: { x: number, y: number } = { x: -100, y: -100 };

  rotationCircleThumb: { x: number, y: number } = { x: -100, y: -100 };

  colorCircle: { x: number, y: number } = { x: -100, y: -100 };

  scaleThumb: { x: number, y: number } = { x: -100, y: -100 };

  scaleOrigin: { x: number, y: number } = { x: -100, y: -100 };

  canvasMode: boolean = true;

  defaultFontSize: 0 | 1 | 2 | 3 = 2;

  selectedWord: number | null = null;

  pages: pageObject[] = [
    {
      words: [],
      textBoxWords: [],
      glues: [],
      activityType: 'Remember & Write',
      activityData: null
    }
  ];

  selectedPage: number = 0;

  words: wordObject[] = this.pages[0].words;

  canvasBoxWords: string[] = [""];

  textBoxWords: string[] = this.pages[0].textBoxWords;

  glues: string[] = this.pages[0].glues;

  getPathLength = this._calculations.getPathLength;

  constructor (private _math: MathService, private _calculations: ElementCalculationsService, private _ref: ChangeDetectorRef) { }

  ngOnInit() {
    this._pt = (document.getElementById('canvas') as unknown as SVGSVGElement).createSVGPoint();
  }

  addPunctuation(char: string): void {
    let target = this.selectedWord ===null?this.textBoxWords.length-1:this.selectedWord;
    this.textBoxWords[target] += char;
  }

  glue(): void {
    let target = this.selectedWord ===null?this.textBoxWords.length-1:this.selectedWord;
    if (target) {
      let relation = this.textBoxWords[target - 1] + ' ' + this.textBoxWords[target];
      if (this.glues.includes(relation)){
        this.glues.splice(this.glues.indexOf(relation), 1);
      } else {
        this.glues.push(relation);
      }
    }
    this.selectedWord = null;
  }

  capitalise(): void {
    let target = this.selectedWord ===null?this.textBoxWords.length-1:this.selectedWord;
    this.textBoxWords[target] = (this.textBoxWords[target][0].toUpperCase() ===this.textBoxWords[target][0]?this.textBoxWords[target][0].toLowerCase():this.textBoxWords[target][0].toUpperCase()) + this.textBoxWords[target].slice(1);
    this.selectedWord = null;
  }

  newPage(): void {
    this.pages.push(structuredClone(this.pages[this.selectedPage]));
    this.selectedPage = this.pages.length - 1;

    this.words = this.pages[this.selectedPage].words;
    this.textBoxWords = this.pages[this.selectedPage].textBoxWords;
    this.glues = this.pages[this.selectedPage].glues;

    this.pages[this.pages.length - 1].activityData = null;
    this.pages[this.pages.length - 1].activityType = 'Remember & Write';

    for (let word of this.words) {
      this._calculations.updateClipPath(word);
    }

    this._ref.detectChanges();
  }

  deletePage(): void {
    if (this.pages.length > 1) {
      this.pages.splice(this.selectedPage, 1);
      if (this.selectedPage  === this.pages.length) {
        this.selectedPage--;
      }
    }
  }

  clearPage(): void {
    this.words = [];
    this.textBoxWords = [];
  }

  changePage(modifier: number): void {
    if (this.selectedPage + modifier >= 0 && this.selectedPage + modifier < this.pages.length) {
      this.selectedPage += modifier;

      this.words = this.pages[this.selectedPage].words;
      this.textBoxWords = this.pages[this.selectedPage].textBoxWords;
      this.glues = this.pages[this.selectedPage].glues;

      this._ref.detectChanges();
    }
  }

  saveLesson(): void {
    
  }

  selectColor(color: string) {
    this._color = color;
    this._action = 'color';
  }

  canvasMouseDown(e: any): void {
    if (e.target.id  === 'canvas') {
      this.updatePt(e);

      this._action = 'select';
      this._actionDetails = {
        x: this._pt.x,
        y: this._pt.y
      }
    }
  }

  canvasMouseUp(): void {
    if (this._action  === 'select') {
      let selectedWords = this.words.filter(word => 
        this._math.contained(word.startX, word.startY, this.selectBox.x, this.selectBox.y, this.selectBox.width, this.selectBox.height) ||
        this._math.contained(word.focusX + word.startX, word.focusY + word.startY, this.selectBox.x, this.selectBox.y, this.selectBox.width, this.selectBox.height) ||
        this._math.contained(word.endX + word.startX, word.endY + word.startY, this.selectBox.x, this.selectBox.y, this.selectBox.width, this.selectBox.height)
      );

      if (selectedWords.length) {
        this.scaleThumb = {
          x: this.selectBox.x + this.selectBox.width - 10,
          y: this.selectBox.y + this.selectBox.height - 10
        }
  
        this.rotationCircleTrack = this._calculations.getMedium(selectedWords);
        this.rotationCircleThumb = {
          x: this.rotationCircleTrack.x,
          y: this.rotationCircleTrack.y - 60
        }

        this._actionDetails = {
          targets: selectedWords
        }
      } else {
        this.selectBox = { x: -100, y: -100, width: 0, height: 0 };
      }
    } else {
      this.selectBox = { x: -100, y: -100, width: 0, height: 0 };
      this.rotationCircleTrack = { x: -100, y: -100 };
      this.rotationCircleThumb = { x: -100, y: -100 };
      this.scaleThumb = { x: -100, y: -100 };
      this.scaleOrigin = { x: -100, y: -100 };
    }

    this._action = null;
  }

  canvasMouseMove(e: any): void {
    if (this._action) {
      this.updatePt(e);
      let eventX = this._pt.x, eventY = this._pt.y;
      switch (this._action) {
        case 'move':
          this._calculations.updateMove(this.words[this._actionDetails.target], eventX, eventY, this._actionDetails);
          break;

        case 'bend':
          this._calculations.updateBend(this.words[this._actionDetails.target], eventX, eventY);
          break;

        case 'stretch':
          this._calculations.updateStretch(this.words[this._actionDetails.target], this._stretch, eventX, eventY, this._actionDetails);
          break;

        case 'select':
          this.selectBox = this._calculations.updateSelectBox(eventX, eventY, this._actionDetails);
          break;

        case 'groupMove':
          this._calculations.updateGroupMove(eventX, eventY, this._actionDetails);
          break;

        case 'groupRotate':
          this._calculations.updateGroupRotate(eventX, eventY, this._actionDetails, this.rotationCircleThumb);
          break;

        case 'groupSize':
          this._calculations.updateGroupSize(eventX, this._actionDetails, this.scaleThumb);
      }
    }
  }

  canvasBoxMouseUp(): void {
    if (this._action  === 'move') {
      this.canvasBoxWords.push(this.words[this._actionDetails.target].content);
      this.words.splice(this._actionDetails.target, 1);
      this._action = null;
      this._ref.detectChanges();
    } else if (this._action  === 'groupMove') {
      this._action = null;
      if (this.canvasBoxWords.at(-1)  === ""){
        this.canvasBoxWords.pop();
      }
      for (let word of <wordObject[]>this._actionDetails.targets) {
        this.canvasBoxWords.push(word.content);
        this.words.splice(this.words.indexOf(word), 1);
      }
      this._ref.detectChanges();
    }
  }

  makerBoxMouseDown(e: any): void {
    if (e.target.id  === 'makerBox') {
      this.selectedWord = null;
    }
  }

  canvasKeydown(e: any): void {
    if (e.key  === 'Backspace') { 
      if (this.canvasBoxWords.length) {
        if (this.canvasBoxWords.at(-1)?.length) {
          this.canvasBoxWords[this.canvasBoxWords.length - 1] = this.canvasBoxWords[this.canvasBoxWords.length - 1].slice(0, -1);
        } else if (this.canvasBoxWords.length > 1) {
          this.canvasBoxWords.pop();
        }
      }
    } else if (e.key  === ' ') {
      if (this.canvasBoxWords.at(-1)?.length) {
        this.canvasBoxWords.push('');
      }
    } else if (e.key.length  === 1) {
      this.canvasBoxWords[this.canvasBoxWords.length - 1] += e.key;
    }
  }

  textKeydown(e: any): void {
    if (e.key  === 'Backspace' && this.textBoxWords.length) {
      let target = this.selectedWord ===null?this.textBoxWords.length-1:this.selectedWord;
      this.textBoxWords.splice(target, 1);
      this.selectedWord = null;
    }
  }
  
  selectBoxMouseDown(e: any): void {
    this.updatePt(e);
    this._action = 'groupMove';
    this._actionDetails = {
      x: this._pt.x,
      y: this._pt.y,
      targets: this._actionDetails.targets
    }

    this.selectBox = { x: -100, y: -100, width: 0, height: 0 };
    this.rotationCircleThumb = { x: -100, y: -100 };
    this.rotationCircleTrack = { x: -100, y: -100 };
    this.scaleThumb = { x: -100, y: -100 };
  }

  rotationCircleThumbMouseDown(): void {
    this._action = 'groupRotate';
    this._actionDetails = {
      x: this.rotationCircleTrack.x,
      y: this.rotationCircleTrack.y,
      distances: this._calculations.groupRotateDistances(this.rotationCircleTrack.x, this.rotationCircleTrack.y, this._actionDetails.targets),
      angles: this._calculations.groupRotateAngles(this.rotationCircleTrack.x, this.rotationCircleTrack.y, this._actionDetails.targets),
      targets: this._actionDetails.targets
    }

    this.selectBox = { x: -100, y: -100, width: 0, height: 0 };
    this.scaleThumb = { x: -100, y: -100 };
  }

  scaleThumbMouseDown(): void {
    this.scaleOrigin = {
      x: this.selectBox.x,
      y: this.selectBox.y
    }

    this._actionDetails = {
      x: this.selectBox.x,
      y: this.selectBox.y,
      angle: this._math.angFromPoint(this.selectBox.x, this.selectBox.y, this.selectBox.x + this.selectBox.width, this.selectBox.y + this.selectBox.height),
      distance: this._math.pyth(this.selectBox.x, this.selectBox.y, this.scaleThumb.x + this.selectBox.width, this.scaleThumb.y + this.selectBox.height),
      length: this.scaleThumb.x + this.selectBox.width,
      origins: (this._actionDetails.targets as wordObject[]).map(word => ({
        startX: word.startX,
        startY: word.startY,
        focusX: word.focusX,
        focusY: word.focusY,
        endX: word.endX,
        endY: word.endY,
        fontSize: word.fontSize
      })),
      targets: this._actionDetails.targets
    }

    this._action = 'groupSize';

    this.selectBox = { x: -100, y: -100, width: 0, height: 0 };
    this.rotationCircleThumb = { x: -100, y: -100 };
    this.rotationCircleTrack = { x: -100, y: -100 };
  }

  canvasWordMouseDown(e: any): void {
    const index: number = +e.target.getAttribute('index');

    if (this._action  === 'erase'){
      this.words.splice(index, 1);

      return;
    }

    if (this._action  === 'color'){
      if (this._doubleColor) {
        this.words[index].bottomColor = this.words[index].topColor;
        this.words[index].topColor = this._color;
        return;
      }
      this.words[index].topColor = this.words[index].bottomColor = this._color;
      return;
    }

    this.updatePt(e);
    const pos = e.target.getCharNumAtPosition(this._pt);

    const eventX = Math.floor(this._pt.x), eventY = Math.floor(this._pt.y);

    if (pos  === 0) {
      this._action = 'move';
      this._actionDetails = {
        x: eventX,
        y: eventY,
        target: index
      };
    } else if (pos  === this.words[index].content.length-1){
      this._action = 'stretch';
      this._actionDetails = {
        length: this._calculations.stretchLength(this.words[index]),
        angle: this._calculations.stretchAngle(this.words[index]),
        target: index
      };
    } else {
      this._action = 'bend';
      this._actionDetails = {
        target: index
      };
    }
  }

  textWordMouseDown(e: any): void {
    const index: number = +e.target.getAttribute('index');
    this.textBoxWords.push(this.words[index].content);
  }

  canvasTextBoxMouseDown(e: any, index: number): void {
    const size = this._calculations.getSize(this.canvasBoxWords[index], [52.5, 76.125, 105, 210][this.defaultFontSize])/2;

    this.updatePt(e);
    
    this.words.push({
      startX: this._pt.x,
      startY:  this._pt.y,
      focusX: size/2,
      focusY: 0,
      endX: size,
      endY: 0,
      topColor: '#000000',
      bottomColor: '#000000',
      fontSize: [52.5, 76.125, 105, 210][this.defaultFontSize],
      content: this.canvasBoxWords[index],
      temp: {
        clipLine0X: 0,
        clipLine0Y: 0,
        clipLine1X: 0,
        clipLine1Y: 0,
        clipLine2X: 0,
        clipLine2Y: 0
      }
    });

    this._action = 'move';
    this._actionDetails = {
      x: this._pt.x,
      y: this._pt.y,
      target: this.words.length - 1
    };

    this.canvasBoxWords.splice(index, 1);

    if (!this.canvasBoxWords.length) {
      this.canvasBoxWords = [""];
    }
  }

  TextTextBoxMouseDown(index: number): void {
    this.selectedWord = index;
  }

  updatePt(e: any): any {
    this._pt.x = e.clientX; this._pt.y = e.clientY;
    this._pt = this._pt.matrixTransform((document.getElementById('canvas') as any).getScreenCTM().inverse());  
	}

  setAction(action: 'color' | 'erase' | 'stretch' | 'move' | 'bend' | 'select' | 'groupMove' | 'groupRotate' | 'groupSize' | null): void {
    this._action = action;
  }

  toggleDoubleColor(): void {
    this._doubleColor = !this._doubleColor;
  }

  getStretch(): boolean {
    return this._stretch;
  }

  toggleStretch(): void {
    this._stretch = !this._stretch;
  }

  setDefaultFontSize(e: any): void {
    this.defaultFontSize = (e.detail.value - 1 as 0 | 1 | 2 | 3 );
  }

  typeSelectChanged(e: any): void {
    this.pages[this.selectedPage].activityType = e.detail.value;
    switch (this.pages[this.selectedPage].activityType) {
      case 'Listen & Write':
        this.pages[this.selectedPage].activityData = "";
        break;

      case 'Remember & Write':
        this.pages[this.selectedPage].activityData = null;
        break;

      case 'Right & Wrong':
        this.pages[this.selectedPage].activityData = true;
    }
  }

  setLinkValue(e: any): void {
    this.pages[this.selectedPage].activityData = e.detail.value;
  }
}
