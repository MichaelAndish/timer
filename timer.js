
    // $('span', "style.color", 'blue');
    // $('.title', "style.color", 'pink');
    // $('#test', "style.color", 'blue');
    // $("#test").style.color = "green";

    // $("#anotherID #test").style.color = "green";
    // $("#anotherID #test", "style.color", 'pink');
    // $("#anotherID .title");

    // $('#anotherID #testAgain .hi', "style.color", "green");

    // $('#anotherID .section .content',"style.border", "1px solid #ccc");

    // console.log($('#anotherID .section .content',"style.color", "green"));


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
