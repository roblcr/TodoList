'use strict'

// Stockage local de nos tâches 

class ArrayStorage {
    // Un constructeur pour initialiser l'objet avec le nom de la clé et sa valeur.
    constructor(name){
        this.name = name;
        this.list = this.get();

    }
    // Méthode pour récupérer un tableau des valeurs ou par défaut, le créer si il n'existe pas.
    get(){
        if(!localStorage.getItem(this.name)){
            localStorage.setItem(this.name, '[]')
        }
        return JSON.parse(localStorage.getItem(this.name))
    }

    // Une méthode pour ajouter des valeurs dans le tableau
    set(value){
        this.list.push(value)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }
    // Méthode pour supprimer une valeur du tableau 
    remove(value){
        const index = this.list.indexOf(value)
        this.list.splice(index, 1)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }
    // Méthode pour supprimer toutes les valeurs du tableau 
    clear(){
        localStorage.removeItem(this.name)
    }
}