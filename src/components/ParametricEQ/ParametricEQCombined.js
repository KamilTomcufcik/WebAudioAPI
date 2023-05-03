import * as Tone from 'tone';
import ParametricEQ from './ParametricEQ';

const player = new Tone.Player('./audio/orchestra.wav');

const filters = [];
const frequencies = [500, 2000, 8000];
const gains = [15, -7, 5];
const bandwidths = [3, 7, 5];

for (let i = 0; i < 8; i++) {
  filters.push(
    new Tone.Filter({
      type: 'peaking',
      frequency: new Tone.Frequency(frequencies[i], 'hz'),
      gain: gains[i],
      Q: bandwidths[i],
    })
  );
}

player.connect(filters[0]);

for (let i = 0; i < filters.length - 1; i++) {
  filters[i].connect(filters[i + 1]);
}
filters[filters.length - 1].toDestination();

const ParametricEQCombined = () => {
  return (
    <>
      <h2>Parametric Equalizer</h2>
      <section className='basicSection'>
        <pre>
          <code>{`const player = new Tone.Player('./audio/orchestra.wav').toDestination();

const filters = [];
const frequencies = [500, 2000, 8000];
const gains = [15, -7, 5];
const bandwidths = [3, 7, 5];

for (let i = 0; i < 8; i++) {
  filters.push(
    new Tone.Filter({
      type: 'peaking',
      frequency: new Tone.Frequency(frequencies[i], 'hz'),
      gain: gains[i],
      Q: bandwidths[i],
    })
  );
}

player.connect(filters[0]);

for (let i = 0; i < filters.length - 1; i++) {
  filters[i].connect(filters[i + 1]);
}
filters[filters.length - 1].toDestination();

player.start();`}</code>
        </pre>
        <button
          onClick={() => {
            player.start();
          }}
        >
          Tone.js Parametric Equalizer
        </button>
        <ParametricEQ />
      </section>
    </>
  );
};

export default ParametricEQCombined;
