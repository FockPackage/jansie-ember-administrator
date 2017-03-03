import Component from 'ember-component';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';


export default Component.extend({
  api: inject(),
  session: inject(),
  _routing: inject('-routing'),
  reset: inject('reset-pwd'),


  actions: {

    /**
     * 先清除session的所有数据
     * 跳转到首页
     * 请求后台API接口，告诉后台我已经退出
     */
    handleSignOut() {
      get(this, 'session').invalidate();
      get(this, '_routing').transitionTo('login');
      get(this, 'api').reqUserSignOut(get(this, 'session.data.authenticated.Token')).then(() => {
        get(this, '_routing').transitionTo('login');
      }).catch((err) => {
        console.log(err); //eslint-disable-line
      })
    },

    handleProfile() {
      get(this, 'modal').show('components/account/profile', {
        isLoading: false,
      });
    },



    handleResetPwd() {
      get(this, 'modal').show('components/account/reset-pwd', {
        isLoading: false,
        formValue: get(this, "reset.formValue"),

        actions: {
          handleResetPwd: () => {
            get(this, 'reset.handleResetPwd')(get(this, "reset"));
          },
        }
      });
    }
  }
});
