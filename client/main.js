import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import './main.html'

import './modules/map/map.js'
import './modules/map/map.html'

import './modules/loader/loader.js'
import './modules/loader/loader.html'

import './modules/mapControls/mapControls.js'
import './modules/mapControls/mapControls.html'

Template.registerHelper('_', function(){
  return _;
});

Session.set('loading', false)

Template.body.helpers({
    loading () {
        return Session.get('loading')
    },
})