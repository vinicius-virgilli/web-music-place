
const separaArtistName = (stringOriginal) => {
  const virgula = ',';

  // Encontra a posição do separador na string
  const virgulaIndex = stringOriginal.indexOf(virgula);

  // Divide a string em duas partes usando o separador
  const primeiraParte = stringOriginal.slice(0, virgulaIndex);
  let segundaParte = stringOriginal.slice(virgulaIndex + 1);
//--------------------------------------------------------------

  const eComercial = '&';

  // Encontra a posição do separador na string
  const eComercialIndex = segundaParte.indexOf(eComercial);

  // Divide a string em duas partes usando o separador
  const terceiraParte = segundaParte.slice(0, eComercialIndex);
  const quartaParte = segundaParte.slice(eComercialIndex + 1);

  // console.log(stringOriginal);
  // console.log(primeiraParte);
  // console.log(terceiraParte);
  // console.log(quartaParte);
  return [stringOriginal.replace(/&/g, 'e'), primeiraParte.replace(/&/g, 'e'), terceiraParte.replace(/&/g, 'e'), quartaParte.replace(/&/g, 'e')];
}

const fetchArtistId = async (artistName, musicName) => {
  const myKey = '68e99429233225932fa978ac00faed4d';
  return fetch(
    `https://api.vagalume.com.br/search.php?art=${artistName}&mus=${musicName}&apikey=${myKey}`
  ).then((Response) => Response.json())
    .then((data) => data.art.id)
    .catch(() => '');
}

const getArtistImages = async (artistName, musicName) => {
  const myKey = '68e99429233225932fa978ac00faed4d';
  const nameArray = separaArtistName(artistName);
  const artistId = await Promise.any(
    nameArray.map((name) => (
    fetchArtistId(name, musicName)
  ))
  )
  if (!artistId) {
    return false;
  }

  let artistImages = await fetch(
    `https://api.vagalume.com.br/image.php?bandID=${artistId}&limit=10&apikey=${myKey}`
  )
    .then((Response) => Response.json())
    .then((data) => data.images)
    .catch(() => []);
  if (artistImages) {
    artistImages = artistImages.map(({url}) => url);
  }
  return artistImages;
};

export default getArtistImages;
