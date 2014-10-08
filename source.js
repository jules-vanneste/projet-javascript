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
        var form = domHelp.addElement(document.getElementById('content'), "form");
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

        div.style.display = "none";
        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        for (var i=0; i<application.semaines[numSemaine].jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            var date = new Date(application.semaines[i].jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        for (var i=0; i<application.semaines[numSemaine].jours[0].creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, application.semaines[numSemaine].jours[0].creneaux[i].heure + "h");
            for (var j=0; j<application.semaines[numSemaine].jours.length; j++) {
                var td = domHelp.addElement(tr,"td", {nomAttribut : "jour", valeurAttribute : j}, {nomAttribut : "creneau", valeurAttribute : i}, {nomAttribut : "class", valeurAttribute : "elt-clickable"});
                var tmp = application.semaines[numSemaine].jours[j].creneaux[i];
                if(tmp instanceof calendrier.LeconConduite){
                    //td.setAttribute("class", "success");
                    for(var k=0; k<tmp.reservations.length; k++){
                        if(tmp.reservations[k].client == application.userConnected){
                            td.setAttribute("class", "success");
                            domHelp.addText(td, tmp.reservations[k].moniteur.nom);
                        }
                    }
                }
                else if(tmp instanceof calendrier.LeconCode){
                    td.setAttribute("class", "info");
                }
                else{
                    domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : ""});
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    view.popupAjoutConduite(div, numSemaine, targetElement);
                }, false);
            }
        }
    },

    printAgendaMoniteur : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "form-dialogue"});
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        div.style.display = "none";
        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        for (var i=0; i<application.semaines[numSemaine].jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            var date = new Date(application.semaines[i].jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        for (var i=0; i<application.semaines[numSemaine].jours[0].creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, application.semaines[numSemaine].jours[0].creneaux[i].heure + "h");
            for (var j=0; j<application.semaines[numSemaine].jours.length; j++) {
                var td = domHelp.addElement(tr,"td", {nomAttribut : "jour", valeurAttribute : j}, {nomAttribut : "creneau", valeurAttribute : i}, {nomAttribut : "class", valeurAttribute : "elt-clickable"});
                var tmp = application.semaines[numSemaine].jours[j].creneaux[i];
                if(tmp instanceof calendrier.LeconConduite){
                    //td.setAttribute("class", "success");
                    for(var k=0; k<tmp.reservations.length; k++){
                        var res = tmp.reservations[k];
                        var largeur = (100/tmp.reservations.length);
                        var divM = domHelp.addElement(td, "div");

                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; vertical-align: middle; background-color: " + res.moniteur.couleur + "; float:left;");
                        domHelp.addText(divM, res.moniteur.nom.substr(0,1).toLocaleUpperCase());
                        if(td.getAttribute("title") != null){
                            td.setAttribute("title", td.getAttribute("title") + ", " + res.client.nom + " > " + res.moniteur.nom);
                        }
                        else{
                            td.setAttribute("title", res.client.nom + " > " + res.moniteur.nom);
                        }
                    }
                }
                else if(tmp instanceof calendrier.LeconCode){
                    td.setAttribute("class", "info");
                }
                else{
                    domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : ""});
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    view.popupAjoutConduite(div, numSemaine, targetElement);
                }, false);
            }
        }
    },

    printAgendaSecretaire : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "form-dialogue"});
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        div.style.display = "none";
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
                var td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"});
                var creneau = semaine.jours[j].creneaux[i];
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    var largeur = (100 / creneau.lecons.length);
                    var divM = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite) {
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
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color : #DFF0D8; float:left;");
                        divM.setAttribute("class", "success");
                        domHelp.addText(divM, lecon.moniteur.nom.substr(0, 1).toLocaleUpperCase());
                    }
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    popup.ajoutBySecretaire(div, numSemaine, targetElement);
                }, false);
            }
        }
    },

    choiceClient : function(nbRes, input, conteneurRes, lecons){
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
        }
    }
};

window.onload = function () {
    dao.addClient("user1", new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr",""));
    dao.addClient("user2", new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr",""));
    dao.addMoniteur("user3", new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7"));
    dao.addMoniteur("user4", new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3"));
    dao.addSecretaire("user5", new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr"));
    for (var i=0; i<10; i++) {
        dao.addSemaine(("semaine" + i), new calendrier.Semaine(i, new Date(2014, 9, 6), new Date(2014, 9, 12)));
    }
    if (typeof localStorage!='undefined') {
        // Récupération de la valeur dans web storage
        for (var i=0; i<localStorage.length; i++) {
            var cle = localStorage.key(i);
            var tmp = JSON.parse(localStorage.getItem(cle));
            if(cle.startsWith("user")){
                application.users.push(tmp);
            }
            else if(cle.startsWith("semaine")){
                application.semaines.push(tmp);
            }
        }
    } else {
        alert("localStorage n'est pas supporté");
    }
    page.accueil();
};