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
            if(elements[i].role == role) {
                for(var j=0; j<proprietes.length; j++) {
                    if (elements[i][proprietes[j]].toLowerCase().indexOf(recherche) != -1) {
                        res.push(i);
                        break;
                    }
                }
            }
        }
        return res;
    }
};

affichage = {
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
                    view.clear();
                    if(application.userConnected.role == "Client"){
                        view.client();
                    }
                    else if(application.userConnected.role == "Moniteur"){
                        view.moniteur();
                    }
                    else if(application.userConnected.role == "Secrétaire"){
                        view.secretaire();
                    }
                    break;
                }
            }
        };
        domHelp.addText(button, "Se connecter");
    },

    printAgenda : function(numSemaine) {
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
                var td = domHelp.addElement(tr,"td", {nomAttribut : "jour", valeurAttribute : j}, {nomAttribut : "creneau", valeurAttribute : i});
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
                    td.s
                }
                else if(tmp instanceof calendrier.LeconCode){
                    td.setAttribute("class", "info");
                }
                else{
                    domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-plus"});
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    affichage.popupAjoutConduite(div, numSemaine, targetElement);
                }, false);
            }
        }
    },

    popupAjoutConduite : function(div, numSemaine, targetElement){
        var td = targetElement;
        while(td.nodeName != "TD"){
            td = targetElement.parentNode;
        }
        var jour = td.getAttribute("jour");
        var creneau = td.getAttribute("creneau");
        if (div.style.display == "none") {
            div.style.display = "block";
        }
        else {
            div.style.display = "none";
        }

        var titre = domHelp.addElement(div, "h2");
        domHelp.addText(titre, "Ajouter une leçon de conduite");
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        var div_client = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lClient = domHelp.addElement(div_client, "label", {nomAttribut : "for", valeurAttribute : "sClient"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lClient, "Nom du client :");
        var div_input_client = domHelp.addElement(div_client, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sClient =  domHelp.addElement(div_input_client, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});

        var div_moniteur = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lMoniteur = domHelp.addElement(div_moniteur, "label", {nomAttribut : "for", valeurAttribute : "sMoniteur"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lMoniteur, "Nom du moniteur :");
        var div_input_moniteur = domHelp.addElement(div_moniteur, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sMoniteur =  domHelp.addElement(div_input_moniteur, "select", {nomAttribut : "name", valeurAttribute : "moniteur", nomAttribut : "class", valeurAttribute : "form-control"});
        for (var i=0; i<application.users.length; i++) {
            if (application.users[i].role == "Moniteur") {
                var oMoniteur = domHelp.addElement(sMoniteur, "option", {nomAttribut: "value", valeurAttribute: i});
                domHelp.addText(oMoniteur, (application.users[i].civilite + " " + application.users[i].nom + " " + application.users[i].prenom));
            }
        }

        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        sClient.addEventListener("keydown", function(){affichage.choiceClient(5, sClient, table)});

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"});
        button.onclick = function() {
            var radios = document.getElementsByName('user');
            var idUser = -1;
            var idMoniteur = sMoniteur.options[sMoniteur.selectedIndex].value;
            for (var i=0; i<radios.length; i++) {
                if (radios[i].checked) {
                    idUser = radios[i].value;
                    break;
                }
            }
            if(idUser != -1){
                alert(jour);
                if (application.semaines[numSemaine].jours[jour].creneaux[creneau] instanceof calendrier.LeconConduite) {
                    application.semaines[numSemaine].jours[jour].creneaux[creneau].reservations = new calendrier.Reservation(application.users[idUser], application.users[idMoniteur]);
                }
                else {
                    application.semaines[numSemaine].jours[jour].creneaux[creneau] = new calendrier.LeconConduite(application.semaines[numSemaine].jours[jour].creneaux[creneau].heure, new calendrier.Reservation(application.users[idUser], application.users[idMoniteur]));
                }
            }
            view.clear();
            affichage.printAgenda(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    choiceClient : function(nbRes, input, conteneurRes){
        conteneurRes.innerHTML = "";
        var tbody = domHelp.addElement(conteneurRes, "tbody");
        var tr;
        var td;
        var res = domHelp.searchUser(input, application.users, "Client", ["nom", "prenom"]);
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
    dao.addMoniteur("user3", new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#DD6E6E"));
    dao.addMoniteur("user4", new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#6DE07F"));
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
    view.accueil();
};