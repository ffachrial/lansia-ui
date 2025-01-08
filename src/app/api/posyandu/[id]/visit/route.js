import clientPromise from "@/lib/mongodb"; // Adjust the path based on your project structure
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  const { residentId } = params;
    console.log("residentId", residentId);
  if (!ObjectId.isValid(residentId)) {
    return new Response(JSON.stringify({ error: "Invalid resident ID" }), {
      status: 400,
    });
  }

  try {
    const body = await req.json();
    const { visitDate, updatedVisit } = body;
    
    if (!visitDate || !updatedVisit) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Replace with your database name if needed
    const residentsCollection = db.collection("resident"); // Replace with your collection name

    // Update the visit record in the resident's visit history
    const result = await residentsCollection.updateOne(
      { _id: new ObjectId(residentId), "growth_data.visit_history.visit_date": visitDate },
      {
        $set: {
          "growth_data.visit_history.$": { ...updatedVisit, visit_date: visitDate },
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Visit not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Visit updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating visit:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
