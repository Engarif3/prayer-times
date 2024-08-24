import { PrayerData } from "../App";

interface PrayerProps {
  prayer: PrayerData;
}

const Prayer = ({ prayer }: PrayerProps) => {
  const { title, prayerTime, author } = prayer;
  const date = new Date(Number(prayerTime)); // Assuming timestamp is in milliseconds
  const formattedDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("en-GB") // Get only the date part
    : "Invalid Date";
  const formattedTime = !isNaN(date.getTime())
    ? date.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" }) // Get time without seconds
    : "Invalid Time";

  return (
    <div className="m-auto text-center  w-full">
      <div className="m-auto  w-full p-4 ">
        <div className="card glass border-2 border-red-600 bg-blue-800">
          <figure>
            <img
              className="object-cover w-full h-48 "
              src="https://www.housingdiversitynetwork.co.uk/wp-content/uploads/crescent-shaped-moon-mosque-front-night-cloudy-starry-sky-ramadan-2048x1367.jpg"
              alt="mosque!"
            />
          </figure>
          <div className="card-body">
            {/* <h2 className="card-title">Life hack</h2> */}
            <h2 className="text-3xl font-bold underline text-pink-600">
              {title}
            </h2>
            <p>Date: {formattedDate}</p>
            <p>Time: {formattedTime}</p>
            <p>Created by: {author.name}</p>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Learn now!</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
