import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Prayer from "./components/Prayer";

// import Prayer from "./components/Prayer";
// import prayer from "./components/Prayer";

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
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <div className=" w-10/12 mx-auto my-8 border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.prayers?.map((prayer: PrayerData) => (
            <Prayer key={prayer.title} prayer={prayer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
