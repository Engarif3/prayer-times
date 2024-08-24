import "./App.css";
import { useQuery, gql } from "@apollo/client";

interface Prayer {
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
  if (error) return <p>Error : {error.message}</p>;
  // console.log(data.prayers[0].title);
  const timestamp = data.prayers[0].prayerTime;
  const date = new Date(Number(timestamp)); // Handles both numeric and string input

  // date /= 1000;
  console.log(date);
  return (
    <>
      <div>
        {data.prayers.map((prayer: Prayer) => {
          // Convert `prayerTime` to Date and format it to a readable string
          const date = new Date(Number(prayer.prayerTime)); // If timestamp is in milliseconds
          const formattedDate = !isNaN(date.getTime())
            ? date.toLocaleString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                // hour: "numeric",
                // minute: "numeric",
              }) // Converts to local date and time string
            : "Invalid Date";
          const formattedTime = !isNaN(date.getTime())
            ? date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              }) // Get time without seconds
            : "Invalid Time";

          return (
            <div key={prayer.title}>
              <h2 className="text-3xl font-bold underline">{prayer.title}</h2>
              <p>{formattedDate}</p> {/* Display the formatted date */}
              <p>{formattedTime}</p>
              <p>Author: {prayer.author.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
