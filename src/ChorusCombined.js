import * as Tone from 'tone';
import Chorus from './Chorus';

// chorus
const chorus = new Tone.Chorus(4, 1.5, 0.5).toDestination().start();

let playerChorus;

const loadBuffer3 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./singing-female.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerChorus = new Tone.Player(audioBuffer).connect(chorus);
};

loadBuffer3();

const ChorusCombined = () => {
  return (
    <>
      <h2>Chorus</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();

let playerChorus;

const loadBuffer3 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./singing-female.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerChorus = new Tone.Player(audioBuffer).connect(chorus);
};

loadBuffer3();

playerChorus.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            playerChorus.start();
          }}
        >
          Tone.js Chorus
        </button>
        <Chorus />
      </section>
    </>
  );
};

export default ChorusCombined;
