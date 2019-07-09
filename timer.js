////    SIMPLE TIMER
function simpleTimer(expireDateTime)
{

    let years   = $("#simpleTimer_years");
    let months  = $("#simpleTimer_months");
    let days    = $("#simpleTimer_days");
    let hours   = $("#simpleTimer_hours");
    let minutes = $("#simpleTimer_minutes");
    let seconds = $("#simpleTimer_seconds");

    let simpleTimer = setInterval(function()
    {
        let data = countDownBuilder(expireDateTime); 
        
        if(data.status === false)
        {
            years.innerHTML     = "00";
            months.innerHTML    = "00";
            days.innerHTML      = "00";
            hours.innerHTML     = "00";
            minutes.innerHTML   = "00";
            seconds.innerHTML   = "00";

            clearInterval(simpleTimer);
            return;
        }

        years.innerHTML     = data.years;
        months.innerHTML    = data.months;
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

    let remainAfterStep     = 0;
    counterObject.status    = true;
    counterObject.years     = parseInt(timeRemaining / (60 * 60 * 24 * 30 * 12));
    //// month
    remainAfterStep         = parseInt(timeRemaining - (counterObject.years * (12 * 30 * 24 * 60 * 60)) );
    counterObject.months    = parseInt(remainAfterStep / ( 30 * 24 * 60 * 60 ));
    //// days
    remainAfterStep         = parseInt(remainAfterStep - (counterObject.months * (30 * 24 * 60 * 60)));
    counterObject.days      = parseInt(remainAfterStep / ( 24 * 60 * 60));
    //// hours
    remainAfterStep         = parseInt(remainAfterStep - (counterObject.days * (24 * 60 * 60)))
    counterObject.hours     = parseInt(remainAfterStep / (60 * 60));    
    //// minutes
    remainAfterStep         = parseInt(remainAfterStep - (counterObject.hours * (60 * 60)))
    counterObject.minutes   = parseInt(remainAfterStep / (60));
   //// seconds
   remainAfterStep          = parseInt(remainAfterStep - (counterObject.minutes * (60)));
    counterObject.seconds   = parseInt(remainAfterStep % 60) ;

    
    ////    JUST ADD ZERO TO SINGLE DIGIT NUMBER
    /////////////////////////////////////////////////////////////////////////////////////////////////
    counterObject.years     = counterObject.years   < 10  ? "0" + counterObject.years   : counterObject.years;
    counterObject.months    = counterObject.months  < 10  ? "0" + counterObject.months  : counterObject.months;
    counterObject.days      = counterObject.days    < 10  ? "0" + counterObject.days    : counterObject.days;
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



//// DIGITAL TIMER
/////////////////////////////////////////////////////////////////////////

function digitalTimer(expireDateTime)
{

    let digitTimer = setInterval(function()
    {
        let data = countDownBuilder(expireDateTime); 

        if(data.status === false)
        {
            clearInterval(digitTimer);
            return;
        }

        setPlotNumber(data.years, 'year');
        setPlotNumber(data.months, 'month');
        setPlotNumber(data.days, 'day');
        setPlotNumber(data.hours, 'hour');
        setPlotNumber(data.minutes, 'minute');
        setPlotNumber(data.seconds, 'second');

    }, 1000);

}

function setPlotNumber(number, type)
{
    number      = number.toString();
    let element = document.querySelectorAll('.'+type);

    let firstDigit  = element[0].getElementsByClassName('plot');
    let secondDigit = element[1].getElementsByClassName('plot');

    let firstArrToFill  = getArrayPlot(number.slice(0,1));
    let secondArrToFill = getArrayPlot(number.slice(1,2));
    //// HTML COLLECTION
    [].forEach.call(firstDigit, function(item,index) 
    {
        if(firstArrToFill.indexOf(index+1) != -1)
        {
            item.setAttribute('style','background:'+ light);
        }
        else{
            item.setAttribute('style','background:'+ dark);
        }
    });

    [].forEach.call(secondDigit, function(item,index) 
    {
        if(secondArrToFill.indexOf(index+1) != -1)
        {
            item.setAttribute('style','background:'+ light);
        }
        else{
            item.setAttribute('style','background:'+ dark);
        }
    });
}
// digitalTimer("2021-06-14T20:12:00");

function getArrayPlot(number)
{
    let zero    = [1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 14, 15];
    let one     = [1, 2, 5, 8, 11, 14];
    let two     = [1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15];
    let three   = [1, 2, 3, 6, 7, 8, 9, 12, 13, 14, 15];
    let four    = [1, 3, 4, 6, 7, 8, 9, 12, 15];
    let five    = [1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 15];
    let six     = [1, 2, 3, 4, 7, 8, 9, 10, 12, 13, 14, 15];
    let seven   = [1, 2, 3, 6, 9, 12, 15];
    let eight   = [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15];
    let nine    = [1, 2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 15];

    switch(number)
    {
        case '0':
            return zero;
        case '1':
            return one;
        case '2':
            return two;
        case '3':
            return three;
        case '4':
            return four;
        case '5':
            return five;
        case '6':
            return six;
        case '7':
            return seven;
        case '8':
            return eight;
        case '9':
            return nine;
        default:
            return zero;
    }
}

/////////////////////////////////////////////////////////////////////////