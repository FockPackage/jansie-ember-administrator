import Component from 'ember-component';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';


export default Component.extend({
  api: inject(),
  currentRow:'',
  actions: {

    /**
     * 用户解锁或锁住
     *
     */
    handleUserLock(currentRow) {
      const userID = currentRow.UserID;
      get(this, 'modal').confirm('components/alert/confirm', {
        formName: currentRow.EnableFlag == 'Y' ? '是否需要锁定' : '是否需要解除锁定？',
      }).then(()=>{
        const enableFlag = currentRow.EnableFlag == 'Y' ? 'N' : 'Y' ;
        get(this, 'api').reqUserLock(userID, enableFlag).then(()=> get(this, 'handlerefreshCurrentpage')());
      })
    },
    /**
     * 用户邮箱验证
     *
     */
    handleEmailVerification(currentRow) {
      const userID = currentRow.UserID;
      const emailStatus = currentRow.EmailStatus;
      if(emailStatus == "已验证") return get(this,'notification').success('<strong>已经验证！！</strong>');
      get(this, 'modal').confirm('components/alert/confirm', {
        formName: '确定邮箱认证？',
      }).then(()=>{
        get(this, 'api').reqEmailVerification(userID).then(() => get(this, 'handlerefreshCurrentpage')());
      })
    },
  }
});
