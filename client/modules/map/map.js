class Map {
    constructor(args) {
        this.markers = []
        this.map = null
        Meteor.subscribe('bueiros')
        Session.set('markerAtual', null)
    }

    loadObjects() {
        Session.set('loading', true);
        // @todo remover markers fora da tela ( poupar memória )
        let bueiros = Bueiros.find().fetch()

        bueiros.forEach((doc) => {

            let icon = 'markers/marker-livre.png';

            switch (doc.status) {
                case 'active':
                    icon = 'markers/marker-adotado.png'
                    break
                case 'inactive':
                    icon = 'markers/marker-abandonado.png.png'
                    break
            }

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(doc.lat, doc.lng),
                map: this.map,
                icon: icon,
                title: doc.name,
                id: doc._id
            })

            this.bindMarker(marker)

            this.markers.push(marker)
        })

        Session.set('loading', false);
    }

    bindMarker(marker) {
        marker.addListener('click', (event) => {
            Session.set('markerAtual', {
                id: marker.id,
                name: marker.title
            })
        })
    }
}

const MainMap = new Map()

Template.map.onCreated(function mapOnCreated() {
    GoogleMaps.ready('mainMap', (map) => {
        MainMap.map = map.instance;

        // Se o browser do maluco suportar location
        if ("geolocation" in navigator) {

            Session.set('loading', true)

            // Fica de olho de o usuário vai aprovar ou não descobrir a localização dele.
            const watchId = navigator.geolocation.watchPosition(
                (position) => Session.set('loading', false),
                (error) => Session.set('loading', false)
            )

            navigator.geolocation.getCurrentPosition((location) => {
                console.log('sua latitude: ', location.coords.latitude, 'sua longitude: ', location.coords.longitude)
                map.instance.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude))
            })
        }

        map.instance.addListener('idle', () => {
            MainMap.loadObjects()
        })

        map.instance.addListener('dblclick', () => {
            console.log(this)
        })
    })

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