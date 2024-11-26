const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const today = formatDate(new Date());
  const startOfMonth = formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const threeMonthsAgo = formatDate(new Date(new Date().setMonth(new Date().getMonth() - 3)));
  const startOfYear = formatDate(new Date(new Date().getFullYear(), 0, 1));

  const filterData = (
    filterBy: string,
    value: { from?: string; to?: string; items?: string },
    data: Transaction[]
) => {
    let filteredData = [...data];

    switch (filterBy) {
        case "date":
            if (value.from || value.to) {
                filteredData = filteredData.filter((transaction) => {
                    const transactionDate = transaction.date;

                    const isAfterFrom = value.from ? transactionDate >= value.from : true;
                    const isBeforeTo = value.to ? transactionDate <= value.to : true;

                    return isAfterFrom && isBeforeTo;
                });
            }
            break;

        case "limit":
            if (value.items) {
                const limit = parseInt(value.items, 10);
                filteredData = filteredData.slice(0, limit);
            }
            break;

        default:
            filteredData = filteredData.slice(0, 5);
            break;
    }

    return filteredData;
};

  export {today, startOfMonth, threeMonthsAgo, startOfYear, filterData}

