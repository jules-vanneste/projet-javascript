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

view = {
    printObjectAsTable : function (objects, properties) {
        var table = domHelp.addElement(document.getElementById('content'), "table");
        var tr = domHelp.addElement(table,"tr");
        var th;
        var td;
        for (var i=0; i<properties.length; i++) {
            th = domHelp.addElement(tr,"th");
            domHelp.addText(th, properties[i]);
        }
        for (var i=0; i<objects.length; i++) {
            tr = domHelp.addElement(table, "tr");
            for (var j=0; j<properties.length; j++) {
                td = domHelp.addElement(tr,"td");
                domHelp.addText(td, objects[i][properties[j]]);
            }
        }
    },

    printObjectAsSelect : function(objects, properties){
        var form = domHelp.addElement(document.getElementById('content'), "form");
        var input;
        for (i=0; i<objects.length; i++) {
            input = domHelp.addElement(form, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : i});
            for (j=0; j<properties.length; j++) {
                domHelp.addText(form, objects[i][properties[j]] + " ");
            }
            domHelp.addElement(form, "br");
        }
    },

    printFormLogin : function(objects, properties){
        var form = domHelp.addElement(document.getElementById('content'), "form", {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var input;
        var th;
        var td;
        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");
        for (i=0; i<properties.length; i++) {
            th = domHelp.addElement(tr,"th");
            domHelp.addText(th, properties[i]);
        }
        for (i=0; i<objects.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            input = domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : i});
            for (j=0; j<properties.length; j++) {
                td = domHelp.addElement(tr,"td");
                domHelp.addText(td, objects[i][properties[j]]);
            }
        }
        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"});
        button.onclick = function(){
            var radios = document.getElementsByName('user');
            for (var i=0; i<radios.length; i++) {
                if (radios[i].checked) {
                    application.userConnected = application.users[radios[i].value];
                    page.clear();
                    if(application.userConnected.role == "Client"){
                        page.client();
                    }
                    else if(application.userConnected.role == "Moniteur"){
                        page.moniteur();
                    }
                    else if(application.userConnected.role == "Secrétaire"){
                        page.secretaire();
                    }
                    break;
                }
            }
        };
        domHelp.addText(button, "Se connecter");
    },

    printAgendaClient : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "form-dialogue"});
        var tr = domHelp.addElement(tbody,"tr");
        var th;
        var aLeconConduite = false;

        div.style.display = "none";
        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        var semaine = application.semaines[numSemaine];
        for (var i=0; i<semaine.jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            var date = new Date(semaine.jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        for (var i=0; i<semaine.jours[0].creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, application.semaines[numSemaine].jours[0].creneaux[i].heure + "h");
            for (var j=0; j<semaine.jours.length; j++) {
                aLeconConduite = false;
                var td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"});
                var creneau = semaine.jours[j].creneaux[i];
                var nblecon = 0;
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    if(lecon instanceof calendrier.LeconConduite && lecon.client == application.userConnected) {
                        nblecon = nblecon+1;
                    }
                    else if(lecon instanceof calendrier.LeconCode){
                        nblecon = nblecon+1;
                    }
                }
                for (var k = 0; k < creneau.clientsDisponibles.length; k++) {
                    if(creneau.clientsDisponibles[k] == application.userConnected){
                        nblecon = nblecon+1;
                        var largeur = (100 / nblecon);
                        var divM = domHelp.addElement(td, "div");
                        domHelp.addText(divM, "Dispo");
                        //domHelp.addElement(divM, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"});
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #D9EDF7; float:left;");
                    }
                }
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    var largeur = (100 / nblecon);
                    var divM = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite && lecon.client == application.userConnected) {
                        aLeconConduite = true;
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; display: inline; background-color: #FCF8E3; float:left;");
                        //domHelp.addText(divM, lecon.moniteur.nom.substr(0, 1).toLocaleUpperCase());
                        domHelp.addElement(divM, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-road"});
                        divM.setAttribute("title", "Leçon de conduite avec : " + lecon.moniteur.prenom + " " + lecon.moniteur.nom);
                    }
                    else if (lecon instanceof calendrier.LeconCode) {
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; display: inline; background-color : #DFF0D8; float:left;");
                        //domHelp.addText(divM, "Code");
                        domHelp.addElement(divM, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-pencil"});
                        divM.setAttribute("title", "Leçon de code tenue par : " + lecon.moniteur.prenom + " " + lecon.moniteur.nom);
                    }
                }
                if(!aLeconConduite) {
                    td.addEventListener("click", function (e) {
                        var targetElement = e.target || e.srcElement;
                        var td = targetElement;
                        while (td.nodeName != "TD") {
                            td = targetElement.parentNode;
                        }
                        var jour = td.getAttribute("jour");
                        var idCreneau = td.getAttribute("creneau");
                        var creneau = application.semaines[numSemaine].jours[jour].creneaux[idCreneau];
                        var clientPresent = false;
                        for (var i = 0; i < creneau.clientsDisponibles.length; i++) {
                            if (creneau.clientsDisponibles[i] == application.userConnected) {
                                creneau.clientsDisponibles.splice(i, 1);
                                clientPresent = true;
                            }
                        }
                        if (!clientPresent) {
                            creneau.clientsDisponibles.push(application.userConnected);
                        }
                        dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                        page.clear();
                        page.clientSemaine(numSemaine);
                    }, false);
                }
            }
        }
    },

    printAgendaMoniteur : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        var semaine = application.semaines[numSemaine];
        for (var i=0; i<semaine.jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            var date = new Date(semaine.jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        var jour = semaine.jours[0];
        for (var i=0; i<jour.creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, jour.creneaux[i].heure + "h");
            for (var j=0; j<semaine.jours.length; j++) {
                var td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"}, {nomAttribut: "data-toggle", valeurAttribute: "modal"}, {nomAttribut: "data-target", valeurAttribute: "#myPopUp"});
                var creneau = semaine.jours[j].creneaux[i];
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    var largeur = (100 / creneau.lecons.length);
                    var divM = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite && lecon.moniteur == application.userConnected) {
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #FCF8E3; float:left;");
                        td.setAttribute("title", "Leçon de conduite avec : " + lecon.client.nom);
                    }
                    else if (lecon instanceof calendrier.LeconCode && lecon.moniteur == application.userConnected) {
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color : #DFF0D8; float:left;");
                        td.setAttribute("title", "Leçon de code");
                    }
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    popup.ajoutByMoniteur(numSemaine, targetElement);
                }, false);
            }
        }
    },

    printAgendaSecretaire : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        var semaine = application.semaines[numSemaine];
        for (var i=0; i<semaine.jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            var date = new Date(semaine.jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        var jour = semaine.jours[0];
        for (var i=0; i<jour.creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, jour.creneaux[i].heure + "h");
            for (var j=0; j<semaine.jours.length; j++) {
                var td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"}, {nomAttribut: "data-toggle", valeurAttribute: "modal"}, {nomAttribut: "data-target", valeurAttribute: "#myPopUp"});
                var creneau = semaine.jours[j].creneaux[i];
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    var largeur = (100 / creneau.lecons.length);
                    var divM = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite) {
                    //if(lecon.client!=null){
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: " + lecon.moniteur.couleur + "; float:left;");
                        domHelp.addText(divM, lecon.moniteur.nom.substr(0, 1).toLocaleUpperCase());
                        if (td.getAttribute("title") != null) {
                            td.setAttribute("title", td.getAttribute("title") + ", " + lecon.client.nom + " > " + lecon.moniteur.nom);
                        }
                        else {
                            td.setAttribute("title", lecon.client.nom + " > " + lecon.moniteur.nom);
                        }
                    }
                    else if (lecon instanceof calendrier.LeconCode) {
                    //else{
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color : #DFF0D8; float:left;");
                        domHelp.addText(divM, lecon.moniteur.nom.substr(0, 1).toLocaleUpperCase());
                    }
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    popup.ajoutBySecretaire(numSemaine, targetElement);
                }, false);
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
};

