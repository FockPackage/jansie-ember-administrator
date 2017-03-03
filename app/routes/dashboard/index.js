import Route from 'ember-route';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import RSVP from 'rsvp';

export default Route.extend({
  session: inject(),
  api: inject('api'),

  model(){
    return RSVP.hash({
      //收入
      income: get(this, 'api').reqInComeTopData(),

      //支出
      payment: get(this, 'api').reqPaymentTopData().then(res=>{
        return {
          TotalCapital: Math.round(res.TotalCapital),
          DataSum: Math.round(res.DataSum),
          RedSum: Math.round(res.RedSum),
        }
      }),

      //用户
      user: get(this, 'api').reqUserTotalData(),

      //问卷
      form: get(this, 'api').reqFormTopData(),

     //访问量
      utilization: get(this, 'api').reqViewTopData().then(res => res),

    })
  }
});
