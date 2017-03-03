import Route from "ember-route";
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {tableDatas} from '../../lib/table-data-dashboard-utilization';
import RSVP from 'rsvp'

export default Route.extend({
  api: inject('api'),

  model() {
    return RSVP.hash({
      totalData: get(this, 'api').reqViewTopData().then(res => res),
      totalDataByDay: get(this, 'api').reqViewTopDataByDate(1).then(res => res),
      totalDataByWeek: get(this, 'api').reqViewTopDataByDate(2).then(res => res),
      totalDataByMooth: get(this, 'api').reqViewTopDataByDate(3).then(res => res),

      detailList: get(this, 'api').reqUserViewList(0, 20).then(res => {
        const ListView = res.ListView;
        const theads = [
          {
            key: 'UserName',
            label: '用户名',
          },
          {
            key: 'Dashboard',
            label: '主页',
          },
          {
            key: 'Editor',
            label: '设计端',
          },
          {
            key: 'Result',
            label: '数据端',
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
