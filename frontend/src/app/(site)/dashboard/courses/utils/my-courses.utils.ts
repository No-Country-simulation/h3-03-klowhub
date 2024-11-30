const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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

const sortByCustomerName = (order: string, data: Transaction[]) => {
    console.log("entro")
    return data.sort((a, b) => {
        const nameA = a.customerName.trim().toLowerCase();
        const nameB = b.customerName.trim().toLowerCase();

        console.log(nameA, nameB)
        
        const comparison = nameA.localeCompare(nameB);
        return order === "asc" ? comparison : -comparison;
    });
};

const sortByAmount = (order: string, data: Transaction[]) => {
    return data.sort((a, b) => {
        return order === "asc" ?  b.amount - a.amount : a.amount - b.amount;
    });
};

const sortByState = (order: string, data: Transaction[]) => {
    return data.sort((a, b) => {
        const comparison = a.status.localeCompare(b.status);
        return order === "asc" ? comparison : -comparison;
    });
};

const sortByDate = (order: string, data: Transaction[]) => {
    return data.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
    });
};

const sortData = (
    sortBy: string,
    order : string ,
    data: Transaction[]
): Transaction[] => {
    let sortedData = [...data];

    switch (sortBy) {
        case "customerName":
            sortedData = sortByCustomerName(order, data);
            break;

        case "amount":
            sortedData = sortByAmount(order, data);
            break;

        case "state":
            sortedData = sortByState(order, data);
            break;

        case "date":
            sortedData = sortByDate(order, data);
            break;

        default:
            break;
    }

    return sortedData;
};

  export {today, startOfMonth, threeMonthsAgo, startOfYear, filterData, sortData}

