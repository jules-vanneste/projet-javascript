module("calendrier", {
//	setup:function(){alert("setup calendrier individual test");},
//	teardown:function(){alert("teardown calendrier individual test");}
});


test("test construct Creneau",3,function()
{
	var creneau = new calendrier.Creneau(8);
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);

	equal(creneau.heure,8);
	equal(creneau.clientsDisponibles.length,0);
	equal(creneau.lecons.length,0);
}
);


test("test construct Lecon",1,function()
{
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	var lecon = new calendrier.Lecon(moniteur);

	equal(lecon.moniteur,moniteur);
}
);


test("test construct LeconConduite",2,function()
{
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);
	var leconConduite = new calendrier.LeconConduite(moniteur, client);

	equal(leconConduite.moniteur,moniteur);
	equal(leconConduite.client,client);
}
);


test("test construct LeconCode",1,function()
{
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	var leconCode = new calendrier.LeconCode(moniteur);

	equal(leconCode.moniteur,moniteur);
}
);


test("test construct Jour",2,function()
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

test("test construct Semaine",3,function()
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