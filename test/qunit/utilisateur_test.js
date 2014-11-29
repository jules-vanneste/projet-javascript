module("utilisateur", {
//	setup:function(){alert("setup utilisateur individual test");},
//	teardown:function(){alert("teardown utilisateur individual test");}
});

test("test construct Personne",8,function()
{
	var personne = new utilisateur.Personne("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "03.21.59.76.94",
	 "jules.vanneste@mail.fr", "Personne");

	ok(personne.civilite,"Mr.");
	ok(personne.nom,"Vanneste");
	ok(personne.prenom,"Jules");
	ok(personne.adresse,"15 rue des ecoles");
	ok(personne.ville,"Plouvain");
	ok(personne.telephone,"03.21.59.76.94");
	ok(personne.mail,"jules.vanneste@mail.fr");
	ok(personne.role,"Personne");
}
);


test("test construct Moniteur",9,function()
{
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	 
	ok(moniteur.civilite,"Mr.");
	ok(moniteur.nom,"Carpentier");
	ok(moniteur.prenom,"Thomas");
	ok(moniteur.adresse,"15 Avenue de l'Europe");
	ok(moniteur.ville,"Seclin");
	ok(moniteur.telephone,"06.74.16.27.89");
	ok(moniteur.mail,"thomas.carpentier@mail.fr");
	ok(moniteur.couleur,"#D9EDF7");
	ok(moniteur.role,"Moniteur");
}
);


test("test construct Client",9,function()
{
	var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
	var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);
	 
	ok(client.civilite,"Mr.");
	ok(client.nom,"Vanneste");
	ok(client.prenom,"Jules");
	ok(client.adresse,"15 rue des ecoles");
	ok(client.ville,"Plouvain");
	ok(client.telephone,"0321597694");
	ok(client.mail,"jules.vanneste@mail.fr");
	equal(client.moniteur,moniteur);
	ok(client.role,"Client");
}
);

test("test construct Secretaire",8,function()
{
	var secretaire = new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr")
	 
	ok(secretaire.civilite,"Mme.");
	ok(secretaire.nom,"Bouquet");
	ok(secretaire.prenom,"Juliette");
	ok(secretaire.adresse,"789 Rue Nationale");
	ok(secretaire.ville,"Carvin");
	ok(secretaire.telephone,"06.56.38.78.99");
	ok(secretaire.mail,"juliette.bouquet@mail.fr");
	ok(secretaire.role,"Secrétaire");
}
);

test("test compteur",1,function()
{
	equal(utilisateur.cptUtilisateurs,0);
}
);