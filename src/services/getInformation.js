// const apiKey = 'SUA_CHAVE_DE_API';
// const albumId = 'ID_DO_ALBUM';

// const fetchAlbumInfo = async (albumId) => {
//   const url = `https://api.vagalume.com.br/album.php?musid=${albumId}&apikey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Erro na solicitação da API:', error);
//   }
// };

// // Exemplo de uso
// const albumId = 'ALBUM_ID_AQUI';

// fetchAlbumInfo(albumId)
//   .then((data) => {
//     // Processar os dados do álbum recebidos da API
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('Erro ao obter informações do álbum:', error);
//   });
