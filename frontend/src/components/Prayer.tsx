// // import { PrayerData } from "../App";

// // interface PrayerProps {
// //   prayer: PrayerData;
// // }

// // const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
// // const Dhur =
// //   "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
// // const Asr =
// //   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457483.jpg?t=st=1724513028~exp=1724516628~hmac=3037f72cbaadeda483c54d1744fb1ee2a28030b752d3609c71f99784feda29bd&w=1380";
// // const Maghrib =
// //   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
// // const Isha =
// //   "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
// // const DefaultImage =
// //   "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

// // const Prayer = ({ prayer }: PrayerProps) => {
// //   const { title, prayerTime, author } = prayer;

// //   // Map prayer titles to images
// //   const imageMap: { [key: string]: string } = {
// //     Fajr: Fajr,
// //     Dhur: Dhur,
// //     Asr: Asr,
// //     Maghrib: Maghrib,
// //     Isha: Isha,
// //   };

// //   // Get the appropriate image URL based on the title, or fall back to a default image
// //   const imageUrl = imageMap[title] || DefaultImage;

// //   const date = new Date(Number(prayerTime)); // Assuming timestamp is in milliseconds
// //   const formattedDate = !isNaN(date.getTime())
// //     ? date.toLocaleDateString("en-GB") // Get only the date part
// //     : "Invalid Date";
// //   const formattedTime = !isNaN(date.getTime())
// //     ? date.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" }) // Get time without seconds
// //     : "Invalid Time";

// //   return (
// //     <div className="m-auto text-center  w-full">
// //       <div className="m-auto  w-full p-4 ">
// //         <div className="card glass border-2 border-red-600 bg-blue-800">
// //           <figure>
// //             <img
// //               className="object-cover w-full h-48 "
// //               src={imageUrl}
// //               alt="mosque!"
// //             />
// //           </figure>
// //           <div className="card-body">
// //             {/* <h2 className="card-title">Life hack</h2> */}
// //             <h2 className="text-3xl font-bold underline text-pink-600">
// //               {title}
// //             </h2>
// //             <p>Date: {formattedDate}</p>
// //             <p>Time: {formattedTime}</p>
// //             <p>Created by: {author.name}</p>
// //             <div className="card-actions justify-end">
// //               {/* <button className="btn btn-primary">Learn now!</button> */}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Prayer;

// import React, { useEffect, useState } from "react";
// import { PrayerData } from "../App";

// interface PrayerProps {
//   prayer: PrayerData;
// }

// const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
// const Dhur =
//   "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
// const Asr =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457483.jpg?t=st=1724513028~exp=1724516628~hmac=3037f72cbaadeda483c54d1744fb1ee2a28030b752d3609c71f99784feda29bd&w=1380";
// const Maghrib =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
// const Isha =
//   "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
// const DefaultImage =
//   "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

// const Prayer = ({ prayer }: PrayerProps) => {
//   const { title, prayerTime, author } = prayer;

//   // Map prayer titles to images
//   const imageMap: { [key: string]: string } = {
//     Fajr: Fajr,
//     Dhur: Dhur,
//     Asr: Asr,
//     Maghrib: Maghrib,
//     Isha: Isha,
//   };

//   // Get the appropriate image URL based on the title, or fall back to a default image
//   const imageUrl = imageMap[title] || DefaultImage;

//   // Convert prayerTime to Date object
//   const prayerDate = new Date(Number(prayerTime));

//   // State for countdown
//   const [timeRemaining, setTimeRemaining] = useState(
//     getTimeRemaining(prayerDate)
//   );

//   // Function to get time remaining
//   function getTimeRemaining(targetDate: Date) {
//     const now = new Date();
//     // Create a new target date with today's date and prayer time
//     const targetTime = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       targetDate.getHours(),
//       targetDate.getMinutes(),
//       targetDate.getSeconds()
//     );

//     // If target time has already passed today, set target time to tomorrow
//     if (now > targetTime) {
//       targetTime.setDate(targetTime.getDate() + 1);
//     }

//     const difference = targetTime.getTime() - now.getTime();
//     if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

//     const hours = Math.floor(difference / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     return { hours, minutes, seconds };
//   }

//   // Update countdown every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeRemaining(getTimeRemaining(prayerDate));
//     }, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(interval);
//   }, [prayerDate]);

//   // Format time for display
//   const { hours, minutes, seconds } = timeRemaining;

//   return (
//     <div className="m-auto text-center w-full">
//       <div className="m-auto w-full p-4">
//         <div className="card glass border-2 border-red-600 bg-blue-800">
//           <figure>
//             <img
//               className="object-cover w-full h-48"
//               src={imageUrl}
//               alt="mosque!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="text-3xl font-bold underline text-pink-600">
//               {title}
//             </h2>
//             <p>Date: {prayerDate.toLocaleDateString("en-GB")}</p>
//             <p>
//               Time:{" "}
//               {prayerDate.toLocaleTimeString(undefined, {
//                 hour: "numeric",
//                 minute: "numeric",
//               })}
//             </p>
//             <p>Created by: {author.name}</p>
//             <p className="text-xl font-semibold">
//               Time remaining: {hours}h {minutes}m {seconds}s
//             </p>
//             <div className="card-actions justify-end">
//               {/* <button className="btn btn-primary">Learn now!</button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Prayer;

// import React, { useEffect, useState } from "react";
// import { PrayerData } from "../App";

// interface PrayerProps {
//   prayer: PrayerData;
// }

// const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
// const Dhur =
//   "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
// const Asr =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457483.jpg?t=st=1724513028~exp=1724516628~hmac=3037f72cbaadeda483c54d1744fb1ee2a28030b752d3609c71f99784feda29bd&w=1380";
// const Maghrib =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
// const Isha =
//   "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
// const DefaultImage =
//   "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

// const Prayer = ({ prayer }: PrayerProps) => {
//   const { title, prayerTime, author } = prayer;

//   // Map prayer titles to images
//   const imageMap: { [key: string]: string } = {
//     Fajr: Fajr,
//     Dhur: Dhur,
//     Asr: Asr,
//     Maghrib: Maghrib,
//     Isha: Isha,
//   };

//   // Get the appropriate image URL based on the title, or fall back to a default image
//   const imageUrl = imageMap[title] || DefaultImage;

//   // Convert prayerTime to Date object
//   const prayerDate = new Date(Number(prayerTime));

//   // State for countdown
//   const [timeRemaining, setTimeRemaining] = useState(
//     getTimeRemaining(prayerDate)
//   );

//   // Function to get time remaining
//   function getTimeRemaining(targetDate: Date) {
//     const now = new Date();
//     const targetTime = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       targetDate.getHours(),
//       targetDate.getMinutes(),
//       targetDate.getSeconds()
//     );

//     // For Jumu'ah, calculate countdown based on today's date
//     if (title === "Jumu'ah") {
//       // Set the target time for Jumu'ah on today's date
//       targetTime.setDate(now.getDate()); // Today
//     } else {
//       // For other prayers, calculate countdown as usual
//       if (now > targetTime) {
//         targetTime.setDate(targetTime.getDate() + 1); // Move to next day
//       }
//     }

//     const difference = targetTime.getTime() - now.getTime();
//     if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

//     const hours = Math.floor(difference / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     return { hours, minutes, seconds };
//   }

//   // Update countdown every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeRemaining(getTimeRemaining(prayerDate));
//     }, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(interval);
//   }, [prayerDate]);

//   // Format time for display
//   const { hours, minutes, seconds } = timeRemaining;

//   return (
//     <div className="m-auto text-center w-full">
//       <div className="m-auto w-full p-4">
//         <div className="card glass border-2 border-red-600 bg-blue-800">
//           <figure>
//             <img
//               className="object-cover w-full h-48"
//               src={imageUrl}
//               alt="mosque!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="text-3xl font-bold underline text-pink-600">
//               {title}
//             </h2>
//             <p>Date: {prayerDate.toLocaleDateString("en-GB")}</p>
//             <p>
//               Time:{" "}
//               {prayerDate.toLocaleTimeString(undefined, {
//                 hour: "numeric",
//                 minute: "numeric",
//               })}
//             </p>
//             <p>Created by: {author.name}</p>
//             <p className="text-xl font-semibold">
//               Time remaining: {hours}h {minutes}m {seconds}s
//             </p>
//             <div className="card-actions justify-end">
//               {/* <button className="btn btn-primary">Learn now!</button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Prayer;

// import React, { useEffect, useState } from "react";
// import { PrayerData } from "../App";

// interface PrayerProps {
//   prayer: PrayerData;
// }

// const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
// const Dhur =
//   "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
// const Asr =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457483.jpg?t=st=1724513028~exp=1724516628~hmac=3037f72cbaadeda483c54d1744fb1ee2a28030b752d3609c71f99784feda29bd&w=1380";
// const Maghrib =
//   "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
// const Isha =
//   "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
// const DefaultImage =
//   "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

// const Prayer = ({ prayer }: PrayerProps) => {
//   const { title, prayerTime, author } = prayer;

//   // Map prayer titles to images
//   const imageMap: { [key: string]: string } = {
//     Fajr: Fajr,
//     Dhur: Dhur,
//     Asr: Asr,
//     Maghrib: Maghrib,
//     Isha: Isha,
//   };

//   // Get the appropriate image URL based on the title, or fall back to a default image
//   const imageUrl = imageMap[title] || DefaultImage;

//   // Convert prayerTime to Date object
//   const prayerDate = new Date(Number(prayerTime));

//   // State for countdown
//   const [timeRemaining, setTimeRemaining] = useState(
//     getTimeRemaining(prayerDate)
//   );
//   const [isCountdownActive, setIsCountdownActive] = useState(false);

//   // Function to get time remaining
//   function getTimeRemaining(targetDate: Date) {
//     const now = new Date();
//     let targetTime = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       targetDate.getHours(),
//       targetDate.getMinutes(),
//       targetDate.getSeconds()
//     );

//     if (title === "Jumu'ah") {
//       targetTime.setDate(now.getDate()); // Today
//     } else {
//       if (now > targetTime) {
//         targetTime.setDate(targetTime.getDate() + 1); // Move to next day
//       }
//     }

//     const difference = targetTime.getTime() - now.getTime();
//     if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

//     const hours = Math.floor(difference / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     return { hours, minutes, seconds };
//   }

//   // Update countdown every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const remaining = getTimeRemaining(prayerDate);
//       setTimeRemaining(remaining);

//       // Check if countdown is active
//       setIsCountdownActive(
//         remaining.hours > 0 || remaining.minutes > 0 || remaining.seconds > 0
//       );
//     }, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(interval);
//   }, [prayerDate]);

//   // Format time for display
//   const { hours, minutes, seconds } = timeRemaining;

//   return (
//     <div className="m-auto text-center w-full">
//       <div className="m-auto w-full p-4">
//         <div className="card glass border-2 border-red-600 bg-blue-800">
//           <figure>
//             <img
//               className="object-cover w-full h-48"
//               src={imageUrl}
//               alt="mosque!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="text-3xl font-bold underline text-pink-600">
//               {title}
//             </h2>
//             <p>Date: {prayerDate.toLocaleDateString("en-GB")}</p>
//             <p>
//               Time:{" "}
//               {prayerDate.toLocaleTimeString(undefined, {
//                 hour: "numeric",
//                 minute: "numeric",
//               })}
//             </p>
//             <p>Created by: {author.name}</p>
//             {isCountdownActive && (
//               <p className="text-xl font-semibold">
//                 Time remaining: {hours}h {minutes}m {seconds}s
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Prayer;

