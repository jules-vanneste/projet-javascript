module("utilisateur", {
//	setup:function(){alert("setup utilisateur individual test");},
//	teardown:function(){alert("teardown utilisateur individual test");}
});

test("test construct & getters Personne",8,function()
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


test("test construct & getters Moniteur",9,function()
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


test("test construct & getters Client",9,function()
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

test("test construct & getters Secretaire",8,function()
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

test("test setters Personne",8,function()
    {
        var personne = new utilisateur.Personne("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "03.21.59.76.94",
            "jules.vanneste@mail.fr", "Personne");

        personne.civilite = "Mme";
        personne.nom = "Bouquet";
        personne.prenom = "Juliette";
        personne.adresse = "5 rue des fleurs";
        personne.ville = "Lille";
        personne.telephone = "06.84.56.98.65";
        personne.mail = "juliette.bouquet@mail.fr";
        personne.role = "Secretaire";

        ok(personne.civilite,"Mme");
        ok(personne.nom,"Bouquet");
        ok(personne.prenom,"Juliette");
        ok(personne.adresse,"5 rue des fleurs");
        ok(personne.ville,"Lille");
        ok(personne.telephone,"06.84.56.98.65");
        ok(personne.mail,"juliette.bouquet@mail.fr");
        ok(personne.role,"Secretaire");
    }
);


test("test setters Moniteur",9,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");

        moniteur.civilite = "Mme";
        moniteur.nom = "Bouquet";
        moniteur.prenom = "Juliette";
        moniteur.adresse = "5 rue des fleurs";
        moniteur.ville = "Lille";
        moniteur.telephone = "06.84.56.98.65";
        moniteur.mail = "juliette.bouquet@mail.fr";
        moniteur.couleur = "F2F2F2";
        moniteur.role = "Secretaire";

        ok(moniteur.civilite,"Mme");
        ok(moniteur.nom,"Bouquet");
        ok(moniteur.prenom,"Juliette");
        ok(moniteur.adresse,"5 rue des fleurs");
        ok(moniteur.ville,"Lille");
        ok(moniteur.telephone,"06.84.56.98.65");
        ok(moniteur.mail,"juliette.bouquet@mail.fr");
        ok(moniteur.couleur,"#F2F2F2");
        ok(moniteur.role,"Secretaire");
    }
);


test("test setters Client",9,function()
    {
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        var client = new utilisateur.Client("Mr.", "Vanneste", "Jules", "15 rue des ecoles", "Plouvain", "0321597694", "jules.vanneste@mail.fr", moniteur);

        var moniteur2 = new utilisateur.Moniteur("Mme.", "Zimny", "Francine", "43 rue de la France", "Oppy", "06.41.61.73.90", "francine.zimny@mail.fr", "#FCF8E3");
        client.civilite = "Mme";
        client.nom = "Bouquet";
        client.prenom = "Juliette";
        client.adresse = "5 rue des fleurs";
        client.ville = "Lille";
        client.telephone = "06.84.56.98.65";
        client.mail = "juliette.bouquet@mail.fr";
        client.moniteur = moniteur2;
        client.role = "Secretaire";

        ok(client.civilite,"Mme");
        ok(client.nom,"Bouquet");
        ok(client.prenom,"Juliette");
        ok(client.adresse,"5 rue des fleurs");
        ok(client.ville,"Lille");
        ok(client.telephone,"06.84.56.98.65");
        ok(client.mail,"juliette.bouquet@mail.fr");
        equal(client.moniteur,moniteur2);
        ok(client.role,"Secretaire");
    }
);

test("test construct Secretaire",8,function()
    {
        var secretaire = new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr")

        secretaire.civilite = "Mr.";
        secretaire.nom = "Carpentier";
        secretaire.prenom = "Thomas";
        secretaire.adresse = "15 Avenue de l'Europe";
        secretaire.ville = "Seclin";
        secretaire.telephone = "06.74.16.27.89";
        secretaire.mail = "thomas.carpentier@mail.fr";
        secretaire.role = "Moniteur";

        ok(secretaire.civilite,"Mr.");
        ok(secretaire.nom,"Carpentier");
        ok(secretaire.prenom,"Thomas");
        ok(secretaire.adresse,"15 Avenue de l'Europe");
        ok(secretaire.ville,"Seclin");
        ok(secretaire.telephone,"06.74.16.27.89");
        ok(secretaire.mail,"thomas.carpentier@mail.fr");
        ok(secretaire.role,"Moniteur");
    }
);