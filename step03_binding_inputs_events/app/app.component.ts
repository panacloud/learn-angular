import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

@Component({
    selector: 'my-app',
    template: `<form>
                    <div>
                        <label for="title">Title:</label>
                        <input name="title" #newtitle>
                        <button (click)="addArticle(newtitle)">Submit</button>
                    </div>
               </form>`
})
export class AppComponent { 

    constructor() {
        this.names = ['Zia', 'Hira', 'Inam', 'Rehan', 'Tauha'];
    }
    
    addArticle(title: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value}`);
    }
}