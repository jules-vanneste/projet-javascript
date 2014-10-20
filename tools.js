domHelp = {
    addElement: function (parentNode, element) {
        var elt = document.createElement(element);
        parentNode.appendChild(elt);
        for (var i = 2; i < arguments.length; i++) {
            elt.setAttribute(arguments[i].nomAttribut, arguments[i].valeurAttribute);
        }
        return elt;
    },

    addText: function (parentNode, text) {
        var elt = document.createTextNode(text);
        parentNode.appendChild(elt);
        return elt;
    },

    searchUser : function (input, elements, role, proprietes) {
        var recherche = input.value;
        recherche = recherche.toLowerCase();
        var res = [];
        for (var i=0; i<elements.length; i++) {
            if(elements[i] != null){
                if(elements[i].role == role) {
                    for(var j=0; j<proprietes.length; j++) {
                        if (elements[i][proprietes[j]].toLowerCase().indexOf(recherche) != -1) {
                            res.push(i);
                            break;
                        }
                    }
                }
            }
        }
        return res;
    }
};

tools = {
    changeSemaine : function(nomPage, numSemaine, suivante){
        var dateDebutSemaine = new Date(application.semaines[numSemaine].dateDebut.getFullYear(), application.semaines[numSemaine].dateDebut.getMonth(), application.semaines[numSemaine].dateDebut.getDate());
        if(suivante){
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) + 7);
            for(var i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() == dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() == dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() == dateDebutSemaine.getFullYear())) {
                    page.clear();
                    nomPage(i);
                    return;
                }
            }
            var semaine = new calendrier.Semaine(dateDebutSemaine);
            application.semaines.push(semaine);
            dao.createSemaine(semaine);
            page.clear()
            nomPage(application.semaines.length-1);
        }
        else{
            dateDebutSemaine.setDate((dateDebutSemaine.getDate() - (dateDebutSemaine.getDay() - 1)) - 7);
            for(var i=0; i<application.semaines.length; i++){
                if((application.semaines[i].dateDebut.getDate() == dateDebutSemaine.getDate())
                    && (application.semaines[i].dateDebut.getMonth() == dateDebutSemaine.getMonth())
                    && (application.semaines[i].dateDebut.getFullYear() == dateDebutSemaine.getFullYear())) {
                    page.clear();
                    nomPage(i);
                    return;
                }
            }
        }
    },

    choiceClient : function(nbRes, input, conteneurRes, lecons, creneau){
        conteneurRes.innerHTML = "";
        var tbody = domHelp.addElement(conteneurRes, "tbody");
        var tr;
        var td;

        if(lecons != null){
            var tab = [];
            for (var i=0; i<application.users.length; i++) {
                var topush = true;
                if(application.users[i].role != "Client"){
                    topush = false;
                }
                for (var j=0; j<lecons.length; j++) {
                    if (lecons[j] instanceof calendrier.LeconConduite && application.users[i] == lecons[j].client){
                        topush = false;
                    }
                }
                if(topush){
                    tab.push(application.users[i]);
                }
                else{
                    tab.push(null);
                }
            }
            var res = domHelp.searchUser(input, tab, "Client", ["nom", "prenom"]);
        }
        else{
            var res = domHelp.searchUser(input, application.users, "Client", ["nom", "prenom"]);
        }

        for (var i=0; i<nbRes && i<res.length; i++) {
            tr = domHelp.addElement(tbody,"tr");
            td = domHelp.addElement(tr, "td");
            domHelp.addElement(td, "input", {nomAttribut : "type", valeurAttribute : "radio"}, {nomAttribut : "name", valeurAttribute : "user"}, {nomAttribut : "value", valeurAttribute : res[i]});
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].civilite);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].nom);
            td = domHelp.addElement(tr, "td");
            domHelp.addText(td, application.users[res[i]].prenom);
            td = domHelp.addElement(tr, "td");
            var isDispo = false;
            for(var i=0; i<creneau.clientsDisponibles.length; i++){
                if(application.users[res[i]] == creneau.clientsDisponibles[i]){
                    isDispo = true;
                }
            }
            if(isDispo){
                domHelp.addElement(td, "span", {nomAttribut : "class", valeurAttribute : "glyphicon glyphicon-ok"});
            }
            else{
                td = domHelp.addElement(tr, "");
            }
        }
    },

    getUserIfExist : function (cle) {
        for (var i=0; i<application.users.length; i++) {
            if(application.users[i].cle == cle){
                return application.users[i];
            }
        }
        return null;
    },

    getIndexOfUserIfExist : function (cle) {
        for (var i=0; i<application.users.length; i++) {
            if(application.users[i].cle){
                return i;
            }
        }
        return null;
    },

    printLegendeMoniteur : function(){
        var legende = domHelp.addElement(document.getElementById('content'), "div");
        for(var i=0; i<application.users.length; i++){
            if(application.users[i] instanceof utilisateur.Moniteur){
                var divMoniteur = domHelp.addElement(legende, "div", {nomAttribut : "style", valeurAttribute : "border: 1px solid black; display: inline-block; width: 75px; height:30px; background-color: " + application.users[i].couleur});
                var texteMoniteur = domHelp.addElement(legende, "span", {nomAttribut : "style", valeurAttribute : "display: inline; margin-left: 5px; vertical-align: top; margin-right : 10px;"});
                domHelp.addText(texteMoniteur, application.users[i].nom + " " + application.users[i].prenom);
            }
        }
    }
}

function Reviver(key, value) {
    var ctor;

    if (typeof value === "object" &&
        typeof value.ctor === "string" &&
        typeof value.data !== "undefined") {
        ctor = Reviver.constructors[value.ctor] || window[value.ctor];
        if (typeof ctor === "function" &&
            typeof ctor.fromJSON === "function") {
            return ctor.fromJSON(value);
        }
    }
    return value;
}
Reviver.constructors = {}; // A list of constructors the smart reviver should know about

// A generic "toJSON" function that creates the data expected
// by Reviver.
// `ctorName`  The name of the constructor to use to revive it
// `obj`       The object being serialized
// `keys`      (Optional) Array of the properties to serialize,
//             if not given then all of the objects "own" properties
//             that don't have function values will be serialized.
//             (Note: If you list a property in `keys`, it will be serialized
//             regardless of whether it's an "own" property.)
// Returns:    The structure (which will then be turned into a string
//             as part of the JSON.stringify algorithm)
function Generic_toJSON(ctorName, obj, keys) {
    var data, index, key;

    if (!keys) {
        keys = Object.keys(obj); // Only "own" properties are included
    }

    data = {};
    for (index = 0; index < keys.length; ++index) {
        key = keys[index];
        data[key] = obj[key];
    }
    return {ctor: ctorName, data: data};
}

// A generic "fromJSON" function for use with Reviver: Just calls the
// constructor function with no arguments, then applies all of the
// key/value pairs from the raw data to the instance. Only useful for
// constructors that can be reasonably called without arguments!
// `ctor`      The constructor to call
// `data`      The data to apply
// Returns:    The object
function Generic_fromJSON(ctor, data) {
    var obj, name;

    obj = new ctor();
    for (name in data) {
        obj[name] = data[name];
    }
    return obj;
}