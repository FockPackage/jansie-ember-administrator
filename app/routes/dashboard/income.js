import Route from "ember-route";
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {tableDatas} from '../../lib/table-data-dashboard-income';
import RSVP from 'rsvp'

export default Route.extend({
  api: inject('api'),

  model() {
    return RSVP.hash({
      totalData: get(this, 'api').reqInComeTopData(),
      totalDataByDay: get(this, 'api').reqInComeTopDataByDate(1),
      totalDataByWeek: get(this, 'api').reqInComeTopDataByDate(2),
      totalDataByMooth: get(this, 'api').reqInComeTopDataByDate(3),

      detailList: get(this, 'api').reqInComeViewList(0, 20).then(res => {
        const ListView = res.ListView;
        const theads = [
          {
            key: 'UserName',
            label: '用户名',
          },
          {
            key: 'DataSum',
            label: '数据包金额',
          },
          {
            key: 'RedSum',
            label: '红包金额',
          }
        ];
        const tbodys = tableDatas(ListView);
        return {
          totalPage:res.TotalPage,
          theads,
          tbodys,
        }
      }),
    }
    )
  },

  actions:{
    getTableDatas(dataList){
      return tableDatas(dataList);
    }
  }
});
