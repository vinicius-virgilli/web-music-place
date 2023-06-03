const getLyrics = async (artistName, musicName) => {

  const myKey = '68e99429233225932fa978ac00faed4d';

  const musicLyrics = await fetch(
    `https://api.vagalume.com.br/search.php?art=${artistName}&mus=${musicName}&apikey=${myKey}`
  )
    .then((Response) => Response.json())
    .then((data) => data.mus[0].text);

  return musicLyrics;
};

export default getLyrics;
