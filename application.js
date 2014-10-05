application = {
    users : [],
    semaines : [],
    userConnected : null
};

view = {
    accueil : function() {
        affichage.printFormLogin(application.users, ["role", "civilite", "nom", "prenom"]);
    },
    client : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3")
        domHelp.addText(title, "Client")
        affichage.printAgenda(0);
    },
    moniteur : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3")
        domHelp.addText(title, "Moniteur");
    },
    secretaire : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3")
        domHelp.addText(title, "Secrétaire");
    },
    clear : function() {
        this.body=document.getElementById('content').innerHTML = "";
    }
}

dao = {
    addClient : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    addMoniteur : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    addSecretaire : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    addSemaine : function(cle,semaine) {
        localStorage.setItem(cle,JSON.stringify(semaine));
    }
}