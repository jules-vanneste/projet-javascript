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
    init : function() {
        var tmp = new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr","");
        tmp.addInDAO();
        var tmp = new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr","");
        tmp.addInDAO();
        var tmp = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        tmp.addInDAO();
        var tmp = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        tmp.addInDAO();
        var tmp = new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr");
        tmp.addInDAO();
        //tmp = new calendrier.Semaine(new Date(2014, 9, 6), new Date(2014, 9, 12));
        //tmp.addInDAO();
    },
    setUtilisateur : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    setSemaine : function(cle,semaine) {
        localStorage.setItem(cle,JSON.stringify(semaine));
    },
    clear : function(){
        localStorage.clear();
    }
}