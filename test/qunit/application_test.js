module("application", {
//	setup:function(){alert("setup application individual test");},
//	teardown:function(){alert("teardown application individual test");}
});

test("test print form login",1,function()
{
    localStorage.clear();
    dao.init();
    init();

    domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "content"});
    page.accueil();
    var result ="<td><input type=\"radio\" name=\"user\" value=\"0\" role=\"Moniteur\" id=\"Carpentier\"></td><td>Moniteur</td><td>M.</td><td>Carpentier</td><td>Thomas</td>";

    equal(document.getElementById("CarpentierThomas").innerHTML,result);
}
);

test("test print ajout utilisateur",1,function()
    {
        localStorage.clear();
        dao.init();
        init();

        domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "content"});
        page.ajoutUtilisateur();

        document.getElementById("type").value = "0";
        document.getElementById("civ").value = "M.";
        document.getElementById("nom").value = "Dupont";
        document.getElementById("prenom").value = "Jean";
        document.getElementById("adresse").value = "20 rue nationale";
        document.getElementById("ville").value = "Lille";
        document.getElementById("tel").value = "06.26.21.45.84"
        document.getElementById("mail").value = "jean.dupond@mail.fr";
        document.getElementById("couleur").value = "#FAD345";
        document.getElementById("submit").click();

        domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "content"});

        var result ="<td><input type=\"radio\" name=\"user\" value=\"6\" role=\"Moniteur\" id=\"Dupont\"></td><td>Moniteur</td><td>M.</td><td>Dupont</td><td>Jean</td>";

        page.accueil();

        equal(document.getElementById("DupontJean").innerHTML,result);
    }
);

test("test print client",1,function()
{
    localStorage.clear();
    dao.init();
    init();

    domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "content"});
    page.accueil();

    var input = document.getElementById("Capolino").click();
    document.getElementById("submit").click();

    domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "content"});
    domHelp.addElement(document.getElementById("qunit-fixture"), "div", {nomAttribut : "id", valeurAttribute : "btnDeco"});
    page.client(0);

    var string = document.getElementsByTagName("h3")[0].innerHTML;

    equal(string,"Client");
}
);