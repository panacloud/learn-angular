import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'clickable-image',
    template: `<div>
                    <img [src]="url" width="100px" height="100px" (click)="clickPressed($event)">
               </div>`
    //alternative           
    //inputs: ['url'],
    //outputs: ['clicked']
})
export class ImageComponent { 
    @Input() url: string;
    @Output() clicked = new EventEmitter<MouseEvent>();

    constructor() {
    }
    
    clickPressed(event: MouseEvent){
        this.clicked.emit(event);
    }
}