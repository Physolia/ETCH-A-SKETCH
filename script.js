const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor
  }
  
  function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
  }
  
  function setCurrentSize(newSize) {
    currentSize = newSize
  }

  const pickColor = document.getElementById('pickColor')
  const colorButton = document.getElementById('colorButton')
  const rainbowButton = document.getElementById('rainbowButton')
  const eraserButton = document.getElementById('eraserButton')
  const clearButton = document.getElementById('clearButton')
  const valueSize = document.getElementById('valueSize')
  const sliderSize = document.getElementById('sliderSize')
  const grid = document.getElementById('grid')
  
  pickColor.onchange = (e) => setCurrentColor(e.target.value)
  colorButton.onclick = () => setCurrentMode('color')
  rainbowButton.onclick = () => setCurrentMode('rainbow')
  eraserButton.onclick = () => setCurrentMode('eraser')
  clearButton.onclick = () => gridReload()
  sliderSize.onmousemove = (e) => updatevalueSize(e.target.value)
  sliderSize.onchange = (e) => changeSize(e.target.value)
  
  let mouseDown = false
  document.body.onmousedown = () => (mouseDown = true)
  document.body.onmouseup = () => (mouseDown = false)
  
  function changeSize(value) {
    setCurrentSize(value)
    updatevalueSize(value)
    gridReload()
  }
  
  function updatevalueSize(value) {
    valueSize.innerHTML = `${value} x ${value}`
  }
  
  function gridReload() {
    gridClear()
    gridSetup(currentSize)
  }
  
  function gridClear() {
    grid.innerHTML = ''
  }
  
  function gridSetup(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList.add("grid-element")
      gridElement.addEventListener('mouseover', colorChange)
      gridElement.addEventListener('mousedown', colorChange)
      grid.appendChild(gridElement)
    }
  }
  
  function colorChange(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
  }
  
  function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowButton.classList.remove('active')
    } else if (currentMode === 'color') {
      colorButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserButton.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowButton.classList.add('active')
    } else if (newMode === 'color') {
      colorButton.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserButton.classList.add('active')
    }
  }
  
  window.onload = () => {
    gridSetup(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }