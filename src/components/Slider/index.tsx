import React, { useState, useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';
import './style.css';
import { getPositionFromValue, getValueFromPosition } from '../../utils';

type SliderProps = {
  positions: number[];
}

const Slider: React.FC<SliderProps> = ({ positions }) => {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleThumbPosition = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (trackRef.current) {
      const track = trackRef.current;
      const {left, width} = track.getBoundingClientRect();
      const thumbPos = ((event.clientX - left) / width) * 100;
      setThumbPosition(+Math.min(100, Math.max(0, thumbPos)).toFixed());
    }
  };

  const handleMouseUp =() => {
    if (dragging) {
      const nearestPos = getValueFromPosition(thumbPosition);
      setThumbPosition(getPositionFromValue(nearestPos));
      setDragging(false);
    }
  }

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    setDragging(true);
    handleThumbPosition(event);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (dragging) {
      handleThumbPosition(event as unknown as ReactMouseEvent<HTMLDivElement>);
    }
  };

  useEffect(() => {

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="slider">
      <div className="slider-track" ref={trackRef}>
        <div
          className="slider-selected-track"
          style={{ width: `${thumbPosition}%` }}
        />
        {positions.map((pos, index) => (
          <div
            key={index}
            className="slider-tick"
            style={{ left: `${(index / (positions.length - 1)) * 100}%` }}
          >
            <span className='slidet-tick-mark'></span>
            <span className="slider-tick-label" onClick={(event) => handleThumbPosition(event as unknown as ReactMouseEvent<HTMLDivElement>)}>{pos}</span>
          </div>
        ))}
        <div
          className={`slider-thumb ${dragging ? 'dragging' : ''}`}
          style={{ left: `${thumbPosition}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Slider;
