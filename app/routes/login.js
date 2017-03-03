import Route from "ember-route";
import inject from 'ember-service/inject';

export default Route.extend({
  session: inject(),
  activate() {
    this.controllerFor('application').set('login', true);
  },
  deactivate(){
     this.controllerFor('application').set('login', false);
  },
});
