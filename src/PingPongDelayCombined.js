import * as Tone from 'tone';
import PingPongDelay from './PingPongDelay';

const pingPong = new Tone.PingPongDelay('4n', 0.5).toDestination();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./Kick_one.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(pingPong);
};

loadBuffer();

const PingPongDelayCombined = () => {
  return (
    <>
      <h2>PingPong Delay</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const pingPong = new Tone.PingPongDelay('4n', 0.5).toDestination();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./Kick_one.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(pingPong);
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
          Tone.js PingPong Delay
        </button>
        <PingPongDelay />
      </section>
    </>
  );
};

export default PingPongDelayCombined;
