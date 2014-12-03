module("calendrier", {
//	setup:function(){alert("setup calendrier individual test");},
//	teardown:function(){alert("teardown calendrier individual test");}
});

test("test construct & getters Lecon",1,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var lecon = new calendrier.Lecon(moniteur);

        equal(lecon.moniteur,moniteur);
    }
);

test("test construct & getters LeconConduite",2,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);
        var leconConduite = new calendrier.LeconConduite(moniteur, client);

        equal(leconConduite.moniteur,moniteur);
        equal(leconConduite.client,client);
    }
);

test("test construct & getters LeconCode",1,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var leconCode = new calendrier.LeconCode(moniteur);

        equal(leconCode.moniteur,moniteur);
    }
);

test("test construct & getters Creneau",3,function()
    {
        var creneau = new calendrier.Creneau(8);

        equal(creneau.heure,8);
        equal(creneau.clientsDisponibles.length,0);
        equal(creneau.lecons.length,0);
    }
);

test("test construct & getters Creneau with client dispo & lecon code",3,function()
    {
        var creneau = new calendrier.Creneau(8);
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);

        var lecon = new calendrier.LeconCode(moniteur);

        creneau.clientsDisponibles.push(client);
        creneau.lecons.push(lecon);

        equal(creneau.heure,8);
        equal(creneau.clientsDisponibles[0],client);
        equal(creneau.lecons[0],lecon);
    }
);

test("test construct & getters Creneau with client dispo & lecon conduite",3,function()
    {
        var creneau = new calendrier.Creneau(8);
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);

        var lecon = new calendrier.LeconConduite(moniteur, client);

        creneau.clientsDisponibles.push(client);
        creneau.lecons.push(lecon);

        equal(creneau.heure,8);
        equal(creneau.clientsDisponibles[0],client);
        equal(creneau.lecons[0],lecon);
    }
);

test("test & getters construct Jour",2,function()
{
	var date = new Date();
	var creneaux = [];
    for(var j=0; j<nbCreneaux; j++){
        creneaux.push(new calendrier.Creneau(horaires[j]));
    }
	var jour = new calendrier.Jour(date, creneaux);

	equal(jour.date, date);
	equal(jour.creneaux, creneaux);
}
);

test("test construct & getters Semaine",3,function()
{
	var date = new Date(2014, 10, 29);
	var semaine = new calendrier.Semaine(date);

	equal(semaine.cle, null);
	ok(semaine.dateDebut, new Date(2014, 10, 24));
	equal(semaine.jours.length, nbJours+1);
}
);

test("test compteur",1,function()
{
	equal(calendrier.cptSemaines,0);
}
);

test("test setters Lecon",1,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var lecon = new calendrier.Lecon(moniteur);

        var moniteur2 = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        lecon.moniteur = moniteur2;

        equal(lecon.moniteur,moniteur2);
    }
);

test("test setters LeconConduite",2,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);
        var leconConduite = new calendrier.LeconConduite(moniteur, client);

        var moniteur2 = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        var client2 = new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr", moniteur2);

        leconConduite.moniteur = moniteur2;
        leconConduite.client = client2;

        equal(leconConduite.moniteur,moniteur2);
        equal(leconConduite.client,client2);
    }
);

test("test setters LeconCode",1,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var leconCode = new calendrier.LeconCode(moniteur);

        var moniteur2 = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        leconCode.moniteur = moniteur2;

        equal(leconCode.moniteur,moniteur2);
    }
);

test("test setters Creneau",5,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);
        var creneau = new calendrier.Creneau(8);
        var lecon = new calendrier.LeconCode(moniteur);

        creneau.heure = 20;
        creneau.clientsDisponibles = [client];
        creneau.lecons = [lecon];
        equal(creneau.heure,20);
        equal(creneau.clientsDisponibles.length,1);
        equal(creneau.lecons.length,1);
        equal(creneau.clientsDisponibles[0],client);
        equal(creneau.lecons[0],lecon);
    }
);

test("test setters Jour",2,function()
    {
        var date = new Date();
        var creneaux = [];
        for(var j=0; j<5; j++){
            creneaux.push(new calendrier.Creneau(horaires[j]));
        }
        var jour = new calendrier.Jour(date, creneaux);

        var date2 = new Date(2014,10,10);
        var creneaux2 = [];
        var horaires2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(var j=0; j<5; j++){
            creneaux2.push(new calendrier.Creneau(horaires2[j]));
        }
        jour.date = date2;
        jour.creneaux = creneaux2;

        equal(jour.date, date2);
        equal(jour.creneaux, creneaux2);
    }
);

test("test setters Semaine",4,function()
    {
        var date = new Date(2014, 10, 29);
        var semaine = new calendrier.Semaine(date);

        var date2 = new Date(2014, 10, 19);
        var jours2 = [];

        for(var i=0; i<5; i++){
            var creneaux2 = [];
            var horaires2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for(var j=0; j<5; j++){
                creneaux2.push(new calendrier.Creneau(horaires2[j]));
            }
            var now = new Date(date2);
            now.setDate(now.getDate() + i);
            jours2.push(new calendrier.Jour(now, creneaux2, horaires2));
        }

        semaine.cle = "semaine5"
        semaine.dateDebut = date2;
        semaine.jours = jours2;

        equal(semaine.cle, "semaine5");
        equal(semaine.dateDebut, date2);
        equal(semaine.jours.length, 5);
        equal(semaine.jours[0], jours2[0]);
    }
);