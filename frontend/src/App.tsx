import { useEffect, useState } from "react";
import "./App.css";
import Prayer from "./components/Prayer";

export interface PrayerData {
  title: string;
  prayerTime: string;
}

const prayerSequence = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumu'ah"];

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const fetchPrayerTimes = async (date: string) => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=50.816381&longitude=12.930562&altitude=300`
    );
    const result = await response.json();
    const timings = result.data.timings;
    return Object.keys(timings)
      .filter((key) => prayerSequence.includes(key))
      .map((key) => ({
        title: key,
        prayerTime: timings[key],
      }));
  } catch (err) {
    console.error("Failed to load prayer times.", err);
    return [];
  }
};

const mergePrayerTimes = (times1: PrayerData[], times2: PrayerData[]) => {
  const combined: { [key: string]: PrayerData[] } = {};
  [...times1, ...times2].forEach((entry) => {
    if (!combined[entry.title]) {
      combined[entry.title] = [];
    }
    combined[entry.title].push(entry);
  });
  return Object.entries(combined).map(([title, times]) => ({
    title,
    times,
  }));
};

function App() {
  const [prayerTimes, setPrayerTimes] = useState<
    {
      title: string;
      times: PrayerData[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 86400000));

    const fetchTimes = async () => {
      const todayTimes = await fetchPrayerTimes(today);
      const tomorrowTimes = await fetchPrayerTimes(tomorrow);
      const mergedTimes = mergePrayerTimes(todayTimes, tomorrowTimes);
      setPrayerTimes(mergedTimes);
      setLoading(false);
    };

    fetchTimes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-10/12 mx-auto my-8 border bg-gray-800 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {prayerTimes.map(({ title, times }) => (
          <div key={title} className="prayer-item">
            <Prayer title={title} times={times} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