window.onload = function () {
    var cle;
    application.semaines = [];
    application.users = [];
    if (typeof localStorage!='undefined') {
        // Récupération de la valeur dans web storage :
        for (var i=0; i<localStorage.length; i++) {
            cle = localStorage.key(i);
            //On charge les entités des utilisateurs (Client, Moniteur, Secretaire) :
            if(cle.indexOf("user") != -1){
                var objet = JSON.parse(localStorage.getItem(cle), function() {
                    var value = JSON.parse(localStorage.getItem(cle));
                    if (value.ctor === "Cli") {
                        return new utilisateur.Client(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail, value.data.moniteur);
                    }
                    else if (value.ctor === "Mon") {
                        return new utilisateur.Moniteur(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail, value.data.couleur);
                    }
                    else{
                        return new utilisateur.Secretaire(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail);
                    }
                });
                application.users.push(objet);
            }
            //On charge les entités des Semaines avec leurs contenu et les références vers les clients qu'elles contiennent :
            else{
                var objet = JSON.parse(localStorage.getItem(cle), function() {
                    var value = JSON.parse(localStorage.getItem(cle));
                    var semaine =  new calendrier.Semaine(new Date(value.data.dateDebut));
                    semaine.cle = value.data.cle;
                    for(var i=0; i<value.data.jours.length; i++){
                        for(var j=0; j<value.data.jours[i].creneaux.length; j++) {
                            for(var k=0; k<value.data.jours[i].creneaux[j].clientsDisponibles.length; k++){
                                var client = domHelp.getUserIfExist(value.data.jours[i].creneaux[j].clientsDisponibles[k].data.nom, value.data.jours[i].creneaux[j].clientsDisponibles[k].data.prenom);
                                semaine.jours[i].creneaux[j].clientsDisponibles.push(client);
                            }
                            for(var k=0; k<value.data.jours[i].creneaux[j].lecons.length; k++){
                                var lecon = value.data.jours[i].creneaux[j].lecons[k];
                                if(value.data.jours[i].creneaux[j].lecons[k].ctor === "Con") {
                                    var moniteur = domHelp.getUserIfExist(lecon.data.moniteur.data.nom, lecon.data.moniteur.data.prenom);
                                    var client = domHelp.getUserIfExist(lecon.data.client.data.nom, lecon.data.client.data.prenom);
                                    semaine.jours[i].creneaux[j].lecons.push(new calendrier.LeconConduite(moniteur, client));
                                }
                                else if(value.data.jours[i].creneaux[j].lecons[k].ctor === "Cod"){
                                    var moniteur = domHelp.getUserIfExist(lecon.data.moniteur.data.nom, lecon.data.moniteur.data.prenom);
                                    semaine.jours[i].creneaux[j].lecons.push(new calendrier.LeconCode(moniteur));
                                }
                            }
                        }
                    }
                    return semaine;
                });
                application.semaines.push(objet);
            }
        }
    } else {
        alert("localStorage n'est pas supporté");
    }

    var dateDebutSemaineCourante = new Date(2014, 9, 12);
    var ajouter = true;
    dateDebutSemaineCourante.setDate(dateDebutSemaineCourante.getDate() - (dateDebutSemaineCourante.getDay() - 1));
    for(var i=0; i<application.semaines.length; i++){
        if((application.semaines[i].dateDebut.getDate() == dateDebutSemaineCourante.getDate())
            && (application.semaines[i].dateDebut.getMonth() == dateDebutSemaineCourante.getMonth())
            && (application.semaines[i].dateDebut.getFullYear() == dateDebutSemaineCourante.getFullYear())) {
            application.semaineCourante = application.semaines[i];
            ajouter = false;
        }
    }
    if(ajouter){
        var semaine = new calendrier.Semaine(dateDebutSemaineCourante);
        application.semaines.push(semaine);
        dao.addSemaine(semaine);
        application.semaineCourante = semaine;
    }

    page.accueil();
};