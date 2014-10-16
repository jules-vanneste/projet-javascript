popup = {
    ajoutBySecretaire : function(numSemaine, targetElement){
        var td = targetElement;
        while(td.nodeName != "TD"){
            td = targetElement.parentNode;
        }
        var jour = td.getAttribute("jour");
        var creneau = td.getAttribute("creneau");

        var div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "modal fade"}, {nomAttribut : "id", valeurAttribute : "myPopUp"}, {nomAttribut : "role", valeurAttribute : "dialog"}, {nomAttribut : "aria-hidden", valeurAttribute : "true"});
        var divDialog = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "modal-dialog"});
        var divModal = domHelp.addElement(divDialog, "div", {nomAttribut : "class", valeurAttribute : "modal-content"});
        var divBody = domHelp.addElement(divModal, "div", {nomAttribut : "class", valeurAttribute : "modal-body"});

        var close = domHelp.addElement(divBody,"span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-circle col-sm-offset-11 btn-close elt-clickable"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        close.addEventListener("click", function () {
            page.clear();
            page.secretaire(numSemaine);
        }, false);

        var nav = domHelp.addElement(divBody,"div", {nomAttribut : "class", valeurAttribute : "btn-group btn-group-justified nav-popup"});
        var navCode = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonCode = domHelp.addElement(navCode, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonCode, "Ajout Leçon de Code");
        var navConduite = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonConduite = domHelp.addElement(navConduite, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonConduite, "Ajout Leçon de Conduite");
        var navGestion = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonGestion = domHelp.addElement(navGestion, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonGestion, "Gestion des leçons");

        var contentPopup = domHelp.addElement(divBody, "div");
        popup.contentAjoutCodeBySecretaire(contentPopup,numSemaine,jour,creneau);
        boutonCode.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutCodeBySecretaire(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonConduite.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutConduiteBySecretaire(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonGestion.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentGestionLeconsBySecretaire(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonCode.focus();
    },

    ajoutByMoniteur : function(numSemaine, targetElement){
        var td = targetElement;
        while(td.nodeName != "TD"){
            td = targetElement.parentNode;
        }
        var jour = td.getAttribute("jour");
        var creneau = td.getAttribute("creneau");

        var div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "modal fade"}, {nomAttribut : "id", valeurAttribute : "myPopUp"}, {nomAttribut : "role", valeurAttribute : "dialog"}, {nomAttribut : "aria-hidden", valeurAttribute : "true"});
        var divDialog = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "modal-dialog"});
        var divModal = domHelp.addElement(divDialog, "div", {nomAttribut : "class", valeurAttribute : "modal-content"});
        var divBody = domHelp.addElement(divModal, "div", {nomAttribut : "class", valeurAttribute : "modal-body"});

        var close = domHelp.addElement(divBody,"span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-circle col-sm-offset-11 btn-close elt-clickable"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        close.addEventListener("click", function () {
            page.clear();
            page.moniteur(numSemaine);
        }, false);

        var nav = domHelp.addElement(divBody,"div", {nomAttribut : "class", valeurAttribute : "btn-group btn-group-justified nav-popup"});
        var navCode = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonCode = domHelp.addElement(navCode, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonCode, "Ajout Leçon de Code");
        var navConduite = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonConduite = domHelp.addElement(navConduite, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonConduite, "Ajout Leçon de Conduite");
        var navGestion = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonGestion = domHelp.addElement(navGestion, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonGestion, "Gestion des leçons");

        var contentPopup = domHelp.addElement(divBody, "div");
        popup.contentAjoutCodeByMoniteur(contentPopup,numSemaine,jour,creneau);
        boutonCode.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutCodeByMoniteur(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonConduite.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutConduiteByMoniteur(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonGestion.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentGestionLeconsByMoniteur(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonCode.focus();
    },

    contentAjoutCodeBySecretaire : function(div, numSemaine, jour, creneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        var div_moniteur = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lMoniteur = domHelp.addElement(div_moniteur, "label", {nomAttribut : "for", valeurAttribute : "sMoniteur"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lMoniteur, "Nom du moniteur :");
        var div_input_moniteur = domHelp.addElement(div_moniteur, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sMoniteur =  domHelp.addElement(div_input_moniteur, "select", {nomAttribut : "name", valeurAttribute : "moniteur", nomAttribut : "class", valeurAttribute : "form-control"});
        for (var i=0; i<application.users.length; i++) {
            if (application.users[i].role == "Moniteur") {
                var ok = true;
                var lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
                for(var j=0; j<lecons.length; j++){
                    if(lecons[j].moniteur == application.users[i]){
                        ok = false;
                    }
                }
                if(ok){
                    var oMoniteur = domHelp.addElement(sMoniteur, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(oMoniteur, (application.users[i].civilite + " " + application.users[i].nom + " " + application.users[i].prenom));
                }
            }
        }

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var idMoniteur = sMoniteur.options[sMoniteur.selectedIndex].value;
            application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons.push(new calendrier.LeconCode(application.users[idMoniteur]));
            dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            page.clear();
            page.secretaire(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentAjoutCodeByMoniteur : function(div, numSemaine, jour, creneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons.push(new calendrier.LeconCode(application.users[application.userConnected]));
            dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            page.clear();
            page.moniteur(numSemaine);
        };
        domHelp.addText(button, "Ajouter leçon de code");
    },

    contentAjoutConduiteBySecretaire : function(div, numSemaine, numJour, numCreneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        var divCheckBox = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "check-form checkbox col-sm-offset-4"});
        var labelCheckBox = domHelp.addElement(divCheckBox, "label");
        var checkDispoClient =  domHelp.addElement(labelCheckBox, "input", {nomAttribut : "type", valeurAttribute : "checkbox"}, {nomAttribut : "name", valeurAttribute : "sClient"});
        domHelp.addText(labelCheckBox, "Montrer seulement les clients disponibles");

        var div_client = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lClient = domHelp.addElement(div_client, "label", {nomAttribut : "for", valeurAttribute : "sClient"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lClient, "Nom du client :");
        var div_input_client = domHelp.addElement(div_client, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sClient =  domHelp.addElement(div_input_client, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});

        checkDispoClient.addEventListener("click", function(){
            div_input_client.innerHTML = "";
            if(!checkDispoClient.checked){
                var sClient = domHelp.addElement(div_input_client, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
            }
            else {
                var clientsDispo = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].clientsDisponibles;
                var sClient = domHelp.addElement(div_input_client, "select", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "id", valeurAttribute : "user"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                for(var i=0; i<clientsDispo.length; i++){
                    var oClient = domHelp.addElement(sClient, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(oClient, clientsDispo[i].nom + " " + clientsDispo[i].prenom);
                }
            }
        }, false);

        var div_moniteur = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lMoniteur = domHelp.addElement(div_moniteur, "label", {nomAttribut : "for", valeurAttribute : "sMoniteur"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lMoniteur, "Nom du moniteur :");
        var div_input_moniteur = domHelp.addElement(div_moniteur, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sMoniteur =  domHelp.addElement(div_input_moniteur, "select", {nomAttribut : "name", valeurAttribute : "moniteur", nomAttribut : "class", valeurAttribute : "form-control"});
        for (var i=0; i<application.users.length; i++) {
            if (application.users[i].role == "Moniteur") {
                var ok = true;
                var lecons = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons;
                for(var j=0; j<lecons.length; j++){
                    if(lecons[j].moniteur == application.users[i]){
                        ok = false;
                    }
                }
                if(ok){
                    var oMoniteur = domHelp.addElement(sMoniteur, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(oMoniteur, (application.users[i].civilite + " " + application.users[i].nom + " " + application.users[i].prenom));
                }
            }
        }

        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        sClient.addEventListener("keyup", function(){tools.choiceClient(3, sClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau])});

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var radios = document.getElementsByName('user');
            var idUser = -1;
            var idMoniteur = sMoniteur.options[sMoniteur.selectedIndex].value;
            var creneau = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau];
            if(checkDispoClient.checked){
                var idSelect = document.getElementById('user').value;
                idUser = domHelp.getIndexOfUserIfExist(creneau.clientsDisponibles[idSelect].nom, creneau.clientsDisponibles[idSelect].prenom);
                creneau.clientsDisponibles.splice(idSelect, 1);
            }
            else{
                for (var i=0; i<radios.length; i++) {
                    if (radios[i].checked) {
                        idUser = radios[i].value;
                        break;
                    }
                }
            }
            if(idUser != -1){
                creneau.lecons.push(new calendrier.LeconConduite(application.users[idMoniteur], application.users[idUser]));
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            }
            page.clear();
            page.secretaire(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentAjoutConduiteByMoniteur : function(div, numSemaine, numJour, numCreneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        var divCheckBox = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "check-form checkbox col-sm-offset-4"});
        var labelCheckBox = domHelp.addElement(divCheckBox, "label");
        var checkDispoClient =  domHelp.addElement(labelCheckBox, "input", {nomAttribut : "type", valeurAttribute : "checkbox"}, {nomAttribut : "name", valeurAttribute : "sClient"});
        domHelp.addText(labelCheckBox, "Montrer seulement les clients disponibles");

        var div_client = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        var lClient = domHelp.addElement(div_client, "label", {nomAttribut : "for", valeurAttribute : "sClient"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(lClient, "Nom du client :");
        var div_input_client = domHelp.addElement(div_client, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        var sClient =  domHelp.addElement(div_input_client, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});

        checkDispoClient.addEventListener("click", function(){
            div_input_client.innerHTML = "";
            if(!checkDispoClient.checked){
                var sClient = domHelp.addElement(div_input_client, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
            }
            else {
                var clientsDispo = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].clientsDisponibles;
                var sClient = domHelp.addElement(div_input_client, "select", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "id", valeurAttribute : "user"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                for(var i=0; i<clientsDispo.length; i++){
                    var oClient = domHelp.addElement(sClient, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(oClient, clientsDispo[i].nom + " " + clientsDispo[i].prenom);
                }
            }
        }, false);

        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        sClient.addEventListener("keyup", function(){tools.choiceClient(3, sClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau])});

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var radios = document.getElementsByName('user');
            var idUser = -1;
            var creneau = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau];
            if(checkDispoClient.checked){
                var idSelect = document.getElementById('user').value;
                idUser = domHelp.getIndexOfUserIfExist(creneau.clientsDisponibles[idSelect].nom, creneau.clientsDisponibles[idSelect].prenom);
                creneau.clientsDisponibles.splice(idSelect, 1);
            }
            else{
                for (var i=0; i<radios.length; i++) {
                    if (radios[i].checked) {
                        idUser = radios[i].value;
                        break;
                    }
                }
            }
            if(idUser != -1){
                creneau.lecons.push(new calendrier.LeconConduite(application.users[application.userConnected], application.users[idUser]));
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            }
            page.clear();
            page.moniteur(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentGestionLeconsBySecretaire : function(div, numSemaine, jour, creneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        var lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr, td, th, span;
        tr = domHelp.addElement(tbody,"tr");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Type");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Moniteur");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Client");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Suppr");
        for (var i=0; i<lecons.length; i++) {
            tr = domHelp.addElement(tbody,"tr");
            if(lecons[i] instanceof calendrier.LeconConduite){
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de conduite");
                td = domHelp.addElement(tr, "td");
                var select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        var option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == lecons[i].moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    var targetElement = e.target || e.srcElement;
                    var sel = targetElement;
                    while(sel.nodeName != "SELECT"){
                        sel = targetElement.parentNode;
                    }
                    var idMoniteur = sel.options[sel.selectedIndex].value;
                    var idLecon = sel.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur];
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLecons(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, lecons[i].client.nom + " " + lecons[i].client.prenom);
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            else{
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de code")
                td = domHelp.addElement(tr, "td");
                var select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        var option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == lecons[i].moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    alert("OK2");
                    var targetElement = e.target || e.srcElement;
                    var sel = targetElement;
                    while(sel.nodeName != "SELECT"){
                        sel = targetElement.parentNode;
                    }
                    var idMoniteur = sel.options[sel.selectedIndex].value;
                    var idLecon = sel.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur];
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLecons(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "");
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            td.addEventListener("click", function(e){
                var targetElement = e.target || e.srcElement;
                var td = targetElement;
                while(td.nodeName != "TD"){
                    td = targetElement.parentNode;
                }
                lecons.splice(td.getAttribute("idLecon"), 1);
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                div.innerHTML = "";
                popup.contentGestionLecons(div,numSemaine,jour,creneau);
            }, false);
        }
    },

    contentGestionLeconsByMoniteur : function(div, numSemaine, jour, creneau){
        var form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        var lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        var tbody = domHelp.addElement(table, "tbody");
        var tr, td, th, span;
        tr = domHelp.addElement(tbody,"tr");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Type");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Moniteur");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Client");
        th = domHelp.addElement(tr, "th");
        domHelp.addText(th, "Suppr");
        for (var i=0; i<lecons.length; i++) {
            tr = domHelp.addElement(tbody,"tr");
            if(lecons[i] instanceof calendrier.LeconConduite && lecons[i].moniteur == application.users[application.userConnected]){
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de conduite");
                td = domHelp.addElement(tr, "td");
                var select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        var option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == lecons[i].moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    var targetElement = e.target || e.srcElement;
                    var sel = targetElement;
                    while(sel.nodeName != "SELECT"){
                        sel = targetElement.parentNode;
                    }
                    var idMoniteur = sel.options[sel.selectedIndex].value;
                    var idLecon = sel.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur];
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLecons(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, lecons[i].client.nom + " " + lecons[i].client.prenom);
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            else if(lecons[i] instanceof calendrier.LeconCode && lecons[i].moniteur == application.users[application.userConnected]){
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de code")
                td = domHelp.addElement(tr, "td");
                var select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        var option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == lecons[i].moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    alert("OK2");
                    var targetElement = e.target || e.srcElement;
                    var sel = targetElement;
                    while(sel.nodeName != "SELECT"){
                        sel = targetElement.parentNode;
                    }
                    var idMoniteur = sel.options[sel.selectedIndex].value;
                    var idLecon = sel.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur];
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLecons(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "");
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            td.addEventListener("click", function(e){
                var targetElement = e.target || e.srcElement;
                var td = targetElement;
                while(td.nodeName != "TD"){
                    td = targetElement.parentNode;
                }
                lecons.splice(td.getAttribute("idLecon"), 1);
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                div.innerHTML = "";
                popup.contentGestionLecons(div,numSemaine,jour,creneau);
            }, false);
        }
    }
}