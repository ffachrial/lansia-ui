// Helper function to calculate age in years, months, and days
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // If the month difference is negative, adjust the years and months
  if (months < 0) {
    years--;
    months += 12;
  }

  // If the day difference is negative, adjust the months and days
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += prevMonth.getDate();  // Get the number of days in the previous month
  }

  return `${years} Tahun ${months} Bulan ${days} Hari`;
}

// Helper function to calculate age in months
function calculateAgeInMonths(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  return years * 12 + months;
}

// Helper function to get gender
function getGender(gender) {
  if (gender === 'L') {
    return 'Laki-laki';
  } else if (gender === 'P') {
    return 'Perempuan';
  // } else {
  //   return 'Unknown';
  }
}

module.exports = {
  calculateAge,
  calculateAgeInMonths,
  getGender
};