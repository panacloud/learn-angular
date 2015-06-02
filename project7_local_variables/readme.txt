We can do the old "update text as you type" example:
The #myname creates a local variable in the template that we'll refer to below in the <p> element.
 The (keyup) tells Angular to trigger updates when it gets a keyup event. 
And the {{myname.value}} binds the text node of the <p> element to the input's value property.


Additional Readings:

https://www.youtube.com/watch?v=-dMBcqwvYA0

