const firebase = require('./firebase_connect');

module.exports = {
    saveData: function(user){
        var username = user.name;

        firebase.database().ref("users/"+username).set({
            name: username,
        });

    }
};


