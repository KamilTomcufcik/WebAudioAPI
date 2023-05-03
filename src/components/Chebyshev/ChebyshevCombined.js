import * as Tone from 'tone';
import Chebyshev from './Chebyshev';

const cheby = new Tone.Chebyshev(26).toDestination();

const player = new Tone.Player('./audio/orchestra.wav').connect(cheby);
player.volume.value = -12;

const ChebyshevCombined = () => {
  return (
    <>
      <h2>Chebyshev Distortion</h2>
      <section className='basicSection'>
        <pre>
          <code>{`const cheby = new Tone.Chebyshev(26).toDestination();

const player = new Tone.Player('./audio/orchestra.wav').connect(cheby);
player.volume.value = -12;

player.start();`}</code>
        </pre>
        <button
          onClick={() => {
            player.start();
          }}
        >
          Tone.js Chebyshev
        </button>
        <Chebyshev />
      </section>
    </>
  );
};

export default ChebyshevCombined;
