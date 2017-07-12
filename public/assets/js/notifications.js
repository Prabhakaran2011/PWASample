(() => {
    if (Notification.permission === "denied") {
        $('#localNotifications').empty();
        $('#localNotifications').append('<b style="color:red">Permission Denied</b>');
    }

    //Non-Perisistant Notification
    $('#localNotifications').click(() => {
        notificationPermission();
    });

    $('#pushNotifications').click(() => {
        pushNotifications();
    });

})();

function notificationPermission() {
    if (Notification.permission === "granted") {
        showNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permissions => {
            if (permissions === "granted") {
                showNotification();
            }
        });
    } else {
        $('#localNotifications').empty();
        $('#localNotifications').append('<b style="color:red">Permission Denied</b>');

    }
}

function showNotification() {
    var pushNotification = new Notification('Push Notification Sample', {
        body: 'This is the sample text which describes about message',
        badge: '../img/PWA-logo.jpg',
        icon: '../img/PWA-logo.jpg',
        image: '../img/ipad-hand.png',
        silent: false,
        vibrate: [200, 100, 300],
    });

}

function pushNotifications() {
    return false;
    // var token = window.localStorage.getItem('token');
    // if (token == null || token.length < 1) {
    //     alert('No FCM Registeration found, Please click Register to FCM button First');
    //     return;
    // }
    // else {
    //     var postData = {
    //         to: token,
    //         notification: {
    //         body: "This is thetest body for the Push messages",
    //         title: "Push Msg",
    //         click_action: "http://google.in",
    //         icon: "assets/img/PWA-logo.jpg"
    //         }
    //     };
    //     $.ajax({
    //         type: "POST",
    //         beforeSend: function (request) {
    //             request.setRequestHeader("Authorization", "key=AAAA9i76Yf0:APA91bFbbCxfBzXqGgMJGjMKWD_x5WlvIQNuKzQ2_xtNUGmoNP7bXenTNdsAwKupb9SIgedctDjarDIEaXZuIwzH4EzpTep0WQFEbiaE7F4odp-2IYnp2oNt_C2Lf2v30LE4gAStLteh");
    //             request.setRequestHeader("content-Type", "application/json");
    //         },
    //         url: "https://fcm.googleapis.com/fcm/send",
    //         data: JSON.stringify(postData),
    //         dataType: "json",
    //         processData: false,
    //         success: function (msg) {
    //             alert('pushed');
    //         },
    //         error: function (err) {
    //             alert('Error');
    //         }
    //     });
    // }

}