application = {
    users : [],
    semaines : [],
    userConnected : 0,
    semaineCourante : 0
};

page = {
    accueil : function() {
        view.printFormLogin(application.users, ["role", "civilite", "nom", "prenom"]);
    },
    client : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Client");
        view.printAgendaClient(semaine);
    },
    moniteur : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Moniteur");
        view.printAgendaMoniteur(semaine);
    },
    secretaire : function(semaine) {
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
        this.addUtilisateur(new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr",""));
        this.addUtilisateur(new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr",""));
        this.addUtilisateur(new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7"));
        this.addUtilisateur(new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3"));
        this.addUtilisateur(new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr"));
    },
    addUtilisateur : function(user) {
        user.cle = "user" + utilisateur.cptUtilisateurs;
        utilisateur.cptUtilisateurs = utilisateur.cptUtilisateurs + 1;
        localStorage.setItem(user.cle,JSON.stringify(user));
    },
    addSemaine : function(semaine) {
        semaine.cle = "semaine" + calendrier.cptSemaines;
        calendrier.cptSemaines = calendrier.cptSemaines + 1;
        localStorage.setItem(semaine.cle,JSON.stringify(semaine));
    },
    deleteUtilisateur : function(cle,user) {
        localStorage.removeItem(user);
    },
    deleteSemaine : function(cle) {
        localStorage.removeItem(cle);
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