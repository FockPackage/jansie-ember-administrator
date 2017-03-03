import Component from 'ember-component';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import { alias } from 'ember-computed';
import set, { setProperties } from 'ember-metal/set';

export default Component.extend({
  api: inject('api'),
  classNames:['user-details'],
  currentPage: 0,
  searchValue:'',
  currentRow:'',
  totalPage: alias('detailList.totalPage'),

  actions: {
    /**
     * 列表排序
     *
     * @param {any} key
     * @param {any} sort
     */
    handleSort(key, sort) {
      get(this, 'api')[get(this, 'apiName')](0, 20, `${key} ${sort}`).then(res => {
        const tbodys = get(this, 'table-datas')(res.ListView);
        setProperties(this, {
          'currentPage': 0,
          searchValue:'',
          'detailList.tbodys': tbodys
        });
      })
    },

    handleSelectIndex(index) {

      const totalPage = get(this, 'totalPage');
      const _index = (index >= totalPage) ? totalPage - 1 : index;
      get(this, 'api')[get(this, 'apiName')](_index, 20).then(res => {
        const tbodys = get(this, 'table-datas')(res.ListView);
        setProperties(this, {
          'currentPage': _index,
          'detailList.tbodys': tbodys,
          searchValue:'',
        })
      })
    },

    handleSearch(value) {
      get(this, 'api')[get(this, 'apiName')](0, 20, '', value).then(res => {
        const tbodys = get(this, 'table-datas')(res.ListView);
         setProperties(this, {
          'currentPage': 0,
           searchValue:value,
          'detailList.tbodys': tbodys,
        })
      })
    },

    handlePrePage() {
      const currentPage = get(this, 'currentPage') - 1;
      set(this, 'currentPage', currentPage <= 0 ? 0 : currentPage);
      get(this, 'api')[get(this, 'apiName')](get(this, 'currentPage'), 20).then(res => {
        const tbodys = get(this, 'table-datas')(res.ListView);
        setProperties(this, {
          'detailList.tbodys': tbodys,
          searchValue:'',
        })
      })
    },

    handleNextPage() {
      const currentPage = get(this, 'currentPage') + 1;
      const totalPage = get(this, 'totalPage');
      set(this, 'currentPage', currentPage >= totalPage ? totalPage - 1 : currentPage);
      get(this, 'api')[get(this, 'apiName')](get(this, 'currentPage'), 20).then(res => {
        const tbodys = get(this, 'table-datas')(res.ListView);
        setProperties(this, {
          'detailList.tbodys': tbodys,
          searchValue:'',
        })
      })
    },

    handlerefreshCurrentpage(){
      const searchValue = get(this,'searchValue');
      const currentPage = get(this,'currentPage');
      if(searchValue){
        this.send('handleSearch', searchValue);
        return ;
      }
      this.send('handleSelectIndex', currentPage);
    }
  }
});
