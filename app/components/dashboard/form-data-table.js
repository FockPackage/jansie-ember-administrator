import Component from 'ember-component';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import {editorUrl, dashboardUrl} from '../../lib/config';

export default Component.extend({
  api: inject('api'),
  _routing: inject('-routing'),
  currentRow: '',
  actions: {

    /**
     * 问卷置顶
     *
     */
    handleFormTop(currentRow) {
      const quesid = currentRow.QuestionnaireID;
      const TopFlag = currentRow.TopFlag;
      get(this, 'modal').confirm('components/alert/confirm', {
        formName: TopFlag ? '取消置顶' : '置顶',
      }).then(()=>{
        get(this, 'api').reqFormTop(quesid).then(() => get(this, 'handlerefreshCurrentpage')());
      })
    },

    /**
     * 问卷锁定
     * @param currentRow
     */
    handleFormLock(currentRow) {
      const quesid = currentRow.QuestionnaireID;
      const qstatus = currentRow.Qstatus;

      get(this, 'modal').confirm('components/alert/confirm', {
        formName: qstatus == '系统锁定' ? '是否需要解除锁定？' : '是否需要锁定',
      }).then(()=>{
        get(this, 'api').reqFormLock(quesid).then(() => get(this, 'handlerefreshCurrentpage')());
      })
    },

    /**
     * 打开设计端
     *
     */
    handleLinkToDesign(currentRow) {
      const quesid = currentRow.QuestionnaireID;
      get(this, 'api').reqFormDesign(quesid).then((viewID) =>{
        window.open(`${editorUrl}?quesID=${quesid}&viewID=${viewID}`);
      });
    },

    /**
     * 打开dashboard
     * @param currentRow
     */
    handleLinkToDashboard(currentRow) {
      const quesid = currentRow.QuestionnaireID;
      get(this, 'api').reqFormDesign(quesid).then((viewID) =>{
        window.open(`${dashboardUrl}/#/form/results/summary/${quesid}&${viewID}`);
      });
    },

    handleFormDelete(currentRow) {
      const quesId = currentRow.QuestionnaireID;
      const companyID = currentRow.CompanyID;
      get(this, 'modal').confirm('components/alert/confirm', {
        formName: '是否要删除?',
      }).then(()=>{
        get(this, 'api').reqFormDelete(companyID, quesId).then(() => get(this, 'handlerefreshCurrentpage')());
      })

    },
  }
});
