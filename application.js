

application = {
    users : [],
    userConnected : null,
    addClient : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    addMoniteur : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    },
    addSecretaire : function(cle,user) {
        localStorage.setItem(cle,JSON.stringify(user));
    }
};