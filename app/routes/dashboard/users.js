import Route from "ember-route";
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {tableDatas} from '../../lib/table-data-dashboard-users';
import RSVP from 'rsvp'

export default Route.extend({
  api: inject('api'),

  model() {
    return RSVP.hash({
      totalData: get(this, 'api').reqUserTotalData(),
      totalDataByDay: get(this, 'api').reqTopUserBydate(1),
      totalDataByWeek: get(this, 'api').reqTopUserBydate(2),
      totalDataByMooth: get(this, 'api').reqTopUserBydate(3),

      detailList: get(this, 'api').reqUserDetailList(0, 20).then(res => {
        const ListView = res.ListView;
        const theads = [
          {
            key: '用户ID',
            label: 'User ID',
          },
          {
            key: '用户名',
            label: 'User Name',
          },
          {
            key: '邮箱地址',
            label: 'Email',
          },
          {
            key: '问卷数量',
            label: 'Form',
          },
          {
            key: '问卷发布数量',
            label: 'Published',
          },
          {
            key: '第三方平台',
            label: 'OAuth',
          },
          {
            key: '创建时间',
            label: 'Account Created',
          },
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
