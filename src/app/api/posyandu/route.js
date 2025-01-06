import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Parse query parameters
    const url = new URL(request.url);
    const rt = url.searchParams.get('rt');
    const age = url.searchParams.get('age');

    // Query the database to get all residents
    let residents = await db
      .collection("resident")
      .find({})
      .sort({ nama_lengkap: 1 }) // Sort by name in ascending order
      .toArray();

    // Filter residents based on rt if provided
    if (rt) {
      const rtArray = rt.split(',').map(rt => rt.trim());
      residents = residents.filter((resident) => rtArray.includes(resident.alamat.rt));
    }

    // Filter residents based on age if provided
    if (age) {
      const ageRanges = age.split(',').map(range => {
        const [min, max] = range.split('-').map(Number);
        return { min, max };
      });

      residents = residents.filter((resident) => {
        const ageInMonths = calculateAgeInMonths(resident.dob);
        return ageRanges.some(range => ageInMonths >= range.min && ageInMonths <= range.max);
      });
    }

    // Split the residents into hadirBalita and tidakHadirBalita based on hadir_resident field
    const hadirBalita = residents.filter((resident) => resident.growth_data.hadir_resident === true);
    const tidakHadirBalita = residents.filter((resident) => resident.growth_data.hadir_resident === false);

    // Return the response as JSON
    return new Response(
      JSON.stringify({
        hadirBalita: hadirBalita.map((resident) => ({
          id: resident._id,
          name: resident.nama_lengkap,
          age: calculateAge(resident.dob),
          gender: getGender(resident.gender), // Assuming there's a gender field in the data, adjust if necessary
        })),
        tidakHadirBalita: tidakHadirBalita.map((resident) => ({
          id: resident._id,
          name: resident.nama_lengkap,
          age: calculateAge(resident.dob),
          gender: getGender(resident.gender), // Assuming there's a gender field in the data, adjust if necessary
        })),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching residents:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch residents' }),
      { status: 500 }
    );
  }
}

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