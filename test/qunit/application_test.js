module("application_test", {
//	setup:function(){alert("setup application_test individual test");},
//	teardown:function(){alert("teardown application_test individual test");}
});

test("test delete semaine",2,function()
    {
        localStorage.clear();
        var semaine = new calendrier.Semaine(new Date(2014,10,10));
        semaine.cle = "semaine1";
        dao.addSemaine(semaine);
        init();

        equal(application.semaines.length, 2);

        dao.deleteSemaine(semaine.cle);
        init();

        equal(application.semaines.length, 1);
    }
);

test("test delete user",2,function()
    {
        localStorage.clear();
        var user = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        user.cle = "user1";
        dao.addUtilisateur(user);
        init();

        equal(application.users.length, 1);

        dao.deleteUtilisateur(user.cle);
        init();

        equal(application.users.length, 0);
    }
);

test("test set semaine",1,function()
    {
        localStorage.clear();
        var semaine = new calendrier.Semaine(new Date(2014,10,3));
        semaine.cle = "semaine10";
        dao.addSemaine(semaine);
        init();

        var date = new Date(2014,10,15);
        semaine.dateDebut = date;

        dao.setSemaine(semaine.cle, semaine);
        init();

        var date2 = new Date(2014,10,10);
        ok(application.semaines[1].dateDebut, date2);
    }
);

test("test set user",1,function()
    {
        localStorage.clear();
        var user = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        user.cle = "user1";
        dao.addUtilisateur(user);
        init();

        user.nom = "Charpentier";

        dao.setUtilisateur(user.cle,user);
        init();

        equal(application.users[0].nom, "Charpentier");
    }
);

test("test clear",1,function()
    {
        localStorage.clear();
        var user = new utilisateur.Moniteur("M.", "Carpentier", "Thomas", "15 Avenue de l'Europe", "Seclin", "06.74.16.27.89", "thomas.carpentier@mail.fr", "#D9EDF7");
        user.cle = "user1";
        dao.addUtilisateur(user);
        init();

        dao.clear();
        init();
        equal(application.users.length, 0);
    }
);

