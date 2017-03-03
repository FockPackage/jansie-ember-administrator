export const tableDatas =(ListView)=>{
    return ListView.map((item) => {
      return [
          {
            item: {
              label: item.UserName,
            }
          },
          {
            item: {
              label: item.Dashboard
            }
          },
          {
            item: {
              label: item.Editor,
            }
          },
          {
            item: {
              label: item.Result
            }
          }
        ]
    });
};
