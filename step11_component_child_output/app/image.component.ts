import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'clickable-image',
    template: `<div>
                    <img src="{{url}}" width="100px" height="100px" (click)="clickPressed($event)">
               </div>`,
    inputs: ['url'],
    outputs: ['clicked']
})
export class ImageComponent { 
    url: string;
    clicked: EventEmitter<any> = new EventEmitter();
    constructor() {
      this.url = "./../assets/pakistan.png";
    }
    
    clickPressed(event: MouseEvent){
        this.clicked.emit(event);
    }
}