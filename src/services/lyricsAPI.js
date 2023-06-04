const fetchVagalume = async (artistName, musicName) => {
  const myKey = '68e99429233225932fa978ac00faed4d';
  return fetch(
    `https://api.vagalume.com.br/search.php?art=${artistName}&mus=${musicName}&apikey=${myKey}`
  ).then((Response) => Response.json())
    .then((data) => data.mus[0].text)
}

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

const getLyrics = async (artistName, musicName) => {
  console.log(artistName, musicName);
  const possibilidades = separaArtistName(artistName);
  console.log(possibilidades);
  const promiseArray = possibilidades.map((name) => (
    fetchVagalume(name, musicName)
  ));
  const retorno = await Promise.any(
    possibilidades.map((name) => (
    fetchVagalume(name, musicName)
  ))
  )

  return retorno;
};

export default getLyrics;
