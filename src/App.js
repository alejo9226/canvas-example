import logo from './logo.svg';
import { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

    context.strokeStyle = "#BADA55";
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 20;

    let startX;
    let startY;
    let endX;
    let endY;
    let hue = 0;

    let isDrawing = false;

    function mouseDown (e) {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
      draw(e)
    }
    function mouseUp (e) {
      endX = e.offsetX;
      endY = e.offsetY;
      isDrawing = false;
    }
    function mouseOut (e) {
    }

    function draw (e) {
      if (!isDrawing) return;

      context.beginPath();
      context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      // from
      context.moveTo(startX, startY); 
      [endX, endY] = [e.offsetX, e.offsetY];

      // to
      context.lineTo(endX, endY);
      context.stroke();


      [startX, startY] = [e.offsetX, e.offsetY];
      hue++;
    }

    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', mouseUp)
    canvas.addEventListener('mouseout', mouseOut)
  }, [])


  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        className="whiteboard"
        style={{
          backgroundColor: 'beige'
        }}
      ></canvas>
    </div>
  );
}

export default App;
