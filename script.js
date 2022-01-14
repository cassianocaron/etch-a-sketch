const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "black";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let drawMode = false;

const blackBtn = document.getElementById("black-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const pickerBtn = document.getElementById("picker-btn");
const colorPicker = document.getElementById("color-picker");
const gridSizeValue = document.getElementById("size-value");
const gridSizeSlider = document.getElementById("size-slider");
const grid = document.getElementById("grid");
const toggleGridLines = document.getElementById("toggle-grid-btn")

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.id === "black-btn") {
            setCurrentMode("black");
            activateButton("black");
        } else if (button.id === "rainbow-btn") {
            setCurrentMode("rainbow");
           activateButton("rainbow");
        } else if (button.id === "eraser-btn") {
            setCurrentMode("eraser");
            activateButton("eraser");            
        } else if (button.id === "picker-btn") {
            colorPicker.onchange = (e) => setCurrentColor(e.target.value);
            setCurrentMode("color");
            activateButton("color");
        } else if (button.id === "clear-btn") {
            reloadGrid();
        } else {
            if (toggleGridLines.innerHTML === "Grid On") {
                toggleGridLines.innerHTML = "Grid Off";
                toggleGridLines.classList.remove("active");
                grid.classList.remove("active");
            } else {
                toggleGridLines.innerHTML = "Grid On";
                toggleGridLines.classList.add("active");
                grid.classList.add("active");
            }
        }
    });
});

gridSizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
gridSizeSlider.onchange = (e) => changeSize(e.target.value);

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function updateSizeValue(value) {
    gridSizeValue.innerHTML = `Grid Size: ${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function reloadGrid() {
    grid.innerHTML = "";
    createGrid(currentSize);
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;    

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("cell");
        gridElement.addEventListener("click", toggleDrawMode);
        grid.appendChild(gridElement);
    }
}

function toggleDrawMode() {
    const cells = document.querySelectorAll(".cell");
    if (drawMode === false) {
        cells.forEach(cell => {
            cell.addEventListener("mouseover", changeColor);
        });
        drawMode = true;
    } else {
        cells.forEach(cell => {
            cell.removeEventListener("mouseover", changeColor);
        });
        drawMode = false;
    }
}

function changeColor() {
    switch (currentMode) {
        case "black":
            this.style.backgroundColor = "#000000";
            break;
        case "rainbow":
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case "eraser":
            this.style.backgroundColor = "#ffffff";
            break;
        default:
            this.style.backgroundColor = currentColor;
    }
}

function activateButton(value) {
    if (value === "black") {        
        blackBtn.classList.add("active");
        rainbowBtn.classList.remove("active");
        eraserBtn.classList.remove("active");
        pickerBtn.classList.remove("active");
    } else if (value === "rainbow") {
        blackBtn.classList.remove("active");
        rainbowBtn.classList.add("active");
        eraserBtn.classList.remove("active");
        pickerBtn.classList.remove("active");
    } else if (value === "eraser") {
        blackBtn.classList.remove("active");
        rainbowBtn.classList.remove("active");
        eraserBtn.classList.add("active");
        pickerBtn.classList.remove("active");
    } else if (value === "color") {
        blackBtn.classList.remove("active");
        rainbowBtn.classList.remove("active");
        eraserBtn.classList.remove("active");
        pickerBtn.classList.add("active");
    }
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}