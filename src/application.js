/*
 Package qui contient les différentes variables de l'application :
 - users : contient les utilisateurs de l'application (de type Personne)
 - semaines : contient les semaines, jours et reservations de l'application
 - userConnected : contient l'index de l'utilisateur connecté (index de users)
 - semaineCourante : contient l'index de la semaine en cours dans l'affichage (index de semaines)
 */
application = {
    users : [],
    semaines : [],
    userConnected : 0,
    semaineCourante : 0
};

/*
 Package qui contient Les différentes pages de l'application : elles appellent les différentes vues.
 */
page = {
    // Représente la page d'accueil.
    accueil : function() {
        view.printFormLogin(application.users, ["role", "civilite", "nom", "prenom"]);
    },
    // Représente la page permettant d'ajouter un utilisateur.
    ajoutUtilisateur : function() {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Ajouter un utilisateur");
        view.printAjoutUtilisateur();
    },
    // Représente la page contenant l'agenda pour un client connecté.
    client : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Client");
        view.printFlechesChgtSemaine(page.client, semaine);
        view.printAgendaClient(semaine);
    },
    // Représente la page contenant l'agenda pour un moniteur connecté.
    moniteur : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Moniteur");
        view.printFlechesChgtSemaine(page.moniteur, semaine);
        view.printAgendaMoniteur(semaine);
    },
    // Représente la page contenant l'agenda pour une secrétaire connectée.
    secretaire : function(semaine) {
        var title = domHelp.addElement(document.getElementById('content'), "h3");
        domHelp.addText(title, "Secrétaire");
        view.printFlechesChgtSemaine(page.secretaire, semaine);
        tools.printLegendeMoniteur();
        view.printAgendaSecretaire(semaine);
    },
    // Méthode pour vider la page
    clear : function() {
        this.body=document.getElementById('content').innerHTML = "";
    }
};

/*
 Data Access Object : Contient toutes les méthodes d'accès à la BDD.
 */
dao = {
    // Initialise la base avec quelques valeurs
    init : function() {
        var user1 = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        this.createUtilisateur(user1);
        var user2 = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        this.createUtilisateur(user2);
        this.createUtilisateur(new utilisateur.Moniteur("Mme.", "Jacquart", "Jocelyne", "21 rue du plat pays", "Lille", "06.41.67.74.92", "jocelyne.jacquart@mail.fr", "#BAF8E3"));
        this.createUtilisateur(new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr"));
        this.createUtilisateur(new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr", user2.cle));
        this.createUtilisateur(new utilisateur.Client("M.", "Vanneste", "Jules", "9 Rue Beaumarchais", "Arras", "06.84.26.70.39", "jules.vanneste@mail.fr", user1.cle));
    },
    // Ajoute un utilisateur dans la base
    addUtilisateur : function(user) {
        localStorage.setItem(user.cle,JSON.stringify(user));
    },
    // Ajoute une semaine dans la base
    addSemaine : function(semaine) {
        localStorage.setItem(semaine.cle,JSON.stringify(semaine));
    },
    // Ajoute un utilisateur dans la base après lui avoir assigné une nouvelle clé.
    createUtilisateur : function(user) {
        user.cle = "user" + utilisateur.cptUtilisateurs;
        utilisateur.cptUtilisateurs = utilisateur.cptUtilisateurs + 1;
        localStorage.setItem("cptUtilisateurs", utilisateur.cptUtilisateurs);
        localStorage.setItem(user.cle,JSON.stringify(user));
    },
    // Ajoute une semaine dans la base après lui avoir assigné une nouvelle clé.
    createSemaine : function(semaine) {
        semaine.cle = "semaine" + calendrier.cptSemaines;
        calendrier.cptSemaines = calendrier.cptSemaines + 1;
        localStorage.setItem("cptSemaines", JSON.stringify(calendrier.cptSemaines));
        localStorage.setItem(semaine.cle,JSON.stringify(semaine));
    },
    // supprime un utilisateur dans la base.
    deleteUtilisateur : function(cle) {
        localStorage.removeItem(cle);
    },
    // supprime une semaine dans la base.
    deleteSemaine : function(cle) {
        localStorage.removeItem(cle);
    },
    // modifie un utilisateur dans la base.
    setUtilisateur : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    // modifie une semaine dans la base.
    setSemaine : function(cle,semaine) {
        localStorage.setItem(cle,JSON.stringify(semaine));
    },
    // Vide la base.
    clear : function(){
        localStorage.clear();
    }
};