function parametricEQFunction() {
  const audioContext = new AudioContext();

  let sourceNode = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/orchestra.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  loadBuffer();

  const filters = [];
  const frequencies = [500, 2000, 8000];
  const gains = [15, -7, 5];
  const bandwidth = [3, 7, 5];

  for (let i = 0; i < 3; i++) {
    const filter = audioContext.createBiquadFilter();

    filter.type = 'peaking';
    filter.gain.value = gains[i];
    filter.Q.value = bandwidth[i];
    filter.frequency.value = frequencies[i];

    filters.push(filter);
  }

  sourceNode.connect(filters[0]);

  for (let i = 0; i < filters.length - 1; i++) {
    filters[i].connect(filters[i + 1]);
  }
  filters[filters.length - 1].connect(audioContext.destination);

  sourceNode.start();
}

const ParametricEQ = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const filters = [];
const frequencies = [500, 2000, 8000];
const gains = [15, -7, 5];
const bandwidths = [3, 7, 5];

for (let i = 0; i < 3; i++) {
  const filter = audioContext.createBiquadFilter();

  filter.type = 'peaking';
  filter.gain.value = gains[i];
  filter.Q.value = bandwidths[i];
  filter.frequency.value = frequencies[i];

  filters.push(filter);
}

let sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/orchestra.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

sourceNode.connect(filters[0]);

for (let i = 0; i < filters.length - 1; i++) {
  filters[i].connect(filters[i + 1]);
}
filters[filters.length - 1].connect(audioContext.destination);

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          parametricEQFunction();
        }}
      >
        Parametric Equalizer
      </button>
    </>
  );
};

export default ParametricEQ;
