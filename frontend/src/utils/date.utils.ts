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

  export {today, startOfMonth, threeMonthsAgo, startOfYear}