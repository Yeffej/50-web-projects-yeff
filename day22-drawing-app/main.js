// TODO: Add undo and redo, resolve canvas resize issue, funcitionality for mobile devices

class CanvasController {
    #ctx;
    #pencilCoord;
    #isDrawing;
    #brushSize;
    #brushColor;

    constructor(element, width, height) {
        // assigning canvas width and height
        element.width = width;
        element.height = height;

        // assigning controller properties
        this.element = element;
        this.width = width;
        this.height = height;
        this.#ctx = element.getContext('2d');
        this.#brushSize = 5;
        this.#brushColor = '#000000';
        this.#pencilCoord = {
            x: 0,
            y: 0,
            initX: 0,
            initY: 0
        };
        this.#isDrawing = false;
    }
    
    activateDrawing() {
        canvas.addEventListener('mousemove', (e) => {
            if(this.#isDrawing) {
                this.#getPencilCoord(e);
    
                this.#ctx.lineWidth = this.#brushSize;
                this.#ctx.lineJoin = 'round';
                this.#ctx.lineCap = 'round';
                this.#ctx.strokeStyle = this.#brushColor;
    
                this.#ctx.beginPath();
                this.#ctx.moveTo(this.#pencilCoord.initX, this.#pencilCoord.initY);
                this.#ctx.lineTo(this.#pencilCoord.x, this.#pencilCoord.y);
                this.#ctx.stroke();
                this.#ctx.closePath();
    
                this.#pencilCoord.initX = this.#pencilCoord.x;
                this.#pencilCoord.initY = this.#pencilCoord.y;
            }
        });
    
        canvas.addEventListener('mousedown', (e) => {
            this.#getPencilCoord(e, true);
            this.#isDrawing = true;
        });
    
        document.addEventListener('mouseup', () => {
            this.#isDrawing = false;

            // reset coordinates
            this.#pencilCoord.initX = 0;
            this.#pencilCoord.initY = 0; 
            this.#pencilCoord.x = 0;
            this.#pencilCoord.y = 0; 
        });
    }

    #getPencilCoord(event, isInit = false) {
        const canvasPosition = canvas.getBoundingClientRect();
        const x =  event.clientX - canvasPosition.left;
        const y =  event.clientY - canvasPosition.top;

        if(isInit) {
            this.#pencilCoord.initX = x;
            this.#pencilCoord.initY = y;
        } else {
            this.#pencilCoord.x = x;
            this.#pencilCoord.y = y;
        }
    }

    setDrawProps({ brushSize, brushColor }) {
        this.#brushSize = brushSize ?? this.#brushSize;
        this.#brushColor = brushColor ?? this.#brushColor;
    }

    clearCanvas() {
        this.#ctx.clearRect(0, 0, this.width, this.height);
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.element.width = width;
        this.element.height = height;
    }
}

const brushColor = document.getElementById('brushColor');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');

const canvas = document.getElementById('canvas');
const controller = new CanvasController(canvas, window.innerWidth - 100, window.innerHeight);
controller.activateDrawing();


window.addEventListener('resize', () => {
    controller.resize(window.innerWidth - 100, window.innerHeight);
});

clearBtn.addEventListener('click', () => {
    controller.clearCanvas();
});

brushColor.addEventListener('change', (e) => {
    controller.setDrawProps({ brushColor: e.target.value });
});

function decreaseBrushSize() {
    const brushSizeValue = parseInt(brushSize.textContent);
    if(brushSizeValue > 1) {
        brushSize.textContent = brushSizeValue - 1;
        controller.setDrawProps({ brushSize: brushSizeValue - 1 });
    } else {
        alert('Brush size cannot be less than 1');
    }
}

function increaseBrushSize() {
    const brushSizeValue = parseInt(brushSize.textContent);
    if(brushSizeValue < 20) {
        brushSize.textContent = brushSizeValue + 1;
        controller.setDrawProps({ brushSize: brushSizeValue + 1 });
    } else {
        alert('Brush size cannot be greater than 20');
    }
}