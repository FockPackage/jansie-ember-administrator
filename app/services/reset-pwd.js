/**
 * Created by cform on 17/2/28.
 */
import Service from 'ember-service';
import inject from 'ember-service/inject'
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import $ from 'jquery';


export default Service.extend({
  api: inject(),
  notification: inject('ui-notification'),
  modal: inject('ui-modal'),
  dialog: inject(),
  isLoading: false,
  formValue: {
    password: '',
    confirmPassword: '',
  },


  handleResetPwd(self = this){
    const {password, confirmPassword} = get(self, 'formValue');
    set(self, "isLoading", true);
    get(self, 'api').reqUserChangePwd(password, confirmPassword).then( ()=> {
      $('body > .ui-modal').remove();
      get(self, 'notification').success('<strong>密码修改成功！！！</strong>');
      set(self, "isLoading", false);
    })
    .catch((err) => {
      console.error(err); //eslint-disable-line
      get(self, 'notification').error('<strong>修改失败！！！</strong>');
    });
  }
})
