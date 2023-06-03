const searchArtistInfoAPI = async (id) => {
  // const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://api.music.apple.com/v1/catalog/{storefront}/artists/${id}`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results: data } = await APIResponse.json();
  console.log(data);
  // const response = results.map(
  //   ({
  //     artistId,
  //     artistName,
  //     collectionId,
  //     collectionName,
  //     collectionPrice,
  //     artworkUrl100,
  //     releaseDate,
  //     trackCount,
  //   }) => ({
  //     artistId,
  //     artistName,
  //     collectionId,
  //     collectionName,
  //     collectionPrice,
  //     artworkUrl100,
  //     releaseDate,
  //     trackCount,
  //   }),
  // );
  return 'teste';
};

export default searchArtistInfoAPI;
