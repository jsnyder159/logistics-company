module.exports = {
  // Formate Date as MM/DD/YYYY
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  //Formate large numbers with commas
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
};
