import Service from 'ember-service';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import apiUrl from '../lib/config';

export default Service.extend({
  cformAjax: inject('cform-ajax'),
  ajax: inject(),

  /**
   * 用户登录
   *
   * @param {any} useName
   * @param {any} password
   * @returns
   */
  reqUserLogin(data) {
    return get(this, 'ajax').post(apiUrl.UserLogin, {data}).then((res) => {
      if (res.IsSuccess) {
        return res.Result
      } else {
        throw res.Message;
      }
    })
  },

  /**
   * 登出
   * @param token
   * @returns {*}
   */
  reqUserSignOut(token) {
    return get(this, 'ajax').request(`${apiUrl.UserSignOut}?token=${token}`, {
      method: 'GET'
    })
  },


  /**
   * 用户重置密码
   * @param newPWD
   * @param oldPWD
   * @returns {*}
   */
  reqUserChangePwd(newPWD, oldPWD) {
    return get(this, 'cformAjax').request(`${apiUrl.ChangePwd}?newPWD=${newPWD}&oldPWD=${oldPWD}`)
  },


  /**
   * 获取dashoard数据
   *
   * @returns
   */
  reqDashboard() {
    return get(this, 'cformAjax').request(apiUrl.GetTopData, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- user --------------------------------------------------------- */

  /**
   * 获取用户信息， 总用户数，组织数，等等
   *
   * @param {number} [type=2]
   * @returns
   */
  reqUserTotalData() {
    return get(this, 'cformAjax').request(`${apiUrl.GetUserTotalData}`, {
      method: 'GET'
    })
  },

  /**
   * 根据时间查找
   * @param type
   *
   * @example type=1:日，2:周， 3:月
   */
  reqTopUserBydate(type) {
    return get(this, 'cformAjax').request(`${apiUrl.GetTopUserBydate}?type=${type}`, {
      method: 'GET'
    })
  },


  /**
   * 获取所有的用户信息列表
   *
   * @param {number} [pageIndex=0]
   * @param {number} [pageSize=20]
   * @param {any} sort
   * @param {any} queryStr
   * @returns
   */
  reqUserDetailList(pageIndex = 0, pageSize = 20, sort, queryStr) {
    const _sort = sort ? `&sort=${sort}` : '';
    const _queryStr = queryStr ? `&queryStr=${queryStr}` : '';
    return get(this, 'cformAjax').request(`${apiUrl.GetUserDetailList}?pageIndex=${pageIndex}&pageSize=${pageSize}${_sort}${_queryStr}`, {
      method: 'GET'
    })
  },


  /**
   * 用户锁住/解锁
   *
   * @param {any} uGuid
   * @param {any} enableFlag
   * @returns
   */
  reqUserLock(uGuid, enableFlag) {
    return get(this, 'cformAjax').request(`${apiUrl.UserLock}?uGuid=${uGuid}&enableFlag=${enableFlag}`, {
      method: 'GET',
      dataType: 'text'
    })
  },

  /**
   * 用户邮箱验证通过
   *
   * @param {any} userID
   * @returns
   */
  reqEmailVerification(userID) {
    return get(this, 'cformAjax').request(`${apiUrl.EmailVerification}?userID=${userID}`, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- Form --------------------------------------------------------- */

//问卷概要，问卷总数，发布总数， 在线总数
  reqFormTopData() {
    return get(this, 'cformAjax').request(apiUrl.GetFormTopData, {
      method: 'GET'
    })
  },

//问卷发布，创建，停止收集根据日期段获取。
  reqFormTopDataByDate(type) {
    return get(this, 'cformAjax').request(`${apiUrl.GetFormTopDataByDate}?type=${type}`, {
      method: 'GET'
    })
  },

  reqFormDetailList(pageIndex = 0, pageSize = 20, sort, queryStr) {
    const _sort = sort ? `&sort=${sort}` : '';
    const _queryStr = queryStr ? `&queryStr=${queryStr}` : '';
    return get(this, 'cformAjax').request(`${apiUrl.GetFormDetailList}?pageIndex=${pageIndex}&pageSize=${pageSize}${_sort}${_queryStr}`, {
      method: 'GET'
    })
  },

  reqFormTop(quesid) {
    return get(this, 'cformAjax').request(`${apiUrl.SetFormTop}?quesid=${quesid}`, {
      method: 'GET'
    })
  },

  reqFormLock(quesid) {
    return get(this, 'cformAjax').request(`${apiUrl.SetFormLock}?quesid=${quesid}`, {
      method: 'GET'
    })
  },

  reqFormDetailData(quesID, serchText = '') {
    return get(this, 'cformAjax').request(`${apiUrl.GetFormDetailData}?quesID=${quesID}&serchText=${serchText}`, {
      method: 'GET'
    })
  },
  reqFormDesign(quesID) {
    return get(this, 'cformAjax').request(`${apiUrl.SetFormDesign}?quesID=${quesID}`, {
      method: 'GET'
    })
  },
  reqFormDelete(companyID, quesId) {
    return get(this, 'cformAjax').request(`${apiUrl.SetFormDelete}?companyID=${companyID}&quesId=${quesId}`, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- User-View --------------------------------------------------------- */
  reqViewTopData() {
    return get(this, 'cformAjax').request(`${apiUrl.GetViewTopData}`, {
      method: 'GET'
    })
  },

  reqViewTopDataByDate(type) {
    return get(this, 'cformAjax').request(`${apiUrl.GetGetViewTopDataByDate}?type=${type}`, {
      method: 'GET'
    })
  },

  reqUserViewList(pageIndex = 0, pageSize = 20, sort, queryStr) {
    const _sort = sort ? `&sort=${sort}` : '';
    const _queryStr = queryStr ? `&queryStr=${queryStr}` : '';
    return get(this, 'cformAjax').request(`${apiUrl.GetUserViewList}?pageIndex=${pageIndex}&pageSize=${pageSize}${_sort}${_queryStr}`, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- inCome --------------------------------------------------------- */
  reqInComeTopData() {
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalTopData}?isIncome=1`, {
      method: 'GET'
    })
  },

  reqInComeTopDataByDate(type) {
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalTopDataByDate}?isIncome=1&type=${type}`, {
      method: 'GET'
    })
  },

  reqInComeViewList(pageIndex = 0, pageSize = 20, sort, queryStr) {
    const _sort = sort ? `&sort=${sort}` : '';
    const _queryStr = queryStr ? `&queryStr=${queryStr}` : '';
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalList}?isIncome=1&pageIndex=${pageIndex}&pageSize=${pageSize}${_sort}${_queryStr}`, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- payMent --------------------------------------------------------- */
  reqPaymentTopData() {
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalTopData}?isIncome=0`, {
      method: 'GET'
    })
  },

  reqPaymentTopDataByDate(type) {
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalTopDataByDate}?isIncome=0&type=${type}`, {
      method: 'GET'
    })
  },

  reqPaymentViewList(pageIndex = 0, pageSize = 20, sort, queryStr) {
    const _sort = sort ? `&sort=${sort}` : '';
    const _queryStr = queryStr ? `&queryStr=${queryStr}` : '';
    return get(this, 'cformAjax').request(`${apiUrl.GetCapitalList}?isIncome=0&pageIndex=${pageIndex}&pageSize=${pageSize}${_sort}${_queryStr}`, {
      method: 'GET'
    })
  },

  /**---------------------------------------------------- Nodes --------------------------------------------------------- */

  reqNodeTopData() {
    return get(this, 'cformAjax').request(`${apiUrl.GetTopSummaryData}`, {
      method: 'GET'
    })
  },
});
