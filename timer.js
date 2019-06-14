////    SIMPLE TIMER
function simpleTimer(expireDateTime)
{
    let days    = $("#simpleTimer_days");
    let hours   = $("#simpleTimer_hours");
    let minutes = $("#simpleTimer_minutes");
    let seconds = $("#simpleTimer_seconds");

    let simpleTimer = setInterval(function()
    {
        let data = countDownBuilder(expireDateTime); 
        
        if(data.status === false)
        {
            days.innerHTML      =   "00";
            hours.innerHTML     =   "00";
            minutes.innerHTML   =   "00";
            seconds.innerHTML   =   "00";

            clearInterval(simpleTimer);
            return;
        }
        days.innerHTML      = data.days;
        hours.innerHTML     = data.hours;
        minutes.innerHTML   = data.minutes;
        seconds.innerHTML   = data.seconds;

    }, 1000);

}
// simpleTimer("2019-06-14T20:12:00"); // YYY-MM-DDTHH:MM:SS


////    COUNT DOWN BUILDER
function countDownBuilder(expireTime)
{
    let counterObject   = {};
    let now             = new Date().getTime() / 1000;
    let expireTimeStamp = new Date(expireTime).getTime() / 1000;
    let timeRemaining   = expireTimeStamp - now;

    if(timeRemaining < 0)
    {
        counterObject.message   = "The time has expired!";
        counterObject.status    = false;

        return counterObject;
    }

    counterObject.status    = true;
    counterObject.days      = "00";
    counterObject.hours     = parseInt(timeRemaining / 3600);
    counterObject.minutes   = parseInt((timeRemaining - (counterObject.hours * 3600)) / 60);
    counterObject.seconds   = parseInt((timeRemaining - (counterObject.minutes * 60)) % 60) ;

    ////    JUST ADD ZERO TO SINGLE DIGIT NUMBER
    /////////////////////////////////////////////////////////////////////////////////////////////////
    counterObject.hours     = counterObject.hours   < 10  ? "0" + counterObject.hours   : counterObject.hours;
    counterObject.minutes   = counterObject.minutes < 10  ? "0" + counterObject.minutes : counterObject.minutes;
    counterObject.seconds   = counterObject.seconds < 10  ? "0" + counterObject.seconds : counterObject.seconds;
    /////////////////////////////////////////////////////////////////////////////////////////////////
    return counterObject;

}

////    GET ELEMENT OR CHANGE STYLES WITH IT
function $(value, action=null, actionValue=null)
{
    let findElementVar = findElement(value);
    
    //// IF NULL
    if(! findElementVar)
    { 
        return;
    }

    if(findElementVar && findElementVar.length && action != null && actionValue != null)
    {
        [].forEach.call(findElementVar, function(node) 
        {
            setAttr(node, action, actionValue);
        });

        return;
    }

    if(action != null && actionValue != null)
    {
        setAttr(findElementVar, action, actionValue);

        return;
    }

    return findElementVar;
}

////    SET ATTRIBUTE FOR TAGS
function setAttr(el,actions, value)
{
    let arrayAction = actions.split('.');
    el.setAttribute(arrayAction[0], (arrayAction[1]+":"+ value));
    return;
}

////    FINDING TAG ELEMENT BY TAGNAME, CLASS OR ID
function findElement(element)
{
    let doms = element.split(" ");
    let find = null;
    let lastParamIsArray = doms[doms.length-1].indexOf('#')  != -1;

    ////    WHEN LAST PARAMETER IN ARRAY WAS ID FIND ONLY WITH ID
    ////////////////////////////////////////////////////////////////
    if(lastParamIsArray)
    {
        element = doms[doms.length-1];
    }

    ////    IF WE WANT TO FIND WITH ONE NESTED SEARCH
    ////////////////////////////////////////////////////////////////
    if(doms.length < 2 || lastParamIsArray)
    {
        switch(true)
        {
            case element.indexOf('.') != -1:
                find = document.querySelectorAll(element);
                break;
    
            case element.indexOf('#') != -1:
                find = document.querySelector(element);
                break;
    
            default:
                find = document.getElementsByTagName(element);
                break
        }    

        return find;
    }

    ////    WHEN WE HAVE MULTI NESTED FOR FINDING ELEMENTS
    ////////////////////////////////////////////////////////////////
    doms.forEach((item, index) => {
    
        if(index == 0)
        {
            getItem = findElement(item)
        }

        //// skip first element
        if(index > 0)
        {
            switch(true)
            {
                case item.indexOf('.') != -1:
                    find = getItem.getElementsByClassName(item.slice(1));
                    break;
        
                case item.indexOf('#') != -1:
                    find = document.getElementById(item.slice(1));
                    break;
        
                default:
                    find = document.getElementsByTagName(element);
                    break
            }    
        }

    });
    
    return find;

}