import React, { useEffect, useState } from "react";
import { PrayerData } from "../App";

interface PrayerProps {
  prayer: PrayerData;
}

const Fajr = "https://farm3.staticflickr.com/2940/14111317317_1638c4916b_c.jpg";
const Dhur =
  "https://www.agoda.com/wp-content/uploads/2019/06/shutterstock_721552321-1024x683.jpg";
const Asr =
  "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457483.jpg?t=st=1724513028~exp=1724516628~hmac=3037f72cbaadeda483c54d1744fb1ee2a28030b752d3609c71f99784feda29bd&w=1380";
const Maghrib =
  "https://img.freepik.com/free-photo/majestic-mosque-islamic-new-year-celebration-with-fantasy-architecture_23-2151457458.jpg?t=st=1724512989~exp=1724516589~hmac=8b21dfd0e75ec7f6a91a4c5a1785fc476636a6222bcbe8343ecbfb43b056cb1d&w=1380";
const Isha =
  "https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg";
const DefaultImage =
  "https://citycentralmosque.org/wp-content/uploads/2021/10/Jum-700x450.jpg";

const Prayer = ({ prayer }: PrayerProps) => {
  const { title, prayerTime, author } = prayer;

  // Map prayer titles to images
  const imageMap: { [key: string]: string } = {
    Fajr: Fajr,
    Dhur: Dhur,
    Asr: Asr,
    Maghrib: Maghrib,
    Isha: Isha,
  };

  // Get the appropriate image URL based on the title, or fall back to a default image
  const imageUrl = imageMap[title] || DefaultImage;

  // Convert prayerTime to Date object
  const prayerDate = new Date(Number(prayerTime));

  // State for countdown
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showCountdownMessage, setShowCountdownMessage] = useState(false);

  // Function to get time remaining
  function calculateTimeRemaining(targetDate: Date) {
    const now = new Date();
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetDate.getHours(),
      targetDate.getMinutes(),
      targetDate.getSeconds()
    );

    if (title === "Jumu'ah") {
      if (now.getDay() === 5) {
        // Today is Friday, set countdown to this Friday
        if (now > targetTime) {
          // If time has passed, set targetTime to next Friday
          targetTime.setDate(targetTime.getDate() + 7);
        }
        setShowCountdownMessage(false);
      } else {
        // Not Friday, find next Friday
        const daysUntilFriday = (5 - now.getDay() + 7) % 7;
        targetTime.setDate(now.getDate() + daysUntilFriday);
        setShowCountdownMessage(true);
      }
    } else {
      // For other prayers, adjust for the next occurrence if needed
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1); // Move to next day
      }
      setShowCountdownMessage(false);
    }

    const difference = targetTime.getTime() - now.getTime();
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(prayerDate);
      setTimeRemaining(remaining);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [prayerDate]);

  // Format time for display
  const { hours, minutes, seconds } = timeRemaining;

  return (
    <div className="m-auto text-center w-full">
      <div className="m-auto w-full p-4">
        <div className="card glass border-2 border-red-600 bg-blue-800">
          <figure>
            <img
              className="object-cover w-full h-48"
              src={imageUrl}
              alt="mosque!"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-3xl font-bold underline text-pink-600">
              {title}
            </h2>
            {/* <p>Date: {prayerDate.toLocaleDateString("en-GB")}</p> */}
            <p>Today: {new Date().toLocaleDateString("en-GB")}</p>
            <p>
              Prayer Time:{" "}
              {prayerDate.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            {/* <p>Created by: {author.name}</p> */}
            {showCountdownMessage ? (
              <p>Countdown will start on the next Friday.</p>
            ) : (
              <p className="text-xl font-semibold">
                Time remaining: {hours}h {minutes}m {seconds}s
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
