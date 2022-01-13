const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "black";

const blackBtn = document.getElementById("black-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const pickerBtn = document.getElementById("picker-btn");
const colorPicker = document.getElementById("color-picker");
const gridSize = document.getElementById("grid-size");
const gridSlider = document.getElementById("grid-slider");
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

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.addEventListener("mouseover", changeColor);
        grid.appendChild(gridElement);
    }
}