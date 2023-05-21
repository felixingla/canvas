import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  /* Declare variables:
    - rectangles: holds an array of rectangles drawn in canvas 
    - canvasRef: a reference to the '<canvas>' element, allowing access to it in the code
    - isDrawing:determines whether the user is currently drawing a rectangle or not
    - currentRect: it represents the rectange being drawn at the moment
  */
  const [rectangles, setRectangles] = useState([]);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState(null);

  /* Handle drawing of rectangles on the canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach((rect) => {
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  }, [rectangles]);

  /* handleMouseDown is called when the user presses the mouse button down on the canvas. 
   - It sets isDrawing to true to indicate that the user is currently drawing. 
   - It creates a new rectangle object based on the mouse position (offsetX and offsetY) and sets it as the currentRect. 
   - It adds the new rectangle to the rectangles array using the setRectangles function.
  */
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

  /* handleMouseMove is called when the user moves the mouse on the canvas:
    - It checks if isDrawing is true to ensure that the user is actively drawing. 
    - It calculates the updated width and height of the currentRect based on the mouse position and the initial position of the rectangle. 
    - It updates the rectangles array with the updated rectangle using the setRectangles function.
  */
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

  /* handleMouseUp is called when the user releases the mouse button: 
    - It sets isDrawing to false to indicate that the drawing is complete. 
    - It resets the currentRect to null. 
  */
  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentRect(null);
  };

  /*
    The return statement renders the component JSX, which consists of a <div> element with the class name "App" and a <canvas> element.
    - The <canvas> element uses the canvasRef as a reference and binds the event handlers (onMouseDown, onMouseMove, and onMouseUp) to the corresponding mouse events.
    - The width and height attributes determine the desired dimensions of the canvas.
  */
  return (
    <div className="App" color="red">
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
