import axios from "axios";

async function fazerRequisicao() {
  try {
    const clientID = 'SEU_CLIENT_ID'; // Substitua pelo seu client ID
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientID}`;

    const response = await axios.get(url);

    // Faça algo com os dados da resposta
    console.log(response.data);
  } catch (error) {
    // Trate erros caso ocorram
    console.error(error);
  }
}

fazerRequisicao()