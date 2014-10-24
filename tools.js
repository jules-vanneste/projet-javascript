/*
 Contient les fonctions utilitaire pour le DOM.
 */
domHelp = {
    // Ajoute un element DOM avec un ensemble d'attribut
    addElement: function (parentNode, element) {
        var elt = document.createElement(element);
        parentNode.appendChild(elt);
        for (var i = 2; i < arguments.length; i++) {
            elt.setAttribute(arguments[i].nomAttribut, arguments[i].valeurAttribute);
        }
        return elt;
    },
    // Ajoute du texte dans un element DOM.
    addText: function (parentNode, text) {
        var elt = document.createTextNode(text);
        parentNode.appendChild(elt);
        return elt;
    },
    // cherche un utilisateur dans un input du DOM avec un role specifique et des proprietes specifiques
    searchUser : function (input, elements, role, proprietes) {
        var recherche = input.value;
        recherche = recherche.toLowerCase();
        var res = [];
        for (var i=0; i<elements.length; i++) {
            if(elements[i] != null){
                if(elements[i].role == role) {
                    for(var j=0; j<proprietes.length; j++) {
                        if (elements[i][proprietes[j]].toLowerCase().indexOf(recherche) != -1) {
                            res.push(i);
                            break;
                        }
                    }
                }
            }
        }
        return res;
    }
};

/*
 Contient les différentes fonctions utilitaires
 */
tools = {
    // Affiche la semaine suivante ou précedente d'une page
    changeSemaine : function(nomPage, numSemaine, suivante){
        var dateDebutSemaine = new Date(application.semaines[numSemaine].dateDebut.getFullYear(), application.semaines[numSemaine].dateDebut.getMonth(), application.semaines[numSemaine].dateDebut.getDate());
        if(suivante){
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) + 7);
            for(var i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() == dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() == dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() == dateDebutSemaine.getFullYear())) {
                    page.clear();
                    nomPage(i);
                    return;
                }
            }
            var semaine = new calendrier.Semaine(dateDebutSemaine);
            application.semaines.push(semaine);
            dao.createSemaine(semaine);
            page.clear()
            nomPage(application.semaines.length-1);
        }
        else{
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) - 7);
            for(var i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() == dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() == dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() == dateDebutSemaine.getFullYear())) {
                    page.clear();
                    nomPage(i);
                    return;
                }
            }
        }
    },
    // Affiche le tableau des utilisateurs correspondants a une recherche avec des selecteur pour en choisir un dans la liste
    choiceClient : function(nbRes, input, conteneurRes, lecons, creneau, moniteur){
        conteneurRes.innerHTML = "";
        var tbody = domHelp.addElement(conteneurRes, "tbody");
        var tr;
        var td;

        if(lecons != null){
            var tab = [];
            for (var i=0; i<application.users.length; i++) {
                var topush = true;
                if(application.users[i].role != "Client"){
                    topush = false;
                }
                for (var j=0; j<lecons.length; j++) {
                    if (lecons[j] instanceof calendrier.LeconConduite && application.users[i] == lecons[j].client){
                        topush = false;
                    }
                }
                if(topush){
                    tab.push(application.users[i]);
                }
                else{
                    tab.push(null);
                }
            }
            var res = domHelp.searchUser(input, tab, "Client", ["nom", "prenom"]);
        }
        else{
            var res = domHelp.searchUser(input, application.users, "Client", ["nom", "prenom"]);
        }

        for (var i=0; i<nbRes && i<res.length; i++) {
            tr = domHelp.addElement(tbody,"tr");
            td = domHelp.addElement(tr, "td");
            domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : res[i]});
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].civilite);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].nom);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].prenom);
            td = domHelp.addElement(tr, "td");
            var isDispo = false;
            for(var j=0; j<creneau.clientsDisponibles.length; j++){
                if(application.users[res[i]].cle == creneau.clientsDisponibles[j]){
                    isDispo = true;
                }
            }
            if(moniteur == application.users[res[i]].moniteur){
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-star"}, {nomAttribut : "title", valeurAttribute : "Eleve du moniteur"});
            }
            if(isDispo){
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"}, {nomAttribut : "title", valeurAttribute : "Est disponible"});
            }
            else{
                domHelp.addElement(td, "span");
            }
        }
    },
    // Retourne un utilisateur correspondant a une cle si celui-ci existe
    getUserIfExist : function (cle) {
        for (var i=0; i<application.users.length; i++) {
            if(application.users[i].cle == cle){
                return application.users[i];
            }
        }
        return null;
    },
    // Retourne l'index d'un utilisateur correspondant a une cle si celui-ci existe
    getIndexOfUserIfExist : function (cle) {
        for (var i=0; i<application.users.length; i++) {
            if(application.users[i].cle == cle){
                return i;
            }
        }
        return null;
    },
    // Affiche la légende des différents moniteurs de l'application avec la couleur qui leur est associée.
    printLegendeMoniteur : function(){
        var legende = domHelp.addElement(document.getElementById('content'), "div");
        for(var i=0; i<application.users.length; i++){
            if(application.users[i] instanceof utilisateur.Moniteur){
                var div = domHelp.addElement(legende, "div", {nomAttribut : "class", valeurAttribute : "panel panel-default"}, {nomAttribut : "style", valeurAttribute : "display:inline-block;"});
                domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "panel-heading"}, {nomAttribut : "style", valeurAttribute : "background-color: " + application.users[i].couleur});
                var texteMoniteur = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "panel-body"}, {nomAttribut : "style", valeurAttribute : "padding:5px;"});
                //var divMoniteur = domHelp.addElement(legende, "div", {nomAttribut : "style", valeurAttribute : "border: 1px solid black; display: inline-block; width: 75px; height:30px; background-color: " + application.users[i].couleur});
                //var texteMoniteur = domHelp.addElement(legende, "span", {nomAttribut : "style", valeurAttribute : "display: inline; margin-left: 5px; vertical-align: top; margin-right : 10px;"});
                domHelp.addText(texteMoniteur, application.users[i].nom + " " + application.users[i].prenom);
            }
        }
    }
}

// fonction qui permet de mapper une classe a un format JSON
function Reviver(key, value) {
    var ctor;

    if (typeof value === "object" &&
        typeof value.ctor === "string" &&
        typeof value.data !== "undefined") {
        ctor = Reviver.constructors[value.ctor] || window[value.ctor];
        if (typeof ctor === "function" &&
            typeof ctor.fromJSON === "function") {
            return ctor.fromJSON(value);
        }
    }
    return value;
}
Reviver.constructors = {}; // A list of constructors the smart reviver should know about

// Change la chaine JSON d'une classe avec un indicateur de sa classe dans la propriete ctor et les données dans la propiete data
function Generic_toJSON(ctorName, obj, keys) {
    var data, index, key;

    if (!keys) {
        keys = Object.keys(obj); // Only "own" properties are included
    }

    data = {};
    for (index = 0; index < keys.length; ++index) {
        key = keys[index];
        data[key] = obj[key];
    }
    return {ctor: ctorName, data: data};
}

// Retourne l'objet generic d'un objet par rapport a ses propriete ctor et data
function Generic_fromJSON(ctor, data) {
    var obj, name;

    obj = new ctor();
    for (name in data) {
        obj[name] = data[name];
    }
    return obj;
}