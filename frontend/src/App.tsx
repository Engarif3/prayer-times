import { useEffect, useState } from "react";
import "./App.css";
import Prayer from "./components/Prayer";

export interface PrayerData {
  title: string;
  prayerTime: string;
}

interface HadithData {
  book: string;
  bookName: string;
  chapterName: string;
  hadith_english: string;
  header: string;
  id: number;
  refno: string;
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

// fetch random hadith
const fetchRandomHadith = async (): Promise<HadithData | null> => {
  const randomId = Math.floor(Math.random() * 7563) + 1;
  try {
    const response = await fetch(
      `https://random-hadith-generator.vercel.app/bukhari/${randomId}`
    );
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Failed to load Hadith.", err);
    return null;
  }
};

function App() {
  const [prayerTimes, setPrayerTimes] = useState<
    {
      title: string;
      times: PrayerData[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [showFullText, setShowFullText] = useState(false);
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

    // Fetch random Hadith
    const fetchHadith = async () => {
      const randomHadith = await fetchRandomHadith();
      if (randomHadith) {
        setHadith(randomHadith); // Store the entire Hadith object
      }
    };

    fetchHadith();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const hadithText = hadith?.hadith_english || "";
  const words = hadithText.split(" ");
  const isLongHadith = words.length > 30;
  const truncatedHadith = words.slice(0, 50).join(" ");
  const showFull = showFullText || window.innerWidth >= 768;

  return (
    <div className="sm:w-full md:w-10/12 lg:w-10/12  mx-auto my-2 border bg-gray-800 rounded-lg">
      <div className="my-4 p-4 text-white rounded-lg">
        <h2 className="text-xl font-bold mb-2 animate-bounce">
          Today's Hadith
        </h2>
        {hadith ? (
          <div>
            <p className="text-pink-600 font-bold">
              {hadith.header
                ? hadith.header.replace("\nNarrated", "").replace(/:$/, "")
                : "Narrator name missing"}{" "}
              narrated:
            </p>

            {/* <p className="italic ">"{hadith.hadith_english}</p> */}

            <p className="italic w-full">
              {showFull || !isLongHadith
                ? hadithText
                : `${truncatedHadith}${
                    truncatedHadith.length < hadithText.length ? "..." : ""
                  }`}
            </p>
            {isLongHadith && window.innerWidth < 768 && (
              <button
                className="mt-2 text-blue-400 hover:underline"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show less" : "Show full"}
              </button>
            )}

            <p className="text-green-600 font-bold mt-2">
              {hadith.refno ? (
                <>
                  {(() => {
                    const match = hadith.refno.match(/(.*)\s(\d+)$/);
                    if (match) {
                      return (
                        <>
                          {match[1]}{" "}
                          <span style={{ color: "yellow" }}>{match[2]}</span>
                        </>
                      );
                    } else {
                      return hadith.refno;
                    }
                  })()}
                </>
              ) : (
                "No Reference"
              )}
            </p>
          </div>
        ) : (
          <p>No Hadith found.</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
