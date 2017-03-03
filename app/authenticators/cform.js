import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import RSVP from 'rsvp';

export default BaseAuthenticator.extend({
  api: inject('api'),

  authenticate(data) {
    return get(this, 'api').reqUserLogin(data);
  },

  restore(data) {
    return RSVP.resolve(data);
  }
});
