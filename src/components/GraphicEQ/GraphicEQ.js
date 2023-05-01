const audioContext = new AudioContext();

const filters = [];
const frequencies = [64, 150, 350, 1000, 2000, 6000, 12000, 16000];
const gains = [25, 3, -30, 0, -3, -7, -10, -4];

for (let i = 0; i < 8; i++) {
  const filter = audioContext.createBiquadFilter();

  filter.type = 'peaking';
  filter.gain.value = gains[i];
  filter.Q.value = 1;
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

const GraphicEQ = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const filters = [];
const frequencies = [64, 150, 350, 1000, 2000, 6000, 12000, 16000];
const gains = [25, 3, -30, 0, -3, -7, -10, -4];

for (let i = 0; i < 8; i++) {
  const filter = audioContext.createBiquadFilter();

  filter.type = 'peaking';
  filter.gain.value = gains[i];
  filter.Q.value = 1;
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
          sourceNode.start();
        }}
      >
        Graphic Equalizer
      </button>
    </>
  );
};

export default GraphicEQ;
