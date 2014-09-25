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

window.onload = function () {
//    var appli = new application.Screen();

    application.addClient ("user1", new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr",""));
    application.addClient ("user2", new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr",""));
    application.addMoniteur ("user3", new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr"));
    application.addSecretaire ("user4", new utilisateur.Secretaire("M.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr"));

    if(typeof localStorage!='undefined') {
        // Récupération de la valeur dans web storage
        for(var i=0; i<localStorage.length; i++) {
            var user = domHelp.addElement(document.getElementById('content'), "p");
            domHelp.addText(user,localStorage.key(i));

        }
    } else {
        alert("localStorage n'est pas supporté");
    }
};