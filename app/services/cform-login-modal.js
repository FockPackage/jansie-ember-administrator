import Service from 'ember-service';
import set from 'ember-metal/set';

export default Service.extend({
  isShow: false,

  open() {
    set(this, 'isShow', true);
  },

  close() {
    set(this, 'isShow', false);
  },

  toggle() {
    this.toggleProperty('isShow');
  }
});
