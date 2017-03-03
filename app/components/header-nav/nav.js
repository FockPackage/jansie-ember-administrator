import Component from 'ember-component';
import inject from 'ember-service/inject';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  tagName:'',
  session: inject(),
  username: computed('session.data.authenticated.UserName', function () {
    return get(this, 'session.data.authenticated.UserName');
  }),
});
