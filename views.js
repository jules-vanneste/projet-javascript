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
                    popup.ajoutBySecretaire(numSemaine, targetElement);
                }, false);
            }
        }
    }
};