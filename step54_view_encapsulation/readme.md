Read:

https://toddmotto.com/emulated-native-shadow-dom-angular-2-view-encapsulation

Also read the "View Encapsulation" and "Shadow DOM Encapsulation" sections of the chapter "Advanced Components" of our text book:

https://www.ng-book.com/2/

As you can see from adding this, our AppComponent with the <input> inside also inherits the green global styling. 
This is because of how Angular 2’s default ViewEncapsulation mode.

Now if we change it to ViewEncapsulation.Native, everything is ok but the component will only show in browsers which support shadow DOM.