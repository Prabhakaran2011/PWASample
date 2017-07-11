const messaging = firebase.messaging();

messaging.getToken()
    .then(function(currentToken) {
      console.log(currentToken);
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        requestPermission();
        setTokenSentToServer(false);
      }
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      setTokenSentToServer(false);
    });

  messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      setTokenSentToServer(false);
      sendTokenToServer(refreshedToken);
      console.log("refreshedToken::"+refreshedToken)
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });

  messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);

    new Notification (payload.notification.title, {
        body : payload.notification.body,
        badge : payload.notification.icon,
        icon : payload.notification.icon,
        //image : 'assets/img/ipad-hand.png',
        //silent : false,
        vibrate : [200, 100, 300,200, 100, 300,200, 100, 300],

    });
  });


  function sendTokenToServer(currentToken) {
    
    
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      firebase.database().ref('devices/'+currentToken).set({
        ostype: navigator.userAgent,
      });
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }
  }
  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
  }
  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
  }

  function requestPermission() {
    console.log('Requesting permission...');
    messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
  }
