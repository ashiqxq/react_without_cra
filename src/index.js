import {div, button, span, input} from './elements.js';

const InputBox = document.getElementById('addInput');
const list = document.getElementById('todos');
let AddButton = null;



function removeElement(element){
    if (element){
        let parentDiv = element.parentElement;
        parentDiv.removeChild(element)
        element = null
    }
    return element
}

function onTaskAdd(e) {
    if (e.key==='Enter'){
        addRow(e.target.value)
        this.value = ''
        AddButton = removeElement(AddButton)
    }else{
        if (e.target.value && e.target.value!='' && e.target.value.trim('')!=''){
            if (!AddButton){
                AddButton = button({'class': 'addButton r-c-c'}, '+')
                let parentDiv = InputBox.parentElement;
                parentDiv.appendChild(AddButton)
            }
        }else{
            AddButton = removeElement(AddButton)
        }
    }
}

function addRow(taskName){
    let element = div({'class':"item black-item", "draggable":true})
    const TextSpan = span({class:"text-span", "style":"word-wrap: break-word"}, taskName)
    const EditSpan = span({class:"icon edit-span"}, 'E')
    const DeleteSpan = span({class:"icon delete-span"}, 'D')
    element.appendChild(TextSpan);
    element.appendChild(EditSpan);
    element.appendChild(DeleteSpan);
    list.appendChild(element)
}

list.addEventListener('click', (e)=>{
    if(e.target.classList.contains('edit-span')){
        let editIcon = e.target;
        let elementToEdit = editIcon.closest('.item');
        let TextSpan = elementToEdit.querySelector('.text-span');
        let EditSpan = elementToEdit.querySelector('.edit-span');
        const DeleteSpan = elementToEdit.querySelector('.delete-span');
        let value = TextSpan.textContent
        elementToEdit.removeChild(TextSpan)
        elementToEdit.removeChild(EditSpan)
        const InputElement = input({class:"input-span", value:value, style:"width: 110px"})
        const SaveSpan = span({class:"icon save-span"}, 'S')
        elementToEdit.insertBefore(SaveSpan, DeleteSpan)
        elementToEdit.insertBefore(InputElement, SaveSpan)
    }else if(e.target.classList.contains('delete-span')){
        let deleteIcon = e.target;
        let elementToRemove = deleteIcon.closest('.item');
        removeElement(elementToRemove)
    }else if(e.target.classList.contains('save-span')){
        let saveIcon = e.target;
        let elementToSave = saveIcon.closest('.item');
        const DeleteSpan = elementToSave.querySelector('.delete-span');
        const InputSpan = elementToSave.querySelector('.input-span');
        const SaveSpan = elementToSave.querySelector('.save-span');
        const EditSpan = span({class:"icon edit-span"}, 'E')
        let value = InputSpan.value;
        const TextSpan = span({class:"text-span", "style":"word-wrap: break-word"}, value);
        elementToSave.removeChild(InputSpan)
        elementToSave.removeChild(SaveSpan)
        elementToSave.insertBefore(EditSpan, DeleteSpan)
        elementToSave.insertBefore(TextSpan, EditSpan)
    }
})
InputBox.addEventListener('keyup', onTaskAdd)
InputBox.addEventListener('click', (e)=>{e.stopPropagation()})