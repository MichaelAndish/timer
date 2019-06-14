# timer
This is a timer just for fun :) and enjoying Javascript

# Usage 



# About Codes :)

I created function with $ we can find elements by tagName, className and ID.

```
$('span', "style.color", 'red');

$('.title', "style.color", 'blue');

$('#test', "style.color", 'pink');

$("#test").style.color = "green";

$("#anotherID #test").style.color = "green";

$("#anotherID #test", "style.color", 'pink');
```

Nested Access to element:
```
$('#anotherID #testAgain .hi', "style.color", "green"); // Tags with "hi" ClassName

$('#anotherID #testAgain .hi'); // output is HTMLCollection

```

