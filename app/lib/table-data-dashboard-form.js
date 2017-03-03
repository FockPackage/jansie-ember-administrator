export const tableDatas =(ListView)=>{
    return ListView.map((item) => {
      return [
          {
            item: {
              label: item.QNumber,
              badges: item.TopFlag && '置顶',
            }
          },
          {
            item: {
              label: item.QTitle,
              badges: item.Qstatus
            }
          },
          {
            item: {
              label: item.UserName,
            }
          },
          {
            item: {
              label: item.SubmitCount
            }
          },
          {
            item: {
              label: item.PublishCount
            }
          },
          {
            item: {
              label: item.PublishDate
            }
          },
          {
            item: {
              label: item.Qstatus
            }
          },
          {
            currentRow:item
          }
        ]
    });
}
