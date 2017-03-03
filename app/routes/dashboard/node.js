import Route from "ember-route";
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {tableDatas} from '../../lib/table-data-dashboard-node';

export default Route.extend({
  api: inject('api'),

  model() {
    return get(this, 'api').reqNodeTopData().then(res => {
      const NodeNameList = res.NodeNameList;
      const NodeCountList = res.NodeCountList;

      let _namelists = [];
      let totalCount = 0;

      NodeNameList.forEach((item, index)=>{
        if(item.length > 0){
          totalCount = NodeCountList[index] + totalCount,
          _namelists.push({
            index,
            name:item,
          })
        }
      });

      const ListView = _namelists.map((item)=>{
        return {
          index: item.index + 1,
          name: item.name,
          count: NodeCountList[item.index],
          progress: Math.round(NodeCountList[item.index] * 100 / totalCount),
        }
      });

      const theads = [
        {
          label: '排名',
        },
        {
          label: '题型',
        },
        {
          label: '数量',
        },
        {
          label:'百分比',
        }
      ];
      const tbodys = tableDatas(ListView);

      return {
        header: ListView.slice(0,3),

        table:{
          theads,
          tbodys,
        }
      }

    })
  },

  actions: {
    getTableDatas(dataList){
      return tableDatas(dataList);
    }
  }
});
