export const tableDatas =(ListView)=>{
    return ListView.map((item) => {
      return [
          {
            item: {
              label: item.index,
            }
          },
          {
            item: {
              label: item.name
            }
          },
          {
            item: {
              label: item.count,
            }
          },
          {
            item: {
              label: item.progress + '%',
            }
          },
        ]
    });
};
