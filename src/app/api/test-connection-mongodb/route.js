import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("kavetoo"); // Replace "kavetoo" with your database name

    await db.command({ ping: 1 });

    return new Response(
      JSON.stringify({ message: "Connected to MongoDB Atlas successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ message: "Failed to connect to MongoDB Atlas" }),
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("kavetoo"); // Replace "kavetoo" with your database name
//     const residents = await db
//       .collection("resident")
//       .find({})
//       .sort({ nama_lengkap: 1 }) // Sort by name in ascending order
//       .limit(5) // Limit to 10 documents
//       .toArray();

//     return new Response(
//       JSON.stringify({ message: "Data fetched successfully!", data: residents }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ message: "Failed to fetch data", error: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
