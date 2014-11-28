/*
 Package utilisateur
 Contient les différentes classes des utilisateurs :
 - Personne
 - Personne > Client
 - Personne > Moniteur
 - Personne > Secretaire
 */

utilisateur = {};
// Represente le compteur des utilisateurs permettant la generation des cles
utilisateur.cptUtilisateurs = 0;

// Classe representant une Personne
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

    this.__defineGetter__("cle", function(){
        return _cle;
    });
    this.__defineSetter__("cle", function(value){
        _cle = value;
    });
    this.__defineGetter__("civilite", function(){
        return _civilite;
    });
    this.__defineSetter__("civilite", function(value){
        _civilite = value;
    });
    this.__defineGetter__("nom", function(){
        return _nom;
    });
    this.__defineSetter__("nom", function(value){
        _nom = value;
    });
    this.__defineGetter__("prenom", function(){
        return _prenom;
    });
    this.__defineSetter__("prenom", function(value){
        _prenom = value;
    });
    this.__defineGetter__("adresse", function(){
        return _adresse;
    });
    this.__defineSetter__("adresse", function(value){
        _adresse = value;
    });
    this.__defineGetter__("ville", function(){
        return _ville;
    });
    this.__defineSetter__("ville", function(value){
        _ville = value;
    });
    this.__defineGetter__("telephone", function(){
        return _telephone;
    });
    this.__defineSetter__("telephone", function(value){
        _telephone = value;
    });
    this.__defineGetter__("mail", function(){
        return _mail;
    });
    this.__defineSetter__("mail", function(value){
        _mail = value;
    });
    this.__defineGetter__("role", function(){
        return _role;
    });
    this.__defineSetter__("role", function(value){
        _role = value;
    });
};

// Classe representant un Client
utilisateur.Client = function (civilite, nom, prenom, adresse, ville, telephone, mail, moniteur){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Client");
    var _moniteur = moniteur;

    this.__defineGetter__("moniteur", function(){
        return _moniteur;
    });
    this.__defineSetter__("moniteur", function(value){
        _moniteur = value;
    });
};
utilisateur.Client.prototype.toJSON = function() {
    return genericToJSON("Cli", this);
};
utilisateur.Client.fromJSON = function(value) {
    return genericFromJSON(utilisateur.Client, value.data);
};
reviver.constructors.Client = utilisateur.Client;

// Classe representant un Moniteur
utilisateur.Moniteur = function (civilite, nom, prenom, adresse, ville, telephone, mail, couleur){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Moniteur");
    var _couleur = couleur;

    this.__defineGetter__("couleur", function () {
        return _couleur;
    });
    this.__defineSetter__("couleur", function (value) {
        _couleur = value;
    });
};
utilisateur.Moniteur.prototype.toJSON = function() {
    return genericToJSON("Mon", this);
};
utilisateur.Moniteur.fromJSON = function(value) {
    return genericFromJSON(utilisateur.Moniteur, value.data);
};
reviver.constructors.Moniteur = utilisateur.Moniteur;

// Classe representant une Secretaire
utilisateur.Secretaire = function (civilite, nom, prenom, adresse, ville, telephone, mail){
    utilisateur.Personne.call(this, civilite, nom, prenom, adresse, ville, telephone, mail, "Secrétaire");
};
utilisateur.Secretaire.prototype.toJSON = function() {
    return genericToJSON("Sec", this);
};
utilisateur.Secretaire.fromJSON = function(value) {
    return genericFromJSON(utilisateur.Secretaire, value.data);
};
reviver.constructors.Secretaire = utilisateur.Secretaire;