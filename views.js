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
            document.getElementById("btnDeco").innerHTML = "<li><a href=\"#\" onclick=\"page.clear(); page.accueil(); document.getElementById('btnDeco').innerHTML='';\"><span class=\"glyphicon glyphicon-off btn-deco\"></span></a></li>";
            for (var i=0; i<radios.length; i++) {
                if (radios[i].checked) {
                    application.userConnected = radios[i].value;
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
        var conteneurFleches = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "btn-group float-right div-conteneur"});
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th;
        var aLeconConduite = false;

        var flecheGauche = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        var flecheDroite = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addElement(flecheGauche, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-left"});
        domHelp.addElement(flecheDroite, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-right"});
        flecheGauche.addEventListener("click", function(){
            tools.changeSemaine(page.client, numSemaine, false);
        }, false);
        flecheDroite.addEventListener("click", function(){
            tools.changeSemaine(page.client, numSemaine, true);
        }, false);

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
                    if(lecon instanceof calendrier.LeconConduite && lecon.client == application.users[application.userConnected]) {
                        nblecon = nblecon+1;
                    }
                    else if(lecon instanceof calendrier.LeconCode){
                        nblecon = nblecon+1;
                    }
                }
                for (var k = 0; k < creneau.clientsDisponibles.length; k++) {
                    if(creneau.clientsDisponibles[k] == application.users[application.userConnected]){
                        nblecon = nblecon+1;
                        var largeur = (100 / nblecon);
                        var divM = domHelp.addElement(td, "div");
                        domHelp.addElement(divM, "span", { nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"});
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #D9EDF7; float:left;");
                    }
                }
                for (var k = 0; k < creneau.lecons.length; k++) {
                    var lecon = creneau.lecons[k];
                    var largeur = (100 / nblecon);
                    var divM = domHelp.addElement(td, "div");
                    if (lecon instanceof calendrier.LeconConduite && lecon.client == application.users[application.userConnected]) {
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
                            if (creneau.clientsDisponibles[i] == application.users[application.userConnected]) {
                                creneau.clientsDisponibles.splice(i, 1);
                                clientPresent = true;
                            }
                        }
                        if (!clientPresent) {
                            creneau.clientsDisponibles.push(application.users[application.userConnected]);
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
        var conteneurFleches = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "btn-group float-right div-conteneur"});
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        var flecheGauche = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        var flecheDroite = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addElement(flecheGauche, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-left"});
        domHelp.addElement(flecheDroite, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-right"});
        flecheGauche.addEventListener("click", function(){
            tools.changeSemaine(page.moniteur, numSemaine, false);
        }, false);
        flecheDroite.addEventListener("click", function(){
            tools.changeSemaine(page.moniteur, numSemaine, true);
        }, false);

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
                    if (lecon instanceof calendrier.LeconConduite && lecon.moniteur == application.users[application.userConnected]) {
                        divM.setAttribute("style", "width: " + largeur + "%; height:100%; line-height:35px; display: inline; background-color: #FCF8E3; float:left;");
                        td.setAttribute("title", "Leçon de conduite avec : " + lecon.client.nom);
                    }
                    else if (lecon instanceof calendrier.LeconCode && lecon.moniteur == application.users[application.userConnected]) {
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
        var conteneurFleches = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "btn-group float-right div-conteneur"});
        var table = domHelp.addElement(document.getElementById('content'), "table", {nomAttribut : "class", valeurAttribute : "table table-bordered"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr = domHelp.addElement(tbody,"tr");
        var th;

        var flecheGauche = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        var flecheDroite = domHelp.addElement(conteneurFleches, "button", {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addElement(flecheGauche, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-left"});
        domHelp.addElement(flecheDroite, "span", {nomAttribut : "class", valeurAttribute: "glyphicon glyphicon-chevron-right"});
        flecheGauche.addEventListener("click", function(){
            tools.changeSemaine(page.secretaire, numSemaine, false);
        }, false);
        flecheDroite.addEventListener("click", function(){
            tools.changeSemaine(page.secretaire, numSemaine, true);
        }, false);

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
    }
};