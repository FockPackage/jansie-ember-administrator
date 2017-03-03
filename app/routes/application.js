import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

export default Route.extend({
  loginModal: inject('cform-login-modal'),
  session: inject(),

  beforeModel() {
    this._super(...arguments);

    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
      return;
    }
  },

  setupController(controller) {
    this._super(...arguments);
    get(controller, 'theme').setTheme('dark');
    set(controller, 'isShow', get(this, 'loginModal.isShow'));
  },
});
