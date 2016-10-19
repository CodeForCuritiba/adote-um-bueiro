import './modules/profile.html'
import './modules/profile.js'

Template.mapControls.helpers({
    markerAtual () {
        return Session.get('markerAtual')
    }
})