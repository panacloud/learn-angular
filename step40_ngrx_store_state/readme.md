First lets get a overview of how to manage state with Ngrx/store. 

Read this upto section "The Sample Application" i.e. stop reading before this section:

http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/


Than Watch this video:

https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes

To add @ngrx/store follow these instructions:

https://github.com/ngrx/store


Now that we have a little background we will implement this:

https://egghead.io/lessons/angular-2-using-ngrx-store-and-reducers-for-angular-2-application-state?course=building-a-time-machine-with-angular-2-and-rxjs

Source Code:

https://gist.run/?id=4a03b0eb0b4e388eaaa1


There is four kinds of architecture we can use to store application state in Angular 2:

1. Traditional architecture where state is stored in plain JS objects inside components

2. RxJS architecture where RxJS is used to manage state https://github.com/panacloud/learn-angular2/tree/master/step37_rxjs_states_startwith_scan

3. Redux architecture where NgRx/Store is used to manage state. The basics of it is covered in this step. We prefer to use it when using with REST based server API's.

4. AngularFire2/RxJS architecture where we have realtime data stored in Firebase.  




Comprehensive Introduction to @ngrx/store:
https://gist.github.com/btroncone/a6e4347326749f938510


Other References:

https://github.com/johnlindquist/rxjs-in-angular2

https://egghead.io/courses/building-a-time-machine-with-angular-2-and-rxjs

http://orizens.com/wp/topics/adding-redux-with-ngrxstore-to-angular-2-part-1/

http://chariotsolutions.com/blog/post/angular2-redux/

