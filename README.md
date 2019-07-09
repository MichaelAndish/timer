# timer
This is a timer just for fun :) and enjoying Javascript

# Usage 

* Add this code in script tag :)
* Input value in simpleTimer function base this format : <b>YYY-MM-DDTHH:MM:SS</b>

```
    <script src="timer.js"></script>
    <script>
        simpleTimer("2019-07-14T20:12:00"); // YYY-MM-DDTHH:MM:SS
    </script>
```


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

$('#anotherID .section .content',"style.border", "1px solid #ccc");

$('#anotherID #testAgain .hi'); // output is HTMLCollection
```

# Demo

### SimpleTimer 

![image](https://github.com/Mekaeil/timer/blob/master/img/SimpleTimer.png)

</br>

### DigitalTimer
![image](https://github.com/Mekaeil/timer/blob/master/img/DigitalTimer.png)

</br>


# Package or Libraries

* For code style we use [PrismJS](https://prismjs.com/) 
* Font : [Pacifico](https://fonts.googleapis.com)