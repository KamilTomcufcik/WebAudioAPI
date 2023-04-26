import * as Tone from 'tone';
import Tremolo from './Tremolo';

// tremolo
const tremolo = new Tone.Tremolo(15, 0.75).toDestination().start();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(tremolo);
};

loadBuffer();

const TremoloCombined = () => {
  return (
    <>
      <h2>Tremolo</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const tremolo = new Tone.Tremolo(15, 0.75).toDestination().start();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(tremolo);
};

loadBuffer();

player.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            player.start();
          }}
        >
          Tone.js Tremolo
        </button>

        <Tremolo />
      </section>
    </>
  );
};

export default TremoloCombined;
