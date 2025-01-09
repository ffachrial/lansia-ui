// app/api/posyandu/[id]/route.js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getGender } from '@/lib/helpers';

export async function GET(request, { params}) {
  try {
    // Await clientPromise before accessing params
    const client = await clientPromise;
    await client.connect(); // Ensure the client is fully connected
    const db = client.db(process.env.DATABASE_NAME);

    // Debug: Verify client and DB
    console.log("Client Connection Established:", Boolean(client));
    console.log("Database Name:", process.env.DATABASE_NAME);
    
    const resident = await db
      .collection("resident")
      .findOne({ _id: new ObjectId(params.id) });

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
          id: visit._id.toString(),
          date: visit.visit_date,
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

    // // Attempt reinitialization if client fails
    // if (error.name === "MongoNotConnectedError") {
    //   console.log("Reinitializing MongoDB client...");
    //   const newClient = new MongoClient(process.env.DATABASE_CONNECTION_STRING);
    //   await newClient.connect();
    //   const db = newClient.db(process.env.DATABASE_NAME);

    //   const resident = await db.collection("resident").findOne({ _id: new ObjectId(params.id) });
    // }

    // throw error;

    return new Response(
      JSON.stringify({ error: 'Failed to fetch resident' }),
      { status: 500 }
    );
  }
}