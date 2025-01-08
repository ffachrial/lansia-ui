import clientPromise from "@/lib/mongodb"; // Adjust the path based on your project structure
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const residentId = params.id;
    const visitData = await request.json();

    // Validate the required fields
    if (!visitData._id || !residentId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);
    const collection = db.collection("resident");

    // Update the specific visit in the visit_history array
    const result = await collection.updateOne(
      {
        _id: new ObjectId(residentId),
        // "growth_data.visit_history._id": new ObjectId(visitData._id)
        "growth_data.visit_history._id": visitData._id
      },
      {
        $set: {
          "growth_data.visit_history.$": {
            _id: visitData._id,
            visit_date: visitData.visit_date,
            tinggi_badan: visitData.tinggi_badan,
            berat_badan: visitData.berat_badan,
            lingkar_kepala: visitData.lingkar_kepala,
            lingkar_lengan: visitData.lingkar_lengan
          },
          // Update the latest measurements in growth_data
          "growth_data.berat_badan_resident": visitData.berat_badan,
          "growth_data.tinggi_badan_resident": visitData.tinggi_badan,
          "growth_data.lingkar_kepala_resident": visitData.lingkar_kepala,
          "growth_data.lingkar_lengan_resident": visitData.lingkar_lengan,
          "growth_data.last_visit_date": visitData.visit_date
        }
      }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Resident or visit not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No changes were made" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Visit updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating visit:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}