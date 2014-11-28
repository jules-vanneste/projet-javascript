/*
 Code appelé au lancement de l'application.
 Il charges les différentes variables de l'application à partir de la BDD.
 Il fini par charger la page d'accueil.
 */
function getUserByType(cle) {
    var value = JSON.parse(localStorage.getItem(cle));
    var user;
    if (value.ctor === "Cli") {
        user = new utilisateur.Client(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail, value.data.moniteur);
        user.cle = value.data.cle;
        return user;
    }
    else if (value.ctor === "Mon") {
        user = new utilisateur.Moniteur(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail, value.data.couleur);
        user.cle = value.data.cle;
        return user;
    }
    else{
        user = new utilisateur.Secretaire(value.data.civilite, value.data.nom, value.data.prenom, value.data.adresse, value.data.ville, value.data.telephone, value.data.mail);
        user.cle = value.data.cle;
        return user;
    }
};

function getSemaineByType(cle) {
    var value = JSON.parse(localStorage.getItem(cle));
    var semaine =  new calendrier.Semaine(new Date(value.data.dateDebut));
    semaine.cle = value.data.cle;
    for(var i=0; i<value.data.jours.length; i++){
        for(var j=0; j<value.data.jours[i].creneaux.length; j++) {
            var k, client, moniteur;
            for(k=0; k<value.data.jours[i].creneaux[j].clientsDisponibles.length; k++){
                client = value.data.jours[i].creneaux[j].clientsDisponibles[k];
                semaine.jours[i].creneaux[j].clientsDisponibles.push(client);
            }
            for(k=0; k<value.data.jours[i].creneaux[j].lecons.length; k++){
                var lecon = value.data.jours[i].creneaux[j].lecons[k];
                if(value.data.jours[i].creneaux[j].lecons[k].ctor === "Con") {
                    moniteur = lecon.data.moniteur;
                    client = lecon.data.client;
                    semaine.jours[i].creneaux[j].lecons.push(new calendrier.LeconConduite(moniteur, client));
                }
                else if(value.data.jours[i].creneaux[j].lecons[k].ctor === "Cod"){
                    moniteur = lecon.data.moniteur;
                    semaine.jours[i].creneaux[j].lecons.push(new calendrier.LeconCode(moniteur));
                }
            }
        }
    }
    return semaine;
};

window.onload = function () {
    var cle, i;
    application.semaines = [];
    application.users = [];
    if (typeof localStorage!=='undefined') {
        // Récupération de la valeur dans web storage :
        for (i=0; i<localStorage.length; i++) {
            cle = localStorage.key(i);
            //On charge les entités des utilisateurs (Client, Moniteur, Secretaire) :
            var objet;
            if(cle.indexOf("user") !== -1){
                objet = JSON.parse(localStorage.getItem(cle), function(){
                    return getUserByType(cle);
                });
                application.users.push(objet);
            }
            //On charge les entités des Semaines avec leurs contenu et les références vers les clients qu'elles contiennent :
            else if(cle.indexOf("semaine") !== -1){
                objet = JSON.parse(localStorage.getItem(cle), function(){
                    return getSemaineByType(cle);
                });
                application.semaines.push(objet);
            }
            else if(cle.indexOf("cptSemaines") !== -1){
                calendrier.cptSemaines = JSON.parse(localStorage.getItem(cle));
            }
            else if(cle.indexOf("cptUtilisateurs") !== -1){
                utilisateur.cptUtilisateurs = JSON.parse(localStorage.getItem(cle));
            }
        }
    }

    var dateDebutSemaineCourante = new Date();
    var ajouter = true;
    dateDebutSemaineCourante.setDate(dateDebutSemaineCourante.getDate() - (dateDebutSemaineCourante.getDay() - 1));
    for(i=0; i<application.semaines.length; i++){
        if((application.semaines[i].dateDebut.getDate() === dateDebutSemaineCourante.getDate())
            && (application.semaines[i].dateDebut.getMonth() === dateDebutSemaineCourante.getMonth())
            && (application.semaines[i].dateDebut.getFullYear() === dateDebutSemaineCourante.getFullYear())) {
            application.semaineCourante = i;
            ajouter = false;
        }
    }
    if(ajouter){
        var semaine = new calendrier.Semaine(dateDebutSemaineCourante);
        application.semaines.push(semaine);
        dao.createSemaine(semaine);
        application.semaineCourante = (application.semaines.length - 1);
    }

    page.accueil();
};