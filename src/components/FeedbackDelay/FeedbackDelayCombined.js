import * as Tone from 'tone';
import FeedbackDelay from './FeedbackDelay';

const feedbackDelay = new Tone.FeedbackDelay('4n', 0.5).toDestination();

let player = new Tone.Player('./audio/Kick_one.wav').connect(feedbackDelay);

const FeedbackDelayCombined = () => {
  return (
    <>
      <h2>Feedback Delay</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const feedbackDelay = new Tone.FeedbackDelay('4n', 0.5).toDestination();

let player = new Tone.Player('./audio/Kick_one.wav').connect(feedbackDelay);

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
