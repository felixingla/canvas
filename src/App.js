import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [rectangles, setRectangles] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach((rect) => {
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  }, [rectangles]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newRect = {
      x: offsetX,
      y: offsetY,
      width: 0,
      height: 0,
    };
    setCurrentRect(newRect);
    setRectangles([...rectangles, newRect]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    const updatedRect = {
      ...currentRect,
      width: offsetX - currentRect.x,
      height: offsetY - currentRect.y,
    };
    setRectangles(
      rectangles.map((rect, index) =>
        index === rectangles.length - 1 ? updatedRect : rect
      )
    );
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentRect(null);
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={800} // Set the desired width of the canvas
        height={600} // Set the desired height of the canvas
      />
    </div>
  );
}

export default App;
