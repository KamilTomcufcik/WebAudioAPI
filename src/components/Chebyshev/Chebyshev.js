function chebyFunction() {
  const audioContext = new AudioContext();

  let sourceNode = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/orchestra.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  function getCoef(x, degree, memo) {
    if (memo.has(degree)) {
      return memo.get(degree);
    } else if (degree === 0) {
      memo.set(degree, 0);
    } else if (degree === 1) {
      memo.set(degree, x);
    } else {
      memo.set(degree, 2 * x * getCoef(x, degree - 1, memo) - getCoef(x, degree - 2, memo));
    }
    return memo.get(degree);
  }

  function setCurve(order) {
    const length = 1024;
    const array = new Float32Array(length);
    for (let i = 0, len = length; i < len; i++) {
      const normalized = (i / (len - 1)) * 2 - 1;
      array[i] = getCoef(normalized, order, new Map());
    }
    return array;
  }

  const chebyshevEffect = (order) => {
    const waveShaperNode = audioContext.createWaveShaper();
    waveShaperNode.curve = setCurve(order);
    waveShaperNode.oversample = 'none';

    return waveShaperNode;
  };

  const chebyshevNode = chebyshevEffect(26);

  const gain = audioContext.createGain();
  gain.gain.value = 0.25;

  loadBuffer().then(() => {
    sourceNode.connect(chebyshevNode);
    chebyshevNode.connect(gain);
    gain.connect(audioContext.destination);
  });

  sourceNode.start();
}

const Chebyshev = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

let sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/orchestra.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

function getCoef(x, degree, memo) {
  if (memo.has(degree)) {
    return memo.get(degree);
  } else if (degree === 0) {
    memo.set(degree, 0);
  } else if (degree === 1) {
    memo.set(degree, x);
  } else {
    memo.set(degree, 2 * x * getCoef(x, degree - 1, memo) - getCoef(x, degree - 2, memo));
  }
  return memo.get(degree);
}

function setCurve(order, length = 1024) {
  const array = new Float32Array(length);
  for (let i = 0, len = length; i < len; i++) {
    const normalized = (i / (len - 1)) * 2 - 1;
    array[i] = getCoef(normalized, order, new Map());
  }
  return array;
}

const chebyshevEffect = (order) => {
  const waveShaperNode = audioContext.createWaveShaper();
  waveShaperNode.curve = setCurve(order);
  waveShaperNode.oversample = 'none';

  return waveShaperNode;
};

const chebyshevNode = chebyshevEffect(26);

const gain = audioContext.createGain();
gain.gain.value = 0.25;

loadBuffer().then(() => {
  sourceNode.connect(chebyshevNode);
  chebyshevNode.connect(gain);
  gain.connect(audioContext.destination);
});

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          chebyFunction();
        }}
      >
        Chebyshev
      </button>
    </>
  );
};

export default Chebyshev;
