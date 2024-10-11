function generateElement(tag, props, text){
    const element = document.createElement(tag);
    Object.keys(props).forEach((prop)=>{
        switch(prop){
            case 'onclick':
                element.addEventListener('click', (e)=>{
                    props[prop](e, element)
                })
                break;
            default:
                element.setAttribute(prop, props[prop]) 
        }
    })
    if (text){
        const textNode = document.createTextNode(text);
 
        element.appendChild(textNode);
    }
    return element;
}

const div = (...args) => generateElement('div', ...args);
const button = (...args) => generateElement('button', ...args);
const span = (...args) => generateElement('span', ...args);
const input = (...args) => generateElement('input', ...args);

export {
    div,
    button,
    span,
    input
}