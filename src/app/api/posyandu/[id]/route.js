// app/api/posyandu/[id]/route.js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getGender } from '@/lib/helpers';

export async function GET(request, context) {
  try {
    // Properly extract id from context
    // const id = context.params.id;

    // Await clientPromise before accessing params
    const client = await clientPromise;
    // console.log('client connected:', !!client); // Check client connection
    // console.log('context.params:', await context.params); // Inspect params before destructuring
    
    // Now destructure params.id after database connection
    const { params: { id } } = await context; 

    const db = client.db(process.env.MONGODB_DB);
    
    const resident = await db
      .collection("resident")
      .findOne({ _id: new ObjectId(id) });

    if (!resident) {
      return new Response(
        JSON.stringify({ error: 'Resident not found' }),
        { status: 404 }
      );
    }

    // Calculate age for display
    const birthDate = new Date(resident.dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }

    const age = `${years} Tahun ${months} Bulan`;

    // Format the response data
    const formattedResident = {
      id: resident._id.toString(),
      name: resident.nama_lengkap,
      age: age,
      // phoneNumber: resident.phonenumber,
      gender: getGender(resident.gender),
      address: `Blok ${resident.alamat.blok} No ${resident.alamat.no_rumah}, RT ${resident.alamat.rt}`,
      growthData: {
        weight: resident.growth_data.berat_badan_resident,
        height: resident.growth_data.tinggi_badan_resident,
        armCircumference: resident.growth_data.lingkar_lengan_resident,
        headCircumference: resident.growth_data.lingkar_kepala_resident,
        visitHistory: resident.growth_data.visit_history.map(visit => ({
          date: new Date(visit.visit_date).toLocaleDateString('id-ID'),
          weight: visit.berat_badan,
          height: visit.tinggi_badan,
          armCircumference: visit.lingkar_lengan,
          headCircumference: visit.lingkar_kepala
        }))
      }
    };

    return new Response(
      JSON.stringify(formattedResident),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching resident:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch resident' }),
      { status: 500 }
    );
  }
}