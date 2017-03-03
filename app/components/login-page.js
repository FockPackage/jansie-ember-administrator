import Ember from 'ember';
import get from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import inject from 'ember-service/inject';

export default Ember.Component.extend({

  session: inject(),
  _routing: inject('-routing'),

  oauth: [
    { label: 'Facebook', icon: 'social-16px_logo-fb-simple' },
    { label: 'Twitter', icon: 'social-16px_logo-twitter' },
    { label: 'Google', icon: 'social-16px_logo-google-plus' },
  ],
  login: [
    { footerLabel: 'If you forgot your password, just', footerLinke: 'contact us.' }
  ],

  isLoading: false,

  error: {
    email: '',
    password: ''
  },
  formValue: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  },

  actions: {
    loginSuccess() {
      this.notification.success('<strong>登录成功！！！</strong>');
      get(this, '_routing').transitionTo('dashboard');
    },

    login() {
      const { email, password } = get(this, 'formValue');
      if (!email) {
        return set(this, "error.email", "email can't be black");
      }
      if (!password) {
        return set(this, "error.password", "password can't be black");
      }
      set(this, "isLoading", true);
      this.get('session').authenticate('authenticator:cform', {
        username: email,
        password: password,
        initUserID: ''
      }).then(() => {
        this.send('loginSuccess');
        set(this, "isLoading", false);
      })
        .catch(() => {
          setProperties(get(this, 'error'), {
            email: 'email or password error!',
            password: 'email or password error!'
          });
          set(this, "isLoading", false);
        });
    },
  }
});
