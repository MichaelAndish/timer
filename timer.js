
    // $('span', "style.color", 'blue');
    // $('.title', "style.color", 'pink');
    // $('#test', "style.color", 'blue');
    // $("#test").style.color = "green";

function $(value, action=null, actionValue=null)
{
    let doms            = value.split(" ");
    let findElementVar  = null;

    doms.forEach(element => {

        findElementVar = findElement(element);
      
        if(findElementVar.length && action != null && actionValue != null)
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

        return findElement;

    });
    
    return findElementVar;
}

function setAttr(el,actions, value)
{
    let arrayAction = actions.split('.');
    el.setAttribute(arrayAction[0], (arrayAction[1]+":"+ value));
    return;
}

function findElement(element)
{
    let find = null;

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
