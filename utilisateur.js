utilisateur = {};
utilisateur.cptUtilisateurs = 0;

utilisateur.Personne = function(civilite, nom, prenom, adresse, ville, telephone, mail, role){
    var _cle;
    var _civilite = civilite;
    var _nom = nom;
    var _prenom = prenom;
    var _adresse = adresse;
    var _ville = ville;
    var _telephone = telephone;
    var _mail = mail;
    var _role = role;

    this.__defineGetter__("cle", function(){return _cle;});
    this.__defineSetter__("cle", function(value){return _cle = value;});
    this.__defineGetter__("civilite", function(){return _civilite;});
    this.__defineSetter__("civilite", function(value){return _civilite = value;});
    this.__defineGetter__("nom", function(){return _nom;});
    this.__defineSetter__("nom", function(value){return _nom = value;});
    this.__defineGetter__("prenom", function(){return _prenom;});
    this.__defineSetter__("prenom", function(value){return _prenom = value;});
    this.__defineGetter__("adresse", function(){return _adresse;});
    this.__defineSetter__("adresse", function(value){return _adresse = value;});
    this.__defineGetter__("ville", function(){return _ville;});
    this.__defineSetter__("ville", function(value){return _ville = value;});
    this.__defineGetter__("telephone", function(){return _telephone;});
    this.__defineSetter__("telephone", function(value){return _telephone = value;});
    this.__defineGetter__("mail", function(){return _mail;});
    this.__defineSetter__("mail", function(value){return _mail = value;});
    this.__defineGetter__("role", function(){return _role;});
    this.__defineSetter__("role", function(value){return _role = value;});
};

utilisateur.Client = function (civilite, nom, prenom, adresse, ville, telephone, mail, moniteur){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Client");
    var _moniteur = moniteur;

    this.__defineGetter__("moniteur", function(){return _moniteur;});
    this.__defineSetter__("moniteur", function(value){return _moniteur = value;});
};
utilisateur.Client.prototype.toJSON = function() {
    return Generic_toJSON("Cli", this);
};
utilisateur.Client.fromJSON = function(value) {
    return Generic_fromJSON(utilisateur.Client, value.data);
};
Reviver.constructors.Client = utilisateur.Client;

utilisateur.Moniteur = function (civilite, nom, prenom, adresse, ville, telephone, mail, couleur){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Moniteur");
    var _couleur = couleur;

    this.__defineGetter__("couleur", function () {return _couleur;});
    this.__defineSetter__("couleur", function (value) {return _couleur = value;});
};
utilisateur.Moniteur.prototype.toJSON = function() {
    return Generic_toJSON("Mon", this);
};
utilisateur.Moniteur.fromJSON = function(value) {
    return Generic_fromJSON(utilisateur.Moniteur, value.data);
};
Reviver.constructors.Moniteur = utilisateur.Moniteur;

utilisateur.Secretaire = function (civilite, nom, prenom, adresse, ville, telephone, mail){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Secrétaire");
};
utilisateur.Secretaire.prototype.toJSON = function() {
    return Generic_toJSON("Sec", this);
};
utilisateur.Secretaire.fromJSON = function(value) {
    return Generic_fromJSON(utilisateur.Secretaire, value.data);
};
Reviver.constructors.Secretaire = utilisateur.Secretaire;