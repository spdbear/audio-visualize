window.AudioContext = window.AudioContext || window.webkitAudioContext
const ctx = new AudioContext()

const render = () => {
  analyser.getByteFrequencyData(freqData)
  const value = freqData[100]
  document.querySelector('h1').style.fontWeight = value * 5
  document.querySelector('.text').textContent = value
  window.requestAnimationFrame(render.bind(this))
}
const audioElement = document.querySelector('audio')
// Web Audio API内で使える形に変換
const track = ctx.createMediaElementSource(audioElement)
const analyser = ctx.createAnalyser()
track.connect(analyser)
analyser.connect(ctx.destination)
const freqData = new Uint8Array(analyser.frequencyBinCount)
render()

document.querySelector('#play').addEventListener('click', () => {
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  // 出力につなげる
  track.connect(ctx.destination)
  audioElement.play()
})

// audioElementを一時停止する
document.querySelector('#pause').addEventListener('click', () => {
  audioElement.pause()
})
