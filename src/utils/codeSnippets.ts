export const snippets = {
  algorithm: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,

  neural: `class NeuralNetwork {
  constructor(layers) {
    this.weights = [];
    this.biases = [];
    this.activation = x => 1 / (1 + Math.exp(-x));
    this.layers = layers;
  }
  
  forward(input) {
    let activation = input;
    for(let i = 0; i < this.layers.length; i++) {
      activation = this.activation(
        multiply(activation, this.weights[i])
      );
    }
    return activation;
  }
}`,

  music: `class Synthesizer {
  constructor() {
    this.ctx = new AudioContext();
    this.oscillator = this.ctx.createOscillator();
    this.gain = this.ctx.createGain();
    this.frequencies = {
      'A': 440.00,
      'B': 493.88,
      'C': 523.25
    };
  }
  
  play(note) {
    this.oscillator.frequency.value = 
      this.frequencies[note];
    this.oscillator.start();
  }
}`,

  crypto: `async function generateKeys() {
  const keys = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  return keys;
}`
};