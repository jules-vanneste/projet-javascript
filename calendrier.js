var nbJours = 5;
var nbCreneaux = 10;
var horaires = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var cptSemaines = 0;

calendrier = {};

calendrier.Creneau = function(heure){
    var _heure = heure;
    var _clientsDisponibles = [];
    var _lecons = [];

    this.__defineGetter__("heure", function(){return _heure;});
    this.__defineSetter__("heure", function(value){return _heure = value;});
    this.__defineGetter__("clientsDisponibles", function(){return _clientsDisponibles;});
    this.__defineSetter__("clientsDisponibles", function(value){return _clientsDisponibles = value;});
    this.__defineGetter__("lecons", function(){return _lecons;});
    this.__defineSetter__("lecons", function(value){return _lecons = value;});
};

calendrier.Lecon= function(moniteur){
    var _moniteur = moniteur;

    this.__defineGetter__("moniteur", function(){return _moniteur;});
    this.__defineSetter__("moniteur", function(value){return _moniteur = value;});
};

calendrier.LeconConduite = function(moniteur, client){
    calendrier.Lecon.call(this, moniteur);
    var _client = client;

    this.__defineGetter__("client", function(){return _client;});
    this.__defineSetter__("client", function(value){return _client = value;});
};

calendrier.LeconCode = function(moniteur){
    calendrier.Lecon.call(this, moniteur);
};

calendrier.Jour = function(date, creneaux, horaires){
    var _date = date;
    var _creneaux = creneaux;

    this.__defineGetter__("date", function(){return _date;});
    this.__defineSetter__("date", function(value){return _date = value;});
    this.__defineGetter__("creneaux", function(){return _creneaux;});
    this.__defineSetter__("creneaux", function(value){return _creneaux = value;});
};

calendrier.Semaine = function(dateDebut, dateFin){
    var _cle = "semaine" + cptSemaines;
    var _dateDebut = dateDebut;
    var _dateFin = dateFin;
    var _jours = [];

    cptSemaines = cptSemaines+1;

    for(var i=0; i<nbJours+1; i++){
        var creneaux = [];
        for(var j=0; j<nbCreneaux; j++){
            creneaux.push(new calendrier.Creneau(horaires[j]));
        }
        var date = new Date(_dateDebut);
        date.setDate(date.getDate() + i);
        _jours.push(new calendrier.Jour(date, creneaux, horaires));
    }

    this.__defineGetter__("cle", function(){return _cle;});
    this.__defineSetter__("cle", function(value){return _cle = value;});
    this.__defineGetter__("dateDebut", function(){return _dateDebut;});
    this.__defineSetter__("dateDebut", function(value){return _dateDebut = value;});
    this.__defineGetter__("dateFin", function(){return _dateFin;});
    this.__defineSetter__("dateFin", function(value){return _dateFin = value;});
    this.__defineGetter__("jours", function(){return _jours;});
    this.__defineSetter__("jours", function(value){return _jours = value;});

    dao.setSemaine(this.cle, this);
}