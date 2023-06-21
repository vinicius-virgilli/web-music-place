export default function timeConverter(time) {
  const minutes = Math.floor(time / 60);
  const stringMinutes = minutes === 1 ? 'minuto' : 'minutos';
  const seconds = time - minutes * 60;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  const stringSeconds = seconds === 1 ? 'segundo' : 'segundos';
  const quantMusics = time / 30;
  const stringMusics = quantMusics === 1 ? 'música' : 'músicas';
  if (!minutes) {
    return `${quantMusics} ${stringMusics} · ${secondsString} ${stringSeconds}`;
  } else {
    return `${quantMusics} ${stringMusics} · ${minutes} ${stringMinutes} 
  e ${secondsString} ${stringSeconds}`;
  }
}


