'use strict'

// DOM selection 
const list = document.getElementById('list');
const input = document.getElementById('input');
const add = document.getElementById('add');
const clear = document.getElementById('clear');
const url = document.getElementById('url');
const load = document.getElementById('load');

// Nouvelle instance pour la clé tasks
const storage = new ArrayStorage('tasks')

console.log(list, input, add, clear, url, load)
// on récupère le tableau des taches existantes ou bien un tableau vide
const tasks = storage.list;
console.log(tasks);

// Fonction ajoutant les taches au DOM avec un bouton de suppression auquel on attache un évènement
function taskToDOM(task){
// si on a une chaine de caractère non vide 
if (typeof task === 'string' && task) {
    // On crée les éléments de la liste et on crée le bouton remove
    const li = document.createElement('li');
    const remove = document.createElement('button');
    // On ajoute le texte du tableau de taches a la liste 
    li.textContent = task;
    // On ajoute du texte au bouton remove
    remove.textContent = 'REMOVE';
    // Ici on supprime localement une tache avec le bouton remove
    remove.addEventListener('click', () => {
        const value = remove.parentNode.firstChild.textContent;
        storage.remove(value);
        list.removeChild(remove.parentNode);
    });
    // On ajoute le bouton remove a la suite de l'élément li
    li.appendChild(remove);
    // On insère l'élément li dans la list 
    list.insertBefore(li, list.firstChild);

    return true;
}
return false;
};

// on ajoute chaque tache a la liste a puces 
// for (let i = 0; i < tasks.length; i++){
//    taskToDOM(tasks[i]);
// }
tasks.forEach(task => taskToDOM(task));

// Ici on gère l'ajout de taches avec le bouton add et la touche enter
function newTask(){
    if (storage.list.indexOf(input.value) === -1 && taskToDOM(input.value)){
        storage.set(input.value);
        input.value = '';
    }
    input.focus();

}

add.addEventListener('click', newTask);
// Ici on gère l'ajout de tâches avec le bouton Enter
input.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        newTask();
    }
});

// On supprime la liste du DOM et du navigateur
clear.addEventListener('click', () => {
    storage.clear();
    list.innerHTML = '';
});

// On gère l'importation de tâches
load.addEventListener('click', () => {
    fetch(url.value)
    .then(response => {
        if (response.ok){
        return response.json();
    }
    throw new Error(`${response.statusText}(${response.status})`);
    })
    .then(tasks => {
        if (Array.isArray(tasks)){
            tasks.forEach(task => {
                if (storage.list.indexOf(task) === -1 && taskToDOM(task)){
                    storage.set(task);
                }
            });
            return;
        }
        throw new TypeError(`La réponse n'est pas un tableau JSON`);
    })
});