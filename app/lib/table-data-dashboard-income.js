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
              label: item.DataSum,
            }
          },
          {
            item: {
              label: item.RedSum,
            }
          },
        ]
    });
};
