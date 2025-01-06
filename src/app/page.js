// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [status, setStatus] = useState("Checking...");

//   useEffect(() => {
//     fetch("/api/test-connection-mongodb")
//       .then((res) => res.json())
//       .then((data) => setStatus(data.message))
//       .catch(() => setStatus("Failed to connect to MongoDB Atlas"));
//   }, []);

//   return (
//     <div style={{ fontFamily: "Arial", padding: "20px" }}>
//       <h1>MongoDB Atlas Connection Test</h1>
//       <p>Status: {status}</p>
//     </div>
//   );
// }

"use client";

import CardComponent from "@/components/CardComponent";
import TabNavigation from "@/components/TabNavigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Checking MongoDB...");
  const [testType, setTestType] = useState("mongodb"); // State to manage test type

  useEffect(() => {
    const apiEndpoint =
      testType === "mongodb"
        ? "/api/test-connection-mongodb"
        : "/api/test-connection-supabase";

    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => setStatus(data.message || "Connection successful"))
      .catch(() => setStatus(`Failed to connect to ${testType === "mongodb" ? "MongoDB" : "Supabase"}`));
  }, [testType]);

  const toggleTestType = () => {
    setTestType((prev) => (prev === "mongodb" ? "supabase" : "mongodb"));
    setStatus("Checking...");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>{testType === "mongodb" ? "MongoDB Atlas" : "Supabase"} Connection Test</h1>
      <p>Status: {status}</p>
      <button onClick={toggleTestType}>
        Test {testType === "mongodb" ? "Supabase" : "MongoDB"}
      </button>
    </div>
  );
}

// project-root/
// ├── src/
// │   ├── app/
// │   │   ├── api/
// │   │   │   ├── test-connection-mongodb/
// │   │   │   │   └── route.js
// │   │   ├── home/
// │   │   │   └── page.js
// │   │   ├── login/
// │   │   │   └── page.js
// │   │   ├── globals.css
// │   │   ├── layout.js
// │   │   └── page.js
// │   ├── components/
// │   │   ├── CardComponent.js
// │   │   ├── SearchCard.js
// │   │   └── TabNavigation.js
// │   ├── lib/
// │   │   ├── mongodb.js
// │   │   └── supabase.js
// ├── .env.local
// ├── package.json
// ├── next.config.js
// ├── postcss.config.js
// ├── tailwind.config.js
// ├── public/
// │   ├── next.svg
// │   ├── vercel.svg
// │   ├── file.svg
// │   ├── globe.svg
// │   └── window.svg

// {
//   "_id": "659b687c3f5b4bc6ab93ec5f",
//   "nama_lengkap": "Haura",
//   "dob": "2023-08-26T00:00:00.000",
//   "growth_data": {
//       "berat_badan_resident": 9.7,
//       "last_visit_date": "2024-12-24T17:23:44.089551",
//       "lingkar_lengan_resident": 15.5,
//       "tinggi_badan_resident": 74,
//       "hadir_resident": false,
//       "lingkar_kepala_resident": 49
//   }
// }
