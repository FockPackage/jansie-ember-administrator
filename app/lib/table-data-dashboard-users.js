export const tableDatas =(ListView)=>{
    return ListView.map((item) => {
      return [
          {
            item: {
              label: item.UserNumber,
              badges: item.EnableFlag == 'N' && '锁定'
            }
          },
          {
            item: {
              label: item.UserName
            }
          },
          {
            item: {
              label: item.UserEmail,
              badges: item.EmailStatus == '已验证' && item.EmailStatus
            }
          },
          {
            item: {
              label: item.CreateCount
            }
          },
          {
            item: {
              label: item.PublishCount
            }
          },
          {
            item: {
              label: item.ThirtParty
            }
          },
          {
            item: {
              label: item.CreateDate
            }
          },
          {
            currentRow:item
          }
        ]
    });
}
