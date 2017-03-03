import Route from "ember-route";
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {tableDatas} from '../../lib/table-data-dashboard-form';
import RSVP from 'rsvp';


export default Route.extend({
  api: inject('api'),

  model() {
    return RSVP.hash({
        totalData: get(this, 'api').reqFormTopData(),
        totalDataByDay: get(this, 'api').reqFormTopDataByDate(1),
        totalDataByWeek: get(this, 'api').reqFormTopDataByDate(2),
        totalDataByMooth: get(this, 'api').reqFormTopDataByDate(3),

        detailList: get(this, 'api').reqFormDetailList(0, 20).then(res => {
        const ListView = res.ListView;
        const theads = [
          {
            key: 'QNumber',
            label: '问卷编号',
          },
          {
            key: 'QTitle',
            label: '问卷名称',
          },
          {
            key: 'UserName',
            label: '创建人',
          },
          {
            key: 'SubmitCount',
            label: '已回收数据',
          },
          {
            key: 'PublishCount',
            label: '发布总数',
          },
          {
            key: 'PublishDate',
            label: '发布日期',
          },
          {
            key: 'Qstatus',
            label: '状态',
          },
        ];
        const tbodys = tableDatas(ListView);
        return {
          totalPage: res.TotalPage,
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
