export default async function handler(req, res) {
  var data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.latitude}&lon=${req.query.longitude}&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API_TOKEN}`
  );
  data = await data.json();
  //   console.log(data.json());
  await res.status(200).json(data);
}
