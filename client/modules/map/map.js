Template.map.onCreated(function mapOnCreated() {
    // Se o browser do maluco suportar location
    if ("geolocation" in navigator) {

        Session.set('loading', true)

        // Fica de olho de o usuário vai aprovar ou não descobrir a localização dele.
        const watchId = navigator.geolocation.watchPosition(
            (position) => Session.set('loading', false),
            (error) => Session.set('loading', false)
        )

        navigator.geolocation.getCurrentPosition((location) => {
            const map = GoogleMaps.maps.mainMap.instance

            console.log('sua latitude: ' + location.coords.latitude, 'sua longitude: ' + location.coords.longitude)
            map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude))
        })
    }

    GoogleMaps.load({
        key: 'AIzaSyCRkw8TEC789G2vN7NSyi5wp6zEVgYJb1o'
    })
})

Template.map.helpers({
    mapOptions() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-25.4312715, -49.2772581),
                zoom: 13,
                disableDefaultUI: true
            }
        }
    }
})