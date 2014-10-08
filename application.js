application = {
    users : [],
    semaines : [],
    userConnected : null
};

page = {
    accueil : function() {
        view.printFormLogin(application.users, ["role", "civilite", "nom", "prenom"]);
    },
    client : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Client");
        view.printAgendaClient(0);
    },
    clientSemaine : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Client");
        view.printAgendaClient(semaine);
    },
    moniteur : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Moniteur");
        view.printAgendaMoniteur(0);
    },
    moniteurSemaine : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Moniteur");
        view.printAgendaMoniteur(semaine);
    },
    secretaire : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Secrétaire");
        view.printAgendaSecretaire(0);
    },
    secretaireSemaine : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Secrétaire");
        view.printAgendaSecretaire(semaine);
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