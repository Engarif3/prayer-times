// import "./App.css";
// import { useQuery, gql } from "@apollo/client";
// import Prayer from "./components/Prayer";

// // import Prayer from "./components/Prayer";
// // import prayer from "./components/Prayer";

// export interface PrayerData {
//   title: string;
//   prayerTime: string;
//   author: { name: string; id: number };
// }

// const GET_POST = gql`
//   query userWithPost {
//     prayers {
//       title
//       prayerTime
//       author {
//         name
//         id
//       }
//     }
//   }
// `;

// function App() {
//   const { loading, error, data } = useQuery(GET_POST);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   return (
//     <>
//       <div className=" w-10/12 mx-auto my-8 border">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {data.prayers?.map((prayer: PrayerData) => (
//             <Prayer key={prayer.title} prayer={prayer} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Prayer from "./components/Prayer";

export interface PrayerData {
  title: string;
  prayerTime: string;
  author: { name: string; id: number };
}

const GET_POST = gql`
  query userWithPost {
    prayers {
      title
      prayerTime
      author {
        name
        id
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const prayerSequence = ["Fajr", "Dhur", "Asr", "Maghrib", "Isha", "Jumu'ah"];

  // Ensure data.prayers exists and is an array
  if (!data || !Array.isArray(data.prayers)) {
    return <p>No prayer data available</p>;
  }

  // Sort the prayers array based on the prayer sequence
  const sortedPrayers = data.prayers
    .slice()
    .sort((a: PrayerData, b: PrayerData) => {
      const indexA = prayerSequence.indexOf(a.title);
      const indexB = prayerSequence.indexOf(b.title);

      // If the title is not found in the sequence, assign it Infinity so it appears at the end
      const rankA = indexA === -1 ? Infinity : indexA;
      const rankB = indexB === -1 ? Infinity : indexB;

      return rankA - rankB;
    });

  return (
    <>
      <div className="w-10/12 mx-auto my-8 border bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedPrayers.map((prayer: PrayerData) => (
            <Prayer key={prayer.title} prayer={prayer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
