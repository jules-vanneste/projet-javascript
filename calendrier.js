var nbJours = 5;
var nbCreneaux = 10;
var horaires = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

calendrier = {};

calendrier.Reservation = function(client, moniteur){
    var _client = client;
    var _moniteur = moniteur;

    this.__defineGetter__("client", function(){return _client;});
    this.__defineSetter__("client", function(value){return _client = value;});
    this.__defineGetter__("moniteur", function(){return _moniteur;});
    this.__defineSetter__("moniteur", function(value){return _moniteur = value;});
}

calendrier.creneau = function(jour, semaine, mois, annee){
    var _jour = jour;
    var _semaine = semaine;
    var _mois = mois;
    var _annee = annee;

    this.__defineGetter__("jour", function(){return _jour;});
    this.__defineSetter__("jour", function(value){return _jour = value;});
    this.__defineGetter__("semaine", function(){return _semaine;});
    this.__defineSetter__("semaine", function(value){return _semaine = value;});
    this.__defineGetter__("mois", function(){return _mois;});
    this.__defineSetter__("mois", function(value){return _mois = value;});
    this.__defineGetter__("annee", function(){return _annee;});
    this.__defineSetter__("annee", function(value){return _annee = value;});
};

calendrier.LeconConduite = function(jour, semaine, mois, annee, reservations){
    utilisateur.Personne.call(this, jour, semaine, mois, annee);
    var _reservations = reservations;
    this.__defineGetter__("reservations", function(i){return _reservations[i];});
    this.__defineSetter__("reservations", function(value){return _reservations.push(value);});
};

calendrier.LeconCode = function(jour, semaine, mois, annee, moniteur){
    utilisateur.LeconCode.call(this, jour, semaine, mois, annee);
    var _moniteur = moniteur;
    this.__defineGetter__("moniteur", function(){return _moniteur;});
    this.__defineSetter__("moniteur", function(value){return _moniteur = value;});
};

calendrier.Jour = function(num, date, creneaux, horaires){
    var _num = num;
    var _date = date;
    var _creneaux = creneaux;
    var _horaires = horaires;

    this.__defineGetter__("num", function(){return _num;});
    this.__defineSetter__("num", function(value){return _num = value;});
    this.__defineGetter__("date", function(){return _date;});
    this.__defineSetter__("date", function(value){return _date = value;});
    this.__defineGetter__("creneaux", function(){return _creneaux;});
    this.__defineGetter__("creneau", function(i){return _creneaux[i];});
    this.__defineSetter__("creneaux", function(value){return _creneaux.push(value);});
    this.__defineGetter__("horaire", function(i){return _creneaux[i];});
    this.__defineGetter__("horaires", function(){return _horaires;});
};

calendrier.Semaine = function(num, dateDebut, dateFin){
    var _num = num;
    var _dateDebut = dateDebut;
    var _dateFin = dateFin;
    var _jours = [];

    for(var i=1; i<(nbJours+1); i++){
        var creneaux = []
        for(var j=0; j<nbCreneaux; j++){
            creneaux.push(new calendrier.creneau());
        }
        var date = new Date((_dateDebut.getMilliseconds() + i*86400000));
        _jours.push(new calendrier.Jour(i, date, creneaux, horaires));
    }

    this.__defineGetter__("num", function(){return _num;});
    this.__defineSetter__("num", function(value){return _num = value;});
    this.__defineGetter__("dateDebut", function(){return _dateDebut;});
    this.__defineSetter__("dateDebut", function(value){return _dateDebut = value;});
    this.__defineGetter__("dateFin", function(){return _dateFin;});
    this.__defineSetter__("dateFin", function(value){return _dateFin = value;});
    this.__defineGetter__("jours", function(){return _jours;});
    this.__defineGetter__("jour", function(i){return _jours[i];});
    this.__defineSetter__("jours", function(value){return _jours.push(value);});
}