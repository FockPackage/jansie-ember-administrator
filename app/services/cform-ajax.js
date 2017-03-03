import AjaxService from 'ember-ajax/services/ajax';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

export default AjaxService.extend({
  session: inject(),
  _routing: inject('-routing'),
  notification: inject('ui-notification'),
  loadingSlider:inject(),

  headers: computed('session.data.authenticated.Token', {
    get() {
      let headers = {};
      const accessToken = get(this, 'session.data.authenticated.Token');
      if (accessToken) {
        headers["token"] = accessToken;
      }
      return headers;
    }
  }),

  request(url, options = {}) {
    get(this, 'loadingSlider').changeAttrs({
      expanding: false,
      color: false,
      speed: 500
    });
    get(this, 'loadingSlider').startLoading();
    return this._super(url, options)
      .then(response => {
        get(this, 'loadingSlider').endLoading();
        console.log(response);
        if (response.IsSuccess) {
          return response.Result;
        } else {
          if (response.Result && !response.Result.Islogin) {
            get(this, '_routing').transitionTo('login');
            get(this,'notification').info('<strong>登陆超时，请重新登陆</strong>');
            return response;
          } else {
            return response;
          }
        }
      })
  },

  post(url, options) {
    get(this, 'loadingSlider').changeAttrs({
      expanding: false,
      color: false,
      speed: 500
    });
    get(this, 'loadingSlider').startLoading();
    return this._super(url, options)
      .then(response => {
        get(this, 'loadingSlider').endLoading();
        if (response.IsSuccess) {
          return response.Result;
        } else {
          if (response.Result && !response.Result.Islogin) {
            get(this, '_routing').transitionTo('login');
            return response;
          } else {
            throw response.Message;
          }
        }
      }).catch((err)=>{
        get(this, 'loadingSlider').endLoading();
        console.info(err); //eslint-disable-line
        get(this,'notification').error('<strong>数据请求错误！！</strong>');
      });
  },
    trustedHosts: [
    'localhost', '192.168.0.150', 'admin.csvfx.com'
  ],
});
