const domainName = 'csvfx';
const port = '';

const url = `//adminapi.${domainName}.com`; //http://192.168.0.150:7092，  http://admin.csvfx.com:10020
//const url = 'http://192.168.0.150:7092'; //http://192.168.0.150:7092，  http://admin.csvfx.com:10020

export const editorUrl = `//editor.${domainName}.com`;
export const dashboardUrl = `//dashboard.${domainName}.com`;


export default {
  //------------ login or out -------------------
  UserLogin: `${url}/home/ValidateUser`,
  UserSignOut: `${url}/home/SignOut`,

  //-------------dashboard------------------------

  GetTopData: `${url}/DP/GetTopData`,

  //-------------user------------------------
  GetUserTotalData: `${url}/dp/GetTopUserTotal`,
  GetTopUserBydate: `${url}/dp/GetTopUserBydate`,
  GetUserDetailList: `${url}/ST/GetUserDetailList`,
  UserLock: `${url}/EU/EU-LockBtn`,
  EmailVerification: `${url}/EU/EU-CheckEmailBtn`,

  //----------------Form------------------

  GetFormTopData: `${url}/ST/GetQuesTopData`,
  GetFormTopDataByDate: `${url}/ST/GetQuesTopDataByDate`,
  GetFormDateRangeData: `${url}/ST/GetQuesChartData`, //问卷发布，创建，停止收集 根据时间查找
  GetFormDetailList: `${url}/ST/GetQuesDetailList`, //总问卷明细列表
  SetFormTop: `${url}/QC/QC-TopBtn`, //问卷置顶
  SetFormLock: `${url}/QC/QC-LockBtn`, //问卷锁定
  GetFormDetailData: `${url}/QC/GetQuesDetailPageData`, //问卷详情
  SetFormDesign: `${url}/QC/QC-DesignBtn`, //问卷设计
  SetFormDelete: `${url}/QC/QC-DeleteBtn`, //问卷删除

  //----------------用户访问量------------------
  GetViewTopData: `${url}/ST/GetViewTopData`, //用户访问量， dashboard，editor，data
  GetGetViewTopDataByDate: `${url}/ST/GetViewTopDataByDate`, // 用户访问量根据时间，年，月，日
  GetUserViewList: `${url}/ST/GetUserViewList`, //用户访问量列表

  //----------------收入支出------------------
  GetCapitalTopData: `${url}/ST/GetCapitalTopData`, //
  GetCapitalTopDataByDate: `${url}/ST/GetCapitalTopDataByDate`, //年，月，日
  GetCapitalList: `${url}/ST/GetCapitalList`, //列表

  //---------------- 题型 ------------------
  GetTopSummaryData: `${url}/DP/GetTopSummaryData`, // 题型

  //---------------- 重置密码 ------------------
  ChangePwd: `${url}/SY/ChangePwd_operation`, //重置密码

}
