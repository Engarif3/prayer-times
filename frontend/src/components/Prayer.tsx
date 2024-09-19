// https://pixabay.com/images/search/mosque/?pagi=3
// https://random-hadith-generator.vercel.app/
// https://documenter.getpostman.com/view/5211979/TVev3j7q#intro   (2932-3162)
import { useEffect, useMemo, useState } from "react";
import Asr from "../assets/asr.jpg";
import Maghrib from "../assets/magrib.webp";

interface PrayerProps {
  title: string;
  times: { title: string; prayerTime: string }[];
}

const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
const Dhuhr =
  "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
// const Asr =
//   "https://cdn.pixabay.com/photo/2023/10/20/03/19/mosque-8328077_1280.jpg";
// const Maghrib =
//   "https://pixabay.com/photos/travel-tourism-abu-dhabi-mosque-4604499/";
// "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
const Isha =
  "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
const DefaultImage =
  "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

const Prayer = ({ title, times }: PrayerProps) => {
  const imageMap: { [key: string]: string } = {
    Fajr: Fajr,
    Dhuhr: Dhuhr,
    Asr: Asr,
    Maghrib: Maghrib,
    Isha: Isha,
    "Jumu'ah": Dhuhr,
  };

  const imageUrl = imageMap[title] || DefaultImage;

  const createPrayerDate = (prayerTime: string, date: Date) => {
    const [hours, minutes] = prayerTime.split(":").map(Number);
    const prayerDate = new Date(date);
    prayerDate.setHours(hours, minutes, 0, 0);
    return prayerDate;
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    let nextPrayerDate: Date | null = null;
    let isToday = true;

    // Iterate over today's prayer times to find the next prayer time
    for (const { prayerTime } of times) {
      const prayerDate = createPrayerDate(prayerTime, now);
      if (prayerDate > now) {
        nextPrayerDate = prayerDate;
        break;
      }
    }

    // If no more prayers today, find the next prayer time tomorrow
    if (!nextPrayerDate) {
      nextPrayerDate = createPrayerDate(times[0].prayerTime, now);
      nextPrayerDate.setDate(nextPrayerDate.getDate() + 1);
      isToday = false;
    }

    const difference = nextPrayerDate.getTime() - now.getTime();
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0, isToday };

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isToday };
  };

  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: true, // Tracks if the remaining time is for today's or tomorrow's prayer time
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [times]);

  // Use useMemo to memoize 'today' and 'tomorrow'
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    return tomorrowDate;
  }, [today]);

  const prayerTimesToday = useMemo(() => {
    return times[0] ? [createPrayerDate(times[0].prayerTime, today)] : [];
  }, [times, today]);

  const prayerTimesTomorrow = useMemo(() => {
    return times[1] ? [createPrayerDate(times[1].prayerTime, tomorrow)] : [];
  }, [times, tomorrow]);

  return (
    <div className="m-auto text-center w-full">
      <div className="m-auto w-full p-4">
        <div className="card glass border-2 border-red-600 bg-cyan-800">
          <figure>
            <img
              className="object-cover w-full h-56"
              src={imageUrl}
              alt="mosque!"
            />
          </figure>
          <div className="pt-0 mt-0 pb-4 w-full">
            <div className="flex justify-between items-center gap-4 bg-slate-700 px-4">
              <p className="text-3xl font-bold text-pink-600">{title}</p>
              <p className="text-xl text-pink-600">
                {today.toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex justify-around items-center gap-4 mt-2 p-2">
              <div className="w-6/12 ">
                <h3 className="text-2xl font-semibold text-white mb-4 ">
                  Today
                </h3>
                {prayerTimesToday.length > 0 ? (
                  prayerTimesToday.map((date, index) => (
                    <p key={index} className="text-2xl text-[#FFFF00]">
                      {date.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {/* Show remaining time if it applies to today */}
                      <p className="mt-6">
                        {" "}
                        {timeRemaining.isToday ? (
                          <span className="text-2xl font-bold text-orange-600">
                            {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
                            {timeRemaining.seconds}s
                          </span>
                        ) : (
                          <p className="text-lime-500 text-xl">
                            Time already passed
                          </p>
                        )}
                      </p>
                    </p>
                  ))
                ) : (
                  <p>No prayer times today</p>
                )}
              </div>
              <div className="h-[100px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-pink-500 to-transparent opacity-75 dark:via-neutral-400"></div>

              <div className="w-6/12">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Tomorrow
                </h3>
                {prayerTimesTomorrow.length > 0 ? (
                  prayerTimesTomorrow.map((date, index) => (
                    <p key={index} className="text-2xl text-[#FFFF00]">
                      {date.toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {/* Show remaining time if it applies to tomorrow */}
                      <p className="mt-6">
                        {!timeRemaining.isToday ? (
                          <span className="text-2xl font-bold text-orange-700">
                            {" "}
                            {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
                            {timeRemaining.seconds}s
                          </span>
                        ) : (
                          <p className="text-lime-500 text-xl">
                            Prayer for the next day
                          </p>
                        )}
                      </p>
                    </p>
                  ))
                ) : (
                  <p>No prayer times tomorrow</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
