import {Component} from '@angular/core';
import {ImageComponent} from './image.component';

@Component({
    selector: 'my-app',
    template: ` <div>This is the Root App Component, please click the image</div>
                <clickable-image url="./../assets/pakistan.png" (clicked)="pressed($event)"></clickable-image>
              `,
    directives: [ImageComponent]
})
export class AppComponent { 

    constructor() {
        
    }
    
    pressed(event: MouseEvent){
        alert("Image has been clicked");
    }
}