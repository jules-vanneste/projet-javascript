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
    }
};

affichage = {
    printObjectAsTable : function(objects, properties){
        var table = domHelp.addElement(document.getElementById('content'), "table");
        var tr = domHelp.addElement(table,"tr");
        var th;
        var td;
        for(i=0; i<properties.length; i++){
            th = domHelp.addElement(tr,"th");
            domHelp.addText(th, properties[i]);
        }
        for(i=0; i<objects.length; i++){
            tr = domHelp.addElement(table, "tr");
            for(j=0; j<properties.length; j++) {
                td = domHelp.addElement(tr,"td");
                domHelp.addText(td, objects[i][properties[j]]);
            }
        }
    },

    printObjectAsSelect : function(objects, properties){
        var form = domHelp.addElement(document.getElementById('content'), "form");
        var input;
        for(i=0; i<objects.length; i++){
            input = domHelp.addElement(form, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : i});
            for(j=0; j<properties.length; j++) {
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
        for(i=0; i<properties.length; i++){
            th = domHelp.addElement(tr,"th");
            domHelp.addText(th, properties[i]);
        }
        for(i=0; i<objects.length; i++){
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            input = domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : i});
            for(j=0; j<properties.length; j++) {
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
        var td;

        div.style.display = "none";
        th = domHelp.addElement(tr,"th");
        domHelp.addText(th, "");

        for(i=0; i<application.semaines[numSemaine].jours.length; i++){
            th = domHelp.addElement(tr,"th");
            var date = new Date(application.semaines[i].jours[i].date);
            domHelp.addText(th, date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
        }
        for(i=0; i<application.semaines[numSemaine].jours[0].creneaux.length; i++){
            tr = domHelp.addElement(tbody, "tr");
            td = domHelp.addElement(tr,"td");
            domHelp.addText(td, application.semaines[numSemaine].jours[0].creneaux[i].heure + "h");
            for(j=0; j<application.semaines[numSemaine].jours.length; j++){
                td = domHelp.addElement(tr,"td");
                td.onclick = function(){
                    if(div.style.display == "none"){
                        div.style.display = "block";
                    }
                    else{
                        div.style.display = "none";
                    }
                    var sClient = domHelp.addElement(div, "div", )
                    input = domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : i});

                };
                domHelp.addText(td, "");
            }
        }
    }
};

window.onload = function () {
    dao.addClient("user1", new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr",""));
    dao.addClient("user2", new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr",""));
    dao.addMoniteur("user3", new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr"));
    dao.addSecretaire("user4", new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr"));
    for(var i=0; i<10; i++){
        dao.addSemaine(("semaine" + i), new calendrier.Semaine(i, new Date(2014, 9, 6), new Date(2014, 9, 12)));
    }
    if(typeof localStorage!='undefined') {
        // Récupération de la valeur dans web storage
        for(var i=0; i<localStorage.length; i++) {
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