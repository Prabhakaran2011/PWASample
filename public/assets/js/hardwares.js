(()=>{
    var onlineState = navigator.onLine ? 'online' : 'offline';
    console.log('Initial State : ' + onlineState);
    
    window.addEventListener('online', ()=> {
        console.log('Online Mode');
    });
    
    window.addEventListener('offline', ()=> {
        console.log('Offline Mode');
    });
    
    
    navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);
    });
    
    navigator.getBattery().then((battery)=>{
        console.log(battery)
    });
    
})();