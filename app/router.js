import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  "use strict";
  this.route('login',{path:'/'});
  this.route('dashboard', function() {
    this.route ('users');
    this.route ('form');
    this.route ('utilization');
    this.route ('node');
    this.route ('income');
    this.route ('payment');
  });
  this.route('enterprise', function() {
    this.route ('index');
  });
  this.route('user', function() {
    this.route ('index');
  });
  this.route('form', function() {
    this.route ('index');
  });
  this.route('system', function() {
    this.route ('index');
  });
  this.route('notification', function() {
    this.route ('index');
  });
  this.route('order', function() {
    this.route ('index');
  });
  this.route('task', function() {
    this.route ('index');
  });
});

export default Router;
