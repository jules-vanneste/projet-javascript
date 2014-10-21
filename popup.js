popup = {
    ajoutBySecretaire : function(numSemaine, targetElement){
        var td, jour, creneau, div, divDialog, divModal, divBody, close, lecons, ajoutCode,
            nav, navCode, boutonCode, navConduite, boutonConduite, navGestion, boutonGestion, contentPopup;

        td = targetElement;
        jour = td.getAttribute("jour");
        creneau = td.getAttribute("creneau");

        div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "modal fade"}, {nomAttribut : "id", valeurAttribute : "myPopUp"}, {nomAttribut : "role", valeurAttribute : "dialog"}, {nomAttribut : "aria-hidden", valeurAttribute : "true"});
        divDialog = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "modal-dialog"});
        divModal = domHelp.addElement(divDialog, "div", {nomAttribut : "class", valeurAttribute : "modal-content"});
        divBody = domHelp.addElement(divModal, "div", {nomAttribut : "class", valeurAttribute : "modal-body"});

        close = domHelp.addElement(divBody,"span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-circle col-sm-offset-11 btn-close elt-clickable"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        close.addEventListener("click", function () {
            page.clear();
            page.secretaire(numSemaine);
        }, false);

        nav = domHelp.addElement(divBody,"div", {nomAttribut : "class", valeurAttribute : "btn-group btn-group-justified nav-popup"});
        navCode = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonCode = domHelp.addElement(navCode, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonCode, "Ajout Leçon de Code");
        navConduite = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonConduite = domHelp.addElement(navConduite, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonConduite, "Ajout Leçon de Conduite");
        navGestion = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonGestion = domHelp.addElement(navGestion, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonGestion, "Gestion des leçons");

        ajoutCode = true;
        lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        for(var i=0; i<lecons.length; i++){
            if(lecons[i] instanceof calendrier.LeconCode){
                boutonCode.setAttribute("disabled", "disabled");
                ajoutCode = false;
            }
        }

        contentPopup = domHelp.addElement(divBody, "div");
        if(ajoutCode) {
            popup.contentAjoutCodeBySecretaire(contentPopup, numSemaine, jour, creneau);
        }
        else{
            popup.contentAjoutConduiteBySecretaire(contentPopup, numSemaine, jour, creneau);
        }
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
        var td, jour, creneau, div, divDialog, divModal, divBody, close, lecons, ajoutCode, ajoutConduite,
            nav, navCode, boutonCode, navConduite, boutonConduite, navGestion, boutonGestion, contentPopup;

        td = targetElement;
        while(td.nodeName != "TD"){
            td = targetElement.parentNode;
        }
        jour = td.getAttribute("jour");
        creneau = td.getAttribute("creneau");

        div = domHelp.addElement(document.getElementById('content'), "div", {nomAttribut : "class", valeurAttribute : "modal fade"}, {nomAttribut : "id", valeurAttribute : "myPopUp"}, {nomAttribut : "role", valeurAttribute : "dialog"}, {nomAttribut : "aria-hidden", valeurAttribute : "true"});
        divDialog = domHelp.addElement(div, "div", {nomAttribut : "class", valeurAttribute : "modal-dialog"});
        divModal = domHelp.addElement(divDialog, "div", {nomAttribut : "class", valeurAttribute : "modal-content"});
        divBody = domHelp.addElement(divModal, "div", {nomAttribut : "class", valeurAttribute : "modal-body"});

        close = domHelp.addElement(divBody,"span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-circle col-sm-offset-11 btn-close elt-clickable"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        close.addEventListener("click", function () {
            page.clear();
            page.moniteur(numSemaine);
        }, false);

        nav = domHelp.addElement(divBody,"div", {nomAttribut : "class", valeurAttribute : "btn-group btn-group-justified nav-popup"});
        navCode = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonCode = domHelp.addElement(navCode, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonCode, "Ajout Leçon de Code");
        navConduite = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonConduite = domHelp.addElement(navConduite, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonConduite, "Ajout Leçon de Conduite");
        navGestion = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        boutonGestion = domHelp.addElement(navGestion, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonGestion, "Gestion des leçons");

        ajoutCode = true;
        ajoutConduite = true;
        lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        for(var i=0; i<lecons.length; i++){
            if(lecons[i] instanceof calendrier.LeconCode){
                boutonCode.setAttribute("disabled", "disabled");
                ajoutCode = false;
            }
            else if(lecons[i] instanceof calendrier.LeconConduite && lecons[i].moniteur == application.users[application.userConnected].cle){
                boutonConduite.setAttribute("disabled", "disabled");
                ajoutConduite = false;
            }
        }

        contentPopup = domHelp.addElement(divBody, "div");
        if(ajoutCode) {
            popup.contentAjoutCodeByMoniteur(contentPopup, numSemaine, jour, creneau);
        }
        else if(ajoutConduite) {
            popup.contentAjoutConduiteByMoniteur(contentPopup, numSemaine, jour, creneau);
        }
        else{
            popup.contentGestionLeconsByMoniteur(contentPopup, numSemaine, jour, creneau);
        }
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
        var form, divMoniteur, labelMoniteur, divInputMoniteur, selectMoniteur, optionMoniteur, button, aLecon, lecons, moniteur;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        divMoniteur = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        labelMoniteur = domHelp.addElement(divMoniteur, "label", {nomAttribut : "for", valeurAttribute : "sMoniteur"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(labelMoniteur, "Nom du moniteur :");
        divInputMoniteur = domHelp.addElement(divMoniteur, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        selectMoniteur =  domHelp.addElement(divInputMoniteur, "select", {nomAttribut : "name", valeurAttribute : "moniteur", nomAttribut : "class", valeurAttribute : "form-control"});
        for (var i=0; i<application.users.length; i++) {
            if (application.users[i].role == "Moniteur") {
                aLecon = false;
                lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
                for(var j=0; j<lecons.length; j++){
                    moniteur = tools.getUserIfExist(lecons[j].moniteur);
                    if(moniteur == application.users[i]){
                        aLecon = true;
                    }
                }
                if(!aLecon){
                    optionMoniteur = domHelp.addElement(selectMoniteur, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(optionMoniteur, (application.users[i].civilite + " " + application.users[i].nom + " " + application.users[i].prenom));
                }
            }
        }

        button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var idMoniteur = selectMoniteur.options[selectMoniteur.selectedIndex].value;
            lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
            lecons.push(new calendrier.LeconCode(application.users[idMoniteur].cle));
            dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            page.clear();
            page.secretaire(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentAjoutCodeByMoniteur : function(div, numSemaine, jour, creneau){
        var form, button;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-4"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
            lecons.push(new calendrier.LeconCode(application.users[application.userConnected].cle));
            dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            page.clear();
            page.moniteur(numSemaine);
        };
        domHelp.addText(button, "Ajouter une leçon de code");
    },

    contentAjoutConduiteBySecretaire : function(div, numSemaine, numJour, numCreneau){
        var form, divCheckBox, labelCheckBox, checkBoxClientDispo, divClient, labelClient, divInputClient, selectClient, clientsDispo, optionClient,
            divMoniteur, labelMoniteur, divInputMoniteur, selectMoniteur, aLecon, optionMoniteur, table, button, lecons, moniteur, client;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        divCheckBox = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "check-form checkbox col-sm-offset-4"});
        labelCheckBox = domHelp.addElement(divCheckBox, "label");
        checkBoxClientDispo =  domHelp.addElement(labelCheckBox, "input", {nomAttribut : "type", valeurAttribute : "checkbox"}, {nomAttribut : "name", valeurAttribute : "sClient"});
        domHelp.addText(labelCheckBox, "Montrer seulement les clients disponibles");

        divClient = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        labelClient = domHelp.addElement(divClient, "label", {nomAttribut : "for", valeurAttribute : "sClient"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(labelClient, "Nom du client :");
        divInputClient = domHelp.addElement(divClient, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        selectClient =  domHelp.addElement(divInputClient, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});

        checkBoxClientDispo.addEventListener("click", function(){
            divInputClient.innerHTML = "";
            if(!checkBoxClientDispo.checked){
                selectClient = domHelp.addElement(divInputClient, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[selectMoniteur.options[selectMoniteur.selectedIndex].value].cle);
                selectClient.addEventListener("keyup", function(){tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[selectMoniteur.options[selectMoniteur.selectedIndex].value].cle)});
            }
            else {
                clientsDispo = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].clientsDisponibles;
                selectClient = domHelp.addElement(divInputClient, "select", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "id", valeurAttribute : "user"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                for(var i=0; i<clientsDispo.length; i++){
                    client = tools.getUserIfExist(clientsDispo[i]);
                    optionClient = domHelp.addElement(selectClient, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(optionClient, client.nom + " " + client.prenom);
                }
            }
        }, false);

        divMoniteur = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        labelMoniteur = domHelp.addElement(divMoniteur, "label", {nomAttribut : "for", valeurAttribute : "sMoniteur"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(labelMoniteur, "Nom du moniteur :");
        divInputMoniteur = domHelp.addElement(divMoniteur, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        selectMoniteur =  domHelp.addElement(divInputMoniteur, "select", {nomAttribut : "name", valeurAttribute : "moniteur", nomAttribut : "class", valeurAttribute : "form-control"});
        selectMoniteur.addEventListener("change", function(){
            tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[selectMoniteur.options[selectMoniteur.selectedIndex].value].cle);
        });
        for (var i=0; i<application.users.length; i++) {
            if (application.users[i].role == "Moniteur") {
                aLecon = false;
                lecons = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons;
                for(var j=0; j<lecons.length; j++){
                    moniteur = tools.getUserIfExist(lecons[j].moniteur);
                    if(moniteur == application.users[i]){
                        aLecon = true;
                    }
                }
                if(!aLecon){
                    optionMoniteur = domHelp.addElement(selectMoniteur, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(optionMoniteur, (application.users[i].civilite + " " + application.users[i].nom + " " + application.users[i].prenom));
                }
            }
        }

        table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[selectMoniteur.options[selectMoniteur.selectedIndex].value].cle);
        selectClient.addEventListener("keyup", function(){tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[selectMoniteur.options[selectMoniteur.selectedIndex].value].cle)});

        button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var radios, idUser, idMoniteur, creneau, idSelect, idUser;

            radios = document.getElementsByName('user');
            idUser = -1;
            idMoniteur = selectMoniteur.options[selectMoniteur.selectedIndex].value;
            creneau = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau];
            if(checkBoxClientDispo.checked){
                idSelect = document.getElementById('user').value;
                idUser = tools.getIndexOfUserIfExist(creneau.clientsDisponibles[idSelect]);
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
                creneau.lecons.push(new calendrier.LeconConduite(application.users[idMoniteur].cle, application.users[idUser].cle));
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            }
            page.clear();
            page.secretaire(numSemaine);
        };

        domHelp.addText(button, "Ajouter");
    },

    contentAjoutConduiteByMoniteur : function(div, numSemaine, numJour, numCreneau){
        var form, divCheckBox, labelCheckBox, checkBoxClientDispo, divClient, labelClient, divInputClient, selectClient,
            clientsDispo, optionClient, table, button, client;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});

        divCheckBox = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "check-form checkbox col-sm-offset-4"});
        labelCheckBox = domHelp.addElement(divCheckBox, "label");
        checkBoxClientDispo =  domHelp.addElement(labelCheckBox, "input", {nomAttribut : "type", valeurAttribute : "checkbox"}, {nomAttribut : "name", valeurAttribute : "sClient"});
        domHelp.addText(labelCheckBox, "Montrer seulement les clients disponibles");

        divClient = domHelp.addElement(form, "div", {nomAttribut : "class", valeurAttribute : "form-group"});
        labelClient = domHelp.addElement(divClient, "label", {nomAttribut : "for", valeurAttribute : "sClient"}, {nomAttribut : "class", valeurAttribute : "col-sm-4 control-label"});
        domHelp.addText(labelClient, "Nom du client :");
        divInputClient = domHelp.addElement(divClient, "div", {nomAttribut : "class", valeurAttribute : "col-sm-8"});
        selectClient =  domHelp.addElement(divInputClient, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});

        checkBoxClientDispo.addEventListener("click", function(){
            divInputClient.innerHTML = "";
            if(!checkBoxClientDispo.checked){
                selectClient = domHelp.addElement(divInputClient, "input", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[application.userConnected].cle);
                selectClient.addEventListener("keyup", function(){tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[application.userConnected].cle)});
            }
            else {
                clientsDispo = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].clientsDisponibles;
                selectClient = domHelp.addElement(divInputClient, "select", {nomAttribut : "type", valeurAttribute : "search"}, {nomAttribut : "name", valeurAttribute : "sClient"}, {nomAttribut : "id", valeurAttribute : "user"}, {nomAttribut : "placeholder", valeurAttribute : "Nom client"}, {nomAttribut : "class", valeurAttribute : "form-control"});
                for(var i=0; i<clientsDispo.length; i++){
                    client = tools.getUserIfExist(clientsDispo[i])
                    optionClient = domHelp.addElement(selectClient, "option", {nomAttribut: "value", valeurAttribute: i});
                    domHelp.addText(optionClient, client.nom + " " + client.prenom);
                }
            }
        }, false);

        table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        selectClient.addEventListener("keyup", function(){tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[application.userConnected].cle)});
        tools.choiceClient(3, selectClient, table, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau].lecons, application.semaines[numSemaine].jours[numJour].creneaux[numCreneau], application.users[application.userConnected].cle);

        button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"}, {nomAttribut : "data-dismiss", valeurAttribute : "modal"});
        button.onclick = function() {
            var radios, idUser, creneau, creneau, idSelect;

            radios = document.getElementsByName('user');
            idUser = -1;
            creneau = application.semaines[numSemaine].jours[numJour].creneaux[numCreneau];
            if(checkBoxClientDispo.checked){
                idSelect = document.getElementById('user').value;
                idUser = tools.getIndexOfUserIfExist(creneau.clientsDisponibles[idSelect].cle);
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
                creneau.lecons.push(new calendrier.LeconConduite(application.users[application.userConnected].cle, application.users[idUser].cle));
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            }
            page.clear();
            page.moniteur(numSemaine);
        };

        domHelp.addText(button, "Ajouter");
    },

    contentGestionLeconsBySecretaire : function(div, numSemaine, jour, creneau){
        var form, lecons, table, tbody, tr, td, th, span, select, option, moniteur, client;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        tbody = domHelp.addElement(table, "tbody");
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
            moniteur = tools.getUserIfExist(lecons[i].moniteur);
            tr = domHelp.addElement(tbody,"tr");
            if(lecons[i] instanceof calendrier.LeconConduite){
                client = tools.getUserIfExist(lecons[i].client);
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de conduite");
                td = domHelp.addElement(tr, "td");
                select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        aLecon = false;
                        for(var k=0; k<lecons.length; k++){
                            moniteur = tools.getUserIfExist(lecons[k].moniteur);
                            if(lecons[k].moniteur == application.users[j].cle && i!=k){
                                aLecon = true;
                            }
                        }
                        if(!aLecon){
                            option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                            domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        }
                        if(application.users[j] == moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }

                select.addEventListener("change", function(e){
                    var targetElement, nodeSelect, idMoniteur, idLecon;

                    targetElement = e.target || e.srcElement;
                    var nodeSelect = targetElement;
                    while(nodeSelect.nodeName != "SELECT"){
                        nodeSelect = targetElement.parentNode;
                    }

                    idMoniteur = nodeSelect.options[nodeSelect.selectedIndex].value;
                    idLecon = nodeSelect.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur].cle;
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLeconsBySecretaire(div,numSemaine,jour,creneau);
                });

                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, client.nom + " " + client.prenom);
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            else{
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de code")
                td = domHelp.addElement(tr, "td");
                select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        aLecon = false;
                        for(var k=0; k<lecons.length; k++){
                            moniteur = tools.getUserIfExist(lecons[k].moniteur);
                            if(moniteur == application.users[j] && lecons[i]!=lecons[k]){
                                aLecon = true;
                            }
                        }
                        if(!aLecon){
                            option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                            domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        }
                        if(application.users[j] == moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }

                select.addEventListener("change", function(e){
                    var targetElement, nodeSelect, idMoniteur, idLecon;

                    var targetElement = e.target || e.srcElement;
                    var nodeSelect = targetElement;
                    while(nodeSelect.nodeName != "SELECT"){
                        nodeSelect = targetElement.parentNode;
                    }

                    idMoniteur = nodeSelect.options[nodeSelect.selectedIndex].value;
                    idLecon = nodeSelect.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur].cle;
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
                var targetElement, td;

                targetElement = e.target || e.srcElement;
                td = targetElement;
                while(td.nodeName != "TD"){
                    td = targetElement.parentNode;
                }

                lecons.splice(td.getAttribute("idLecon"), 1);
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                div.innerHTML = "";
                popup.contentGestionLeconsBySecretaire(div,numSemaine,jour,creneau);
            }, false);
        }
    },

    contentGestionLeconsByMoniteur : function(div, numSemaine, jour, creneau){
        var form, lecons, table, tbody, tr, td, th, span, select, option, moniteur, client;

        form = domHelp.addElement(div, "form", {nomAttribut : "class", valeurAttribute : "form-horizontal"}, {nomAttribut : "onSubmit", valeurAttribute : "return false;"});
        lecons = application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons;
        table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        tbody = domHelp.addElement(table, "tbody");
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
            moniteur = tools.getUserIfExist(lecons[i].moniteur);
            tr = domHelp.addElement(tbody,"tr");
            if(lecons[i] instanceof calendrier.LeconConduite){
                client = tools.getUserIfExist(lecons[i].client);
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de conduite");
                td = domHelp.addElement(tr, "td");
                select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == lecons[i].moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    var targetElement, nodeSelect, idMoniteur, idLecon;

                    targetElement = e.target || e.srcElement;
                    nodeSelect = targetElement;
                    while(nodeSelect.nodeName != "SELECT"){
                        nodeSelect = targetElement.parentNode;
                    }

                    idMoniteur = nodeSelect.options[nodeSelect.selectedIndex].value;
                    idLecon = nodeSelect.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur].cle;
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLeconsByMoniteur(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, client.nom + " " + client.prenom);
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            else if(lecons[i] instanceof calendrier.LeconCode){
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "Leçon de code")
                td = domHelp.addElement(tr, "td");
                select =  domHelp.addElement(td, "select", {nomAttribut : "name", valeurAttribute : "moniteur"}, {nomAttribut : "class", valeurAttribute : "form-control"}, {nomAttribut : "idLecon", valeurAttribute : i});
                for (var j=0; j<application.users.length; j++) {
                    if (application.users[j].role == "Moniteur") {
                        option = domHelp.addElement(select, "option", {nomAttribut: "value", valeurAttribute: j});
                        domHelp.addText(option, application.users[j].nom + " " + application.users[j].prenom);
                        if(application.users[j] == moniteur) {
                            option.setAttribute("selected", "selected");
                        }
                    }
                }
                select.addEventListener("change", function(e){
                    var targetElement, nodeSelect, idMoniteur, idLecon;

                    targetElement = e.target || e.srcElement;
                    nodeSelect = targetElement;
                    while(nodeSelect.nodeName != "SELECT"){
                        nodeSelect = targetElement.parentNode;
                    }

                    idMoniteur = nodeSelect.options[nodeSelect.selectedIndex].value;
                    idLecon = nodeSelect.getAttribute("idLecon");
                    lecons[idLecon].moniteur = application.users[idMoniteur].cle;
                    dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                    div.innerHTML = "";
                    popup.contentGestionLeconsByMoniteur(div,numSemaine,jour,creneau);
                });
                td = domHelp.addElement(tr, "td");
                domHelp.addText(td, "");
                td = domHelp.addElement(tr, "td", {nomAttribut : "class", valeurAttribute : "elt-clickable"}, {nomAttribut : "idLecon", valeurAttribute : i});
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-sign"});
            }
            td.addEventListener("click", function(e){
                var targetElement, td;

                targetElement = e.target || e.srcElement;
                td = targetElement;
                while(td.nodeName != "TD"){
                    td = targetElement.parentNode;
                }
                lecons.splice(td.getAttribute("idLecon"), 1);
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                div.innerHTML = "";
                popup.contentGestionLeconsByMoniteur(div,numSemaine,jour,creneau);
            }, false);
        }
    }
}