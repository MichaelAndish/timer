
    $('#test').style.color = "blue";



function $(value)
{
    let doms        = value.split(" ");
    let findElementVar = null;

    doms.forEach(element => {
        findElementVar = findElement(element);
    });
    
    return findElementVar;
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
