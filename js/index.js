// DOM selection 
const list = document.getElementById('list');
const input = document.getElementById('input');
const add = document.getElementById('add');
const clear = document.getElementById('clear');
const url = document.getElementById('url');
const load = document.getElementById('load');
console.log(list, input, add, clear, url, load)
// on récupère le tableau des taches existantes
const tasks = ['Faire du sport', 'faire le ménage', 'faire les courses'];
console.log(tasks);

// on ajoute chaque tache a la liste a puces 
for (let i = 0; i < tasks.length; i++){
    // si on a une chaine de caractère non vide 
    if (typeof tasks[i] === 'string' && tasks[i]) {
        // On crée les éléments de la liste et on crée le bouton remove
        const li = document.createElement('li');
        const remove = document.createElement('button');
        // On ajoute le texte du tableau de taches a la liste 
        li.textContent = tasks[i];
        // On ajoute du texte au bouton remove
        remove.textContent = 'REMOVE';
        // On ajoute le bouton remove a la suite de l'élément li
        li.appendChild(remove);
        // On insère l'élément li dans la list 
        list.insertBefore(li, list.firstChild);
    }
}

