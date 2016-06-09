import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  rootURL: config.baseURL,
  location: config.locationType
});

Router.map(function() {});

export default Router;
