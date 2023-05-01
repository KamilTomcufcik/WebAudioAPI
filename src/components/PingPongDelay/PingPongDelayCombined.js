import * as Tone from 'tone';
import PingPongDelay from './PingPongDelay';

const pingPong = new Tone.PingPongDelay('4n', 0.5).toDestination();

let player = new Tone.Player('./audio/Kick_one.wav').connect(pingPong);

const PingPongDelayCombined = () => {
  return (
    <>
      <h2>PingPong Delay</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const pingPong = new Tone.PingPongDelay('4n', 0.5).toDestination();

let player = new Tone.Player('./audio/Kick_one.wav').connect(pingPong);

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
