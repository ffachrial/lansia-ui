import { connectToDatabase } from '@/lib/mongodb-new'; // Adjust the path based on your project structure
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    // Extract ID from the URL path
    const { pathname } = req.nextUrl;
    const id = pathname.split('/')[3]; // Adjust index based on route structure

    // Parse JSON body
    const newVisit = await req.json();

    // console.log('ID:', id);
    // console.log('New Visit:', newVisit);
    
    // Validate input
    if (!id || !newVisit || !newVisit.date || !newVisit.weight || !newVisit.height) {
      return new Response(
        JSON.stringify({ message: 'Invalid request: Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Use ObjectId.createFromTime() to create ObjectId
    const timestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    const residentObjectId = ObjectId.createFromTime(timestamp);
    
    // Format the new visit data
    const formattedNewVisit = {
        _id: residentObjectId.toString(),
        visit_date: new Date(newVisit.date),
        tinggi_badan: parseFloat(newVisit.height) || null,
        berat_badan: parseFloat(newVisit.weight) || null,
        lingkar_kepala: parseFloat(newVisit.headCircumference) || null,
        lingkar_lengan: parseFloat(newVisit.armCircumference) || null
    };

    // console.log('Formatted Visit:', formattedNewVisit); // Debug log

    // Update the document
    const result = await db.collection('resident').updateOne(
      { _id: new ObjectId(id) },
      { $push: { 'growth_data.visit_history': formattedNewVisit } }
    );

    // console.log('Update Result:', result); // Log the result of the database operation

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Failed to update visit history' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Visit added successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to add visit', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
