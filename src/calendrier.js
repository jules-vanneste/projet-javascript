/*
 Package calendrier
 Contient les différentes classes permettant la création des lecons et des agendas :
 - Creneau
 - Lecon
 - Lecon > LeconConduite
 - Lecon > LeconCode
 - Jour
 - Semaine
 */

// Le nombre de jours dans une semaine
var nbJours = 5;
// Le nombre de creneaux dans une journee
var nbCreneaux = 10;
// Les horaires d'une journee
var horaires = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

calendrier = {};
// Le compteur des semaines pour la generation des cles
calendrier.cptSemaines = 0;

// Classe representant un creneau
calendrier.Creneau = function(heure){
    var _heure = heure;
    var _clientsDisponibles = [];
    var _lecons = [];

    this.__defineGetter__("heure", function(){
        return _heure;
    });
    this.__defineSetter__("heure", function(value){
        _heure = value;
    });
    this.__defineGetter__("clientsDisponibles", function(){
        return _clientsDisponibles;
    });
    this.__defineSetter__("clientsDisponibles", function(value){
        _clientsDisponibles = value;
    });
    this.__defineGetter__("lecons", function(){
        return _lecons;
    });
    this.__defineSetter__("lecons", function(value){
        _lecons = value;
    });
};

// Classe representant une Lecon
calendrier.Lecon= function(moniteur){
    var _moniteur = moniteur;

    this.__defineGetter__("moniteur", function(){
        return _moniteur;
    });
    this.__defineSetter__("moniteur", function(value){
        _moniteur = value;
    });
};

// Classe representant une Lecon de conduite
calendrier.LeconConduite = function(moniteur, client){
    calendrier.Lecon.call(this, moniteur);
    var _client = client;

    this.__defineGetter__("client", function(){
        return _client;
    });
    this.__defineSetter__("client", function(value){
        _client = value;
    });
};
calendrier.LeconConduite.prototype.toJSON = function() {
    return genericToJSON("Con", this);
};
calendrier.LeconConduite.fromJSON = function(value) {
    return genericFromJSON(calendrier.LeconConduite, value.data);
};
reviver.constructors.LeconConduite = calendrier.LeconConduite;

// Classe representant une Lecon de code
calendrier.LeconCode = function(moniteur){
    calendrier.Lecon.call(this, moniteur);
};
calendrier.LeconCode.prototype.toJSON = function() {
    return genericToJSON("Cod", this);
};
calendrier.LeconCode.fromJSON = function(value) {
    return genericFromJSON(calendrier.LeconCode, value.data);
};
reviver.constructors.LeconCode = calendrier.LeconCode;

// Classe representant un jour
calendrier.Jour = function(date, creneaux){
    var _date = date;
    var _creneaux = creneaux;

    this.__defineGetter__("date", function(){
        return _date;
    });
    this.__defineSetter__("date", function(value){
        _date = value;
    });
    this.__defineGetter__("creneaux", function(){
        return _creneaux;
    });
    this.__defineSetter__("creneaux", function(value){
        _creneaux = value;
    });
};

// Classe representant une Semaine
calendrier.Semaine = function(date){
    var _cle;
    var _dateDebut;
    var _jours = [];

    _dateDebut = new Date(date);
    _dateDebut.setDate(date.getDate() - (date.getDay() - 1));

    for(var i=0; i<nbJours+1; i++){
        var creneaux = [];
        for(var j=0; j<nbCreneaux; j++){
            creneaux.push(new calendrier.Creneau(horaires[j]));
        }
        var now = new Date(_dateDebut);
        now.setDate(now.getDate() + i);
        _jours.push(new calendrier.Jour(now, creneaux, horaires));
    }

    this.__defineGetter__("cle", function(){
        return _cle;
    });
    this.__defineSetter__("cle", function(value){
        _cle = value;
    });
    this.__defineGetter__("dateDebut", function(){
        return _dateDebut;
    });
    this.__defineSetter__("dateDebut", function(value){
        _dateDebut = value;
    });
    this.__defineGetter__("jours", function(){
        return _jours;
    });
    this.__defineSetter__("jours", function(value){
        _jours = value;
    });
};
calendrier.Semaine.prototype.toJSON = function() {
    return genericToJSON("Sem", this);
};
calendrier.Semaine.fromJSON = function(value) {
    return genericFromJSON(calendrier.Semaine, value.data);
};
reviver.constructors.Semaine = calendrier.Semaine;