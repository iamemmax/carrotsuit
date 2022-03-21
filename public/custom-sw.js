const redirectURL = "https://www.google.com/"

self.addEventListener('push', event => {


    console.log(event.data.json(), 'sjkskj')
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      body: data.body,
      icon: data.icon,
      data: { url:data.url }, //the url which we gonna use later
      actions: [{action: "open_url", title: "Read Now"}]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
})


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    // clients.openWindow(event.notification.data.url + "?notification_id=" + event.notification.data.id)
    clients.openWindow(event.notification.data.url )
    // clients.openWindow('https://www.google.com/')
    );
})


self.addEventListener(fetch, (event)=>{


  event.waitUntil(
    // this.registration.showNotification("hello", {body: 'kkkkkkk'})
  )

  if(!navigation.onLine){
    event.respondWith(
      caches.match(event.request).then((resp)={
        if(resp){
          return resp
        }

        // let requestUrl = event.request.clone()
        // fetch(reuestUrl)
      })
    )
  }

})


self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});



//Notificqtion click
// self.addEventListener('notificationclick', function(event) {

//   switch(event.action){
//     case 'open_url':
//     clients.openWindow(event.notification.data.url); //which we got from above
//     break;
//     case 'any_other_action':
//     clients.openWindow("https://www.example.com");
//     break;
//   }
// }
// , false);



