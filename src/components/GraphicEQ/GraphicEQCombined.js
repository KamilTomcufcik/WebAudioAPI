import * as Tone from 'tone';
import GraphicEQ from './GraphicEQ';

const player = new Tone.Player('./audio/orchestra.wav').toDestination();

const filters = [];
const frequencies = [64, 150, 350, 1000, 2000, 6000, 12000, 16000];
const gains = [25, 3, -30, 0, -3, -7, -10, -4];

for (let i = 0; i < 8; i++) {
  filters.push(
    new Tone.Filter({
      type: 'peaking',
      frequency: new Tone.Frequency(frequencies[i], 'hz'),
      gain: gains[i],
      Q: 1,
    })
  );
}

player.connect(filters[0]);

for (let i = 0; i < filters.length - 1; i++) {
  filters[i].connect(filters[i + 1]);
}
filters[filters.length - 1].toDestination();

const GraphicEQCombined = () => {
  return (
    <>
      <h2>Graphic Equalizer</h2>
      <section className='basicSection'>
        <pre>
          <code>{`const player = new Tone.Player('./audio/orchestra.wav').toDestination();

const filters = [];
const frequencies = [64, 150, 350, 1000, 2000, 6000, 12000, 16000];
const gains = [25, 3, -30, 0, -3, -7, -10, -4];

for (let i = 0; i < 8; i++) {
  filters.push(
    new Tone.Filter({
      type: 'peaking',
      frequency: new Tone.Frequency(frequencies[i], 'hz'),
      gain: gains[i],
      Q: 1,
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
          Tone.js Graphic Equalizer
        </button>
        <GraphicEQ />
      </section>
    </>
  );
};

export default GraphicEQCombined;
