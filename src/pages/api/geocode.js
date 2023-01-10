export default async function handler(req, res) {
  var data = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      req.query.place
    )}.json?access_token=${process.env.MAPBOX_API_TOKEN}&limit=1`
  );
  data = await data.json();
  //   console.log(data.json());
  await res.status(200).json(data);
}
