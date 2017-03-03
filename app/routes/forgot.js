import Route from "ember-route";
import get from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import inject from 'ember-service/inject';

export default Route.extend({
  session: inject(),
  activate() {
    this.controllerFor('application').set('login', true);
  },
  deactivate(){
     this.controllerFor('application').set('login', false);
  },
  setupController(controller) {
    this._super(...arguments);
    setProperties(controller, {
      usename: localStorage.getItem('username'),
      password: '',
      isRemenberMe: !!localStorage.getItem('username'),
    })
  },

  actions: {
    setFormValue(key, value) {
      const controller = get(this, 'controller');
      set(controller, key, value)
    },

    login() {
      const {usename, password} = get(this, 'controller');
      get(this, 'session').authenticate('authenticator:cform', usename, password)
        .then( ()=> {

          const $remenber = document.getElementsByName("remenber")[0];
          $remenber.checked && localStorage.setItem('username', get(this, 'formValue.username'));
          get(this, 'controller').transitionToRoute('dashboard');
        });
    }
  },
});
