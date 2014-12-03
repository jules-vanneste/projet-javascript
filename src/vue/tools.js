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
            if((elements[i] !== null) && (elements[i].role === role)){
                for(var j=0; j<proprietes.length; j++) {
                    if (elements[i][proprietes[j]].toLowerCase().indexOf(recherche) !== -1) {
                        res.push(i);
                        break;
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
        var i;
        if(suivante){
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) + 7);
            for(i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() === dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() === dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() === dateDebutSemaine.getFullYear())) {
                    page.clear();
                    nomPage(i);
                    return;
                }
            }
            var semaine = new calendrier.Semaine(dateDebutSemaine);
            application.semaines.push(semaine);
            dao.createSemaine(semaine);
            page.clear();
            nomPage(application.semaines.length-1);
        }
        else{
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) - 7);
            for(i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() === dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() === dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() === dateDebutSemaine.getFullYear())) {
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
        var tr, td, i, j, res;

        if(lecons !== null){
            var tab = [];
            for (i=0; i<application.users.length; i++) {
                var topush = true;
                if(application.users[i].role !== "Client"){
                    topush = false;
                }
                for (j=0; j<lecons.length; j++) {
                    if (lecons[j] instanceof calendrier.LeconConduite && application.users[i].cle === lecons[j].client){
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
            res = domHelp.searchUser(input, tab, "Client", ["nom", "prenom"]);
        }
        else{
            res = domHelp.searchUser(input, application.users, "Client", ["nom", "prenom"]);
        }

        for (i=0; i<nbRes && i<res.length; i++) {
            tr = domHelp.addElement(tbody,"tr");
            td = domHelp.addElement(tr, "td");
            domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : res[i]},{nomAttribut : "id", valeurAttribute: application.users[res[i]].nom});
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].civilite);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].nom);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].prenom);
            td = domHelp.addElement(tr, "td");
            var isDispo = false;
            for(j=0; j<creneau.clientsDisponibles.length; j++){
                if(application.users[res[i]].cle === creneau.clientsDisponibles[j]){
                    isDispo = true;
                }
            }
            if(moniteur === application.users[res[i]].moniteur){
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
            if(application.users[i].cle === cle){
                return application.users[i];
            }
        }
        return null;
    },
    // Retourne l'index d'un utilisateur correspondant a une cle si celui-ci existe
    getIndexOfUserIfExist : function (cle) {
        for (var i=0; i<application.users.length; i++) {
            if(application.users[i].cle === cle){
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
                domHelp.addText(texteMoniteur, application.users[i].nom + " " + application.users[i].prenom);
            }
        }
    }
};