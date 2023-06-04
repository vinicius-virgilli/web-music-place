// import fetch from "node-fetch";

const getArtistId = async (artist, music) => {
  const myKey = '68e99429233225932fa978ac00faed4d';
  const artistId = await fetch(
    `https://api.vagalume.com.br/search.php?art=${artist}&mus=${music}&apikey=${myKey}`
  )
    .then((Response) => Response.json())
    .then((data) => data.art.id);
  //console.log(artistId);
  return artistId;
};

const getArtistImages = async (artistName, musicName) => {
  const myKey = '68e99429233225932fa978ac00faed4d';
  const artistId = await getArtistId(artistName, musicName);
  let artistImages = await fetch(
    `https://api.vagalume.com.br/image.php?bandID=${artistId}&limit=10&apikey=${myKey}`
  )
    .then((Response) => Response.json())
    .then((data) => data.images);
  artistImages = artistImages.map(({url}) => url);
  // console.log(artistImages);
  return artistImages;
};
// getArtistImages('marilia mendonca');
