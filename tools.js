domHelp = {
    addElement: function (parentNode, element) {
        var elt = document.createElement(element);
        parentNode.appendChild(elt);
        for (var i = 2; i < arguments.length; i++) {
            elt.setAttribute(arguments[i].nomAttribut, arguments[i].valeurAttribute);
        }
        return elt;
    },

    addText: function (parentNode, text) {
        var elt = document.createTextNode(text);
        parentNode.appendChild(elt);
        return elt;
    },

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
    },

    getUserIfExist : function (nom, prenom) {
        for (var i=0; i<application.users.length; i++) {
            if((application.users[i].nom == nom) && (application.users[i].prenom == prenom)){
                return application.users[i];
            }
        }
        return null;
    },

    getIndexOfUserIfExist : function (nom, prenom) {
        for (var i=0; i<application.users.length; i++) {
            if((application.users[i].nom == nom) && (application.users[i].prenom == prenom)){
                return i;
            }
        }
        return null;
    }
};

tools = {
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
            dao.addSemaine(semaine);
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

    choiceClient : function(nbRes, input, conteneurRes, lecons, creneau){
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
            for(var i=0; i<creneau.clientsDisponibles.length; i++){
                if(application.users[res[i]] == creneau.clientsDisponibles[i]){
                    isDispo = true;
                }
            }
            if(isDispo){
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"});
            }
            else{
                td = domHelp.addElement(tr, "");
            }
        }
    }
}