module("storage_test", {
//	setup:function(){alert("setup storage_test individual test");},
//	teardown:function(){alert("teardown storage_test individual test");}
});

test("test get moniteur by type",1,function()
{
    localStorage.clear();
    var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "T  homas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
    moniteur.cle = "user";
    localStorage.setItem(moniteur.cle,JSON.stringify(moniteur));

    var cle = localStorage.key(0);
    var res = getUserByType(cle);

    deepEqual(res, moniteur, "Creation correcte du Moniteur");
}
);

test("test get client by type",1,function()
    {
        localStorage.clear();
        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "T  homas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        moniteur.cle = "mon1";
        var client = new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr", moniteur.cle);
        client.cle = "client1";

        localStorage.setItem(moniteur.cle,JSON.stringify(moniteur));
        localStorage.setItem(client.cle,JSON.stringify(client));

        var cle = localStorage.key(0);
        var res = getUserByType(cle);

        deepEqual(res, client, "Creation correcte du Client");
    }
);

test("test get secretaire by type",1,function()
    {
        localStorage.clear();
        var secretaire = new utilisateur.Secretaire("Mme.", "Bouquet", "Juliette", "789 Rue Nationale", "Carvin", "06.56.38.78.99", "juliette.bouquet@mail.fr");
        secretaire.cle = "secretaire1";

        localStorage.setItem(secretaire.cle,JSON.stringify(secretaire));

        var cle = localStorage.key(0);
        var res = getUserByType(cle);

        deepEqual(res, secretaire, "Creation correcte de la Secretaire");
    }
);

test("test get semaine by type",1,function()
    {
        localStorage.clear();
        var semaine = new calendrier.Semaine(new Date(2014, 10, 29));

        var moniteur = new utilisateur.Moniteur("M.", "Carpentier", "T  homas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        moniteur.cle = "mon1";
        var client = new utilisateur.Client("M.", "Capolino", "Maxime", "150 Rue de Paris", "Annoeullin", "06.92.75.40.42", "maxime.capolino@mail.fr", moniteur.cle);
        client.cle = "client1";
        var lecon1 = new calendrier.LeconConduite(moniteur.cle, client.cle);
        var lecon2 = new calendrier.LeconCode(moniteur.cle);

        semaine.jours[0].creneaux[0].clientsDisponibles.push(client.cle);
        semaine.jours[0].creneaux[0].lecons.push(lecon1);
        semaine.jours[0].creneaux[1].lecons.push(lecon2);

        semaine.cle = "semaine10";

        dao.addUtilisateur(moniteur);
        dao.addUtilisateur(client);
        dao.addSemaine(semaine);
        init();

        var res = getSemaineByType(semaine.cle);

        deepEqual(res, semaine, "Creation correcte de la Semaine");
    }
);

test("test init",2,function()
    {
        localStorage.clear();
        var semaine = new calendrier.Semaine(new Date(2014, 10, 29));
        semaine.cle = "semaine1";
        dao.addSemaine(semaine);

        dao.init();
        init();

        equal(application.semaines.length, 2);
        equal(application.users.length, 6);
    }
);