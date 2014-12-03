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