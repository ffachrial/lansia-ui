// /api/posyandu/[id]/update-hadir/route.js
import { connectToDatabase } from "@/lib/mongodb-new"; // Adjust import based on your setup
import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
export async function POST(req) {
  try {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  // Extract ID from the URL path
  const { pathname } = req.nextUrl;
  const id = pathname.split('/')[3]; // Adjust index based on route structure


  // const { hadirResident } = req.body;
  // const { id } = req.query;
  const residentStatus = await req.json();
  console.log('Hadir Resident:', residentStatus.hadirResident);
  // if (typeof hadirResident !== "boolean") {
  //   return new Response(
  //     JSON.stringify({ message: 'Invalid request: Invalid data format' }),
  //     { status: 400, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  // try {
    const { db } = await connectToDatabase();
    const formattedHadirResident = {
      hadir_resident: residentStatus.hadirResident
    };
    console.log('Formatted Hadir Resident:', formattedHadirResident);
    const result = await db.collection("resident").updateOne(
      { _id: new ObjectId(id) },
      { $set: { "growth_data.hadir_resident": residentStatus.hadirResident } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Failed to update resident_hadir' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // res.status(200).json({ message: "Status updated successfully" });
    return new Response(
      JSON.stringify({ message: 'Status updated successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to update', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
