popup = {
    ajoutBySecretaire : function(div, numSemaine, targetElement){
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

        var close = domHelp.addElement(div,"span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-remove-circle col-sm-offset-11 btn-close elt-clickable"});
        close.addEventListener("click", function () {
            page.clear();
            page.secretaireSemaine(numSemaine);
        }, false);

        var nav = domHelp.addElement(div,"div", {nomAttribut : "class", valeurAttribute : "btn-group btn-group-justified nav-popup"});
        var navCode = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonCode = domHelp.addElement(navCode, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonCode, "Ajout Leçon de Code");
        var navConduite = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonConduite = domHelp.addElement(navConduite, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonConduite, "Ajout Leçon de Conduite");
        var navGestion = domHelp.addElement(nav,"div", {nomAttribut : "class", valeurAttribute : "btn-group"});
        var boutonGestion = domHelp.addElement(navGestion, "button", {nomAttribut : "type", valeurAttribute : "button"}, {nomAttribut : "class", valeurAttribute : "btn btn-default"});
        domHelp.addText(boutonGestion, "Gestion des leçons");

        var contentPopup = domHelp.addElement(div, "div");
        popup.contentAjoutCode(contentPopup,numSemaine,jour,creneau);
        boutonCode.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutCode(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonConduite.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentAjoutConduite(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonGestion.addEventListener("click", function () {
            contentPopup.innerHTML="";
            popup.contentGestionLecons(contentPopup,numSemaine,jour,creneau);
        }, false);
        boutonCode.focus();
    },

    contentAjoutCode : function(div, numSemaine, jour, creneau){
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

        var button = domHelp.addElement(form, "button", {nomAttribut : "type", valeurAttribute : "submit"}, {nomAttribut : "class", valeurAttribute : "btn btn-success col-sm-offset-5"});
        button.onclick = function() {
            var idMoniteur = sMoniteur.options[sMoniteur.selectedIndex].value;
            application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons.push(new calendrier.LeconCode(application.users[idMoniteur]));
            dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            page.clear();
            page.secretaireSemaine(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentAjoutConduite : function(div, numSemaine, jour, creneau){
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

        var table = domHelp.addElement(form, "table", {nomAttribut : "class", valeurAttribute : "table table-striped"});
        sClient.addEventListener("keyup", function(){view.choiceClient(3, sClient, table, application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons)});

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
                application.semaines[numSemaine].jours[jour].creneaux[creneau].lecons.push(new calendrier.LeconConduite(application.users[idMoniteur], application.users[idUser]));
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
            }
            page.clear();
            page.secretaireSemaine(numSemaine);
        };
        domHelp.addText(button, "Ajouter");
    },

    contentGestionLecons : function(div, numSemaine, jour, creneau){
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
                    alert("OK1");
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
                alert("Suppression de " + td.getAttribute("idLecon"));
                lecons.splice(td.getAttribute("idLecon"), 1);
                dao.setSemaine(application.semaines[numSemaine].cle, application.semaines[numSemaine]);
                div.innerHTML = "";
                popup.contentGestionLecons(div,numSemaine,jour,creneau);
            }, false);
        }
    }
}