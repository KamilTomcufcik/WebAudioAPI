import * as Tone from 'tone';
import FeedbackDelay from './FeedbackDelay';

const feedbackDelay = new Tone.FeedbackDelay('4n', 0.5).toDestination();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./Kick_one.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(feedbackDelay);
};

loadBuffer();

const FeedbackDelayCombined = () => {
  return (
    <>
      <h2>Feedback Delay</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const feedbackDelay = new Tone.FeedbackDelay('4n', 0.5).toDestination();

let player;

const loadBuffer = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./Kick_one.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  player = new Tone.Player(audioBuffer).connect(feedbackDelay);
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
          Tone.js Feedback Delay
        </button>
        <FeedbackDelay />
      </section>
    </>
  );
};

export default FeedbackDelayCombined;
