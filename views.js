/*
 Les différentes vues et/ou fragments de vues des pages de l'application.
 */
view = {
    // Affiche un tableau d'objets sous forme de tableau
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

    // Affiche un tableau d'objets sous forme d'un select tableau
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

    // Affiche les fleches pour changer de semaine pour une page
    printFlechesChgtSemaine : function(page, numSemaine){
        var conteneurFleches = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "btn-group float-right div-conteneur"});
        var flecheGauche = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        var flecheDroite = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addElement(flecheGauche, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-left"});
        domHelp.addElement(flecheDroite, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-right"});
        flecheGauche.addEventListener("click", function(){
            tools.changeSemaine(page, numSemaine, false);
        }, false);
        flecheDroite.addEventListener("click", function(){
            tools.changeSemaine(page, numSemaine, true);
        }, false);
    },

    // Affiche le formulaire de connexion
    printFormLogin : function(objects, properties){
        var conteneurPlus = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "style", valeurAttribute : "width:100%; text-align: right; margin-bottom: 10px;"});
        var plus = domHelp.addElement(conteneurPlus, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addElement(plus, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-plus"});
        plus.addEventListener("click", function(){
            page.clear();
            page.ajoutUtilisateur();
        }, false);

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
                    application.userConnected = radios[i].value;
                    document.getElementById("btnDeco").innerHTML = "<li><a href=\"#\" onclick=\"page.clear(); page.accueil(); document.getElementById('btnDeco').innerHTML='';\"><span class=\"nameUserConnected\">" + application.users[application.userConnected].prenom + " " + application.users[application.userConnected].nom + " " + "</span><span class=\"glyphicon glyphicon-off btn-deco\"></span></a></li>";
                    page.clear();
                    if(application.users[application.userConnected].role == "Client"){
                        page.client(application.semaineCourante);
                    }
                    else if(application.users[application.userConnected].role == "Moniteur"){
                        page.moniteur(application.semaineCourante);
                    }
                    else if(application.users[application.userConnected].role == "Secrétaire"){
                        page.secretaire(application.semaineCourante);
                    }
                    break;
                }
            }
        };
        domHelp.addText(button, "Se connecter");
    },

    // Affiche le formulaire d'ajout des utilisateurs
    printAjoutUtilisateur : function(){
        var form, divGroup, divInput, labelType, inputType, optionType, labelCiv, inputCiv, optionCiv, labelNom, inputNom, labelPrenom, inputPrenom,
            labelAdresse, inputAdresse, labelVille, inputVille, labelTel, inputTel, labelMail, inputMail,
            div, labelCouleur, inputCouleur, labelMoniteur, inputMoniteur, optionMoniteur, inputBouton;

        form = domHelp.addElement(document.getElementById('content'), "form", {nomAttribut : "class", valeurAttribute: "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"}, {nomAttribut: "style", valeurAttribute: "width: 500px; margin:auto;"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelType = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "type"});
        domHelp.addText(labelType, "Type");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputType = domHelp.addElement(divInput, "select", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "id", valeurAttribute: "type"});
        optionType = domHelp.addElement(inputType, "option", {nomAttribut : "value", valeurAttribute: 0});
        domHelp.addText(optionType, "Moniteur");
        optionType = domHelp.addElement(inputType, "option", {nomAttribut : "value", valeurAttribute: 1});
        domHelp.addText(optionType, "Client");

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelCiv = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "civ"});
        domHelp.addText(labelCiv, "Civilite");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputCiv = domHelp.addElement(divInput, "select", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "id", valeurAttribute: "civ"});
        optionCiv = domHelp.addElement(inputCiv, "option", {nomAttribut : "value", valeurAttribute: "M."});
        domHelp.addText(optionCiv, "M.");
        optionCiv = domHelp.addElement(inputCiv, "option", {nomAttribut : "value", valeurAttribute: "Mme."});
        domHelp.addText(optionCiv, "Mme.");

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelNom = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "nom"});
        domHelp.addText(labelNom, "Nom");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputNom = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Nom"}, {nomAttribut : "id", valeurAttribute: "nom"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelPrenom = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "prenom"});
        domHelp.addText(labelPrenom, "Prenom");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputPrenom = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Prenom"}, {nomAttribut : "id", valeurAttribute: "prenom"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelAdresse = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "adresse"});
        domHelp.addText(labelAdresse, "Adresse");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputAdresse = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Adresse"}, {nomAttribut : "id", valeurAttribute: "adresse"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelVille = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "ville"});
        domHelp.addText(labelVille, "Ville");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputVille = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Ville"}, {nomAttribut : "id", valeurAttribute: "ville"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelTel = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "tel"});
        domHelp.addText(labelTel, "Telephone");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputTel = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Telephone"}, {nomAttribut : "id", valeurAttribute: "tel"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelMail = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "mail"});
        domHelp.addText(labelMail, "Mail");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputMail = domHelp.addElement(divInput, "input", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "placeholder", valeurAttribute: "Mail"}, {nomAttribut : "id", valeurAttribute: "mail"});

        div = domHelp.addElement(form, "div");
        divGroup = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        labelCouleur = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "couleur"});
        domHelp.addText(labelCouleur, "Couleur");
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
        inputCouleur = domHelp.addElement(divInput, "input", {nomAttribut : "type", valeurAttribute: "color"}, {nomAttribut : "value", valeurAttribute: "#fad345"}, {nomAttribut : "id", valeurAttribute: "couleur"});

        divGroup = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
        divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: ""});
        inputBouton = domHelp.addElement(divInput, "button", {nomAttribut : "class", valeurAttribute: "btn btn-default col-sm-offset-6"});
        domHelp.addText(inputBouton, "Ajouter");

        inputType.addEventListener("change", function(){
            var idSelect;
            idSelect = inputType.value;
            div.innerHTML = "";
            if(idSelect == 0){
                divGroup = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
                labelCouleur = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "couleur"});
                domHelp.addText(labelCouleur, "Couleur");
                divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
                inputCouleur = domHelp.addElement(divInput, "input", {nomAttribut : "type", valeurAttribute: "color"}, {nomAttribut : "value", valeurAttribute: "#fad345"}, {nomAttribut : "id", valeurAttribute: "couleur"});
            }
            else{
                divGroup = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute: "form-group"});
                labelMoniteur = domHelp.addElement(divGroup, "label", {nomAttribut : "class", valeurAttribute: "col-sm-2 control-label"}, {nomAttribut : "for", valeurAttribute: "moniteur"});
                domHelp.addText(labelMoniteur, "Moniteur");
                divInput = domHelp.addElement(divGroup, "div", {nomAttribut : "class", valeurAttribute: "col-sm-10"});
                inputMoniteur = domHelp.addElement(divInput, "select", {nomAttribut : "class", valeurAttribute: "form-control"}, {nomAttribut : "id", valeurAttribute: "moniteur"});
                for(var i=0; i<application.users.length; i++){
                    if(application.users[i] instanceof utilisateur.Moniteur){
                        optionMoniteur = domHelp.addElement(inputMoniteur, "option", {nomAttribut : "value", valeurAttribute: application.users[i].cle});
                        domHelp.addText(optionMoniteur, (application.users[i].nom + " " + application.users[i].prenom));
                    }
                }
            }
        });

        inputBouton.addEventListener("click", function(){
            var user, couleur, moniteur;
            var idSelect = inputType.value;
            var civ = inputCiv.value;
            var nom = inputNom.value;
            var prenom = inputPrenom.value;
            var adresse = inputAdresse.value;
            var ville = inputVille.value;
            var tel = inputTel.value;
            var mail = inputMail.value;
            if(idSelect == 0){
                couleur = inputCouleur.value;
                user = new utilisateur.Moniteur(civ, nom, prenom, adresse, ville, tel, mail, couleur);
            }
            else{
                moniteur = inputMoniteur.value;
                user = new utilisateur.Client(civ, nom, prenom, adresse, ville, tel, mail, moniteur);
            }
            dao.createUtilisateur(user);
            application.users.push(user);
            page.clear();
            page.accueil();
        });
    },

    // Affiche l'agenda d'un client
    printAgendaClient : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th, td, semaine, creneau, lecon, nbLecon, aLeconConduite, largeur, divLecon, moniteur;

        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        semaine = application.semaines[numSemaine];
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
                td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"});
                creneau = semaine.jours[j].creneaux[i];
                nbLecon = 0;
                for (var k = 0; k < creneau.lecons.length; k++) {
                    lecon = creneau.lecons[k];
                    if(lecon instanceof calendrier.LeconConduite && lecon.client == application.users[application.userConnected].cle) {
                        nbLecon = nbLecon+1;
                    }
                    else if(lecon instanceof calendrier.LeconCode){
                        nbLecon = nbLecon+1;
                    }
                }
                for (var k = 0; k < creneau.clientsDisponibles.length; k++) {
                    if(creneau.clientsDisponibles[k] == application.users[application.userConnected].cle){
                        nbLecon = nbLecon+1;
                        largeur = (100 / nbLecon);
                        divLecon = domHelp.addElement(td, "div");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"});
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #D9EDF7; float:left;");
                    }
                }
                for (var k = 0; k < creneau.lecons.length; k++) {
                    lecon = creneau.lecons[k];
                    largeur = (100 / nbLecon);
                    divLecon = domHelp.addElement(td, "div");
                    moniteur = tools.getUserIfExist(lecon.moniteur);
                    if (lecon instanceof calendrier.LeconConduite && lecon.client == application.users[application.userConnected].cle) {
                        aLeconConduite = true;
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; display: inline; background-color: #FCF8E3; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-road"});
                        divLecon.setAttribute("title", "Leçon de conduite avec : " + moniteur.prenom + " " + moniteur.nom);
                    }
                    else if (lecon instanceof calendrier.LeconCode) {
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; display: inline; background-color : #DFF0D8; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-pencil"});
                        divLecon.setAttribute("title", "Leçon de code tenue par : " + moniteur.prenom + " " + moniteur.nom);
                    }
                }
                if(!aLeconConduite) {
                    td.addEventListener("click", function (e) {
                        var targetElement, idCreneau, jour, creneau, clientPresent;

                        targetElement = e.target || e.srcElement;
                        td = targetElement;
                        while (td.nodeName != "TD") {
                            td = targetElement.parentNode;
                        }

                        jour = td.getAttribute("jour");
                        idCreneau = td.getAttribute("creneau");
                        creneau = application.semaines[numSemaine].jours[jour].creneaux[idCreneau];
                        clientPresent = false;
                        for (var i = 0; i < creneau.clientsDisponibles.length; i++) {
                            if (creneau.clientsDisponibles[i] == application.users[application.userConnected].cle) {
                                creneau.clientsDisponibles.splice(i, 1);
                                clientPresent = true;
                            }
                        }
                        if (!clientPresent) {
                            creneau.clientsDisponibles.push(application.users[application.userConnected].cle);
                        }

                        dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                        page.clear();
                        page.client(numSemaine);
                    }, false);
                }
            }
        }
    },

    // Affiche l'agenda d'un moniteur
    printAgendaMoniteur : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th, td, date, jour, creneau, lecon, largeur, divLecon, moniteur, client, nbLecon;

        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        var semaine = application.semaines[numSemaine];
        for (var i=0; i<semaine.jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            date = new Date(semaine.jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        jour = semaine.jours[0];
        for (var i=0; i<jour.creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, jour.creneaux[i].heure + "h");
            for (var j=0; j<semaine.jours.length; j++) {
                td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"}, {nomAttribut: "data-toggle", valeurAttribute: "modal"}, {nomAttribut: "data-target", valeurAttribute: "#myPopUp"});
                creneau = semaine.jours[j].creneaux[i];
                nbLecon = 0;
                for (var k = 0; k < creneau.lecons.length; k++) {
                    lecon = creneau.lecons[k];
                    moniteur = tools.getUserIfExist(lecon.moniteur);
                    if (moniteur == application.users[application.userConnected]) {
                        nbLecon = nbLecon + 1;
                    }
                }
                for (var k = 0; k < creneau.lecons.length; k++) {
                    lecon = creneau.lecons[k];
                    largeur = (100 / nbLecon);
                    divLecon = domHelp.addElement(td, "div");
                    moniteur = tools.getUserIfExist(lecon.moniteur);
                    if (lecon instanceof calendrier.LeconConduite && moniteur == application.users[application.userConnected]) {
                        client = tools.getUserIfExist(lecon.client);
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #FCF8E3; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-road"});
                        td.setAttribute("title", "Leçon de conduite avec : " + client.nom + " " + client.prenom);
                    }
                    else if (lecon instanceof calendrier.LeconCode && moniteur == application.users[application.userConnected]) {
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color : #DFF0D8; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-pencil"});
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

    // Affiche l'agenda d'une secretaire
    printAgendaSecretaire : function(numSemaine) {
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th, td, semaine, date, jour, creneau, lecon, largeur, divLecon, moniteur, client;

        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        semaine = application.semaines[numSemaine];
        for (var i=0; i<semaine.jours.length; i++) {
            th = domHelp.addElement(tr,"th");
            date = new Date(semaine.jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        jour = semaine.jours[0];
        for (var i=0; i<jour.creneaux.length; i++) {
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, jour.creneaux[i].heure + "h");
            for (var j=0; j<semaine.jours.length; j++) {
                td = domHelp.addElement(tr, "td", {nomAttribut: "jour", valeurAttribute: j}, {nomAttribut: "creneau", valeurAttribute: i}, {nomAttribut: "class", valeurAttribute: "elt-clickable"}, {nomAttribut: "data-toggle", valeurAttribute: "modal"}, {nomAttribut: "data-target", valeurAttribute: "#myPopUp"});
                creneau = semaine.jours[j].creneaux[i];
                for (var k = 0; k < creneau.lecons.length; k++) {
                    lecon = creneau.lecons[k];
                    largeur = (100 / creneau.lecons.length);
                    divLecon = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite) {
                        moniteur = tools.getUserIfExist(lecon.moniteur);
                        client = tools.getUserIfExist(lecon.client);
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: " + moniteur.couleur + "; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-road"});
                        divLecon.setAttribute("title", "Lecon de conduite de " + moniteur.nom + " " + moniteur.prenom + " avec " + client.nom + " " + client.prenom);
                    }
                    else if (lecon instanceof calendrier.LeconCode) {
                        moniteur = tools.getUserIfExist(lecon.moniteur);
                        divLecon.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: " + moniteur.couleur + "; float:left;");
                        domHelp.addElement(divLecon, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-pencil"});
                        divLecon.setAttribute("title", "Lecon de code tenue par " + moniteur.nom + " " + moniteur.prenom);
                    }
                }
                td.addEventListener("click", function (e) {
                    var targetElement = e.target || e.srcElement;
                    var tdElement = targetElement;
                    while(tdElement.nodeName != "TD"){
                        tdElement = tdElement.parentNode;
                    }

                    popup.ajoutBySecretaire(numSemaine, tdElement);
                }, false);
            }
        }
    }
};