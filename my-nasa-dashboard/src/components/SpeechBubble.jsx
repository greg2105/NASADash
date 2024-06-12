import React, { useEffect, useRef, useState } from 'react';
import '../styles/SpeechBubble.css';

const SpeechBubble = ({ text, speed = 90 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    setDisplayText('');
    setIsTypingComplete(false);
  }, [text]);

  useEffect(() => {
    if (isTypingComplete) return;

    if (displayText.length < text.length) {
      timeoutIdRef.current = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    } else {
      setIsTypingComplete(true);
    }

    return () => clearTimeout(timeoutIdRef.current);
  }, [displayText, text, speed, isTypingComplete]);

  return (
    <div className="speech-bubble-container">
      <div className="speech-bubble">
        <p>{displayText}{!isTypingComplete && <span className="cursor">|</span>}</p>
      </div>
    </div>
  );
};

export default SpeechBubble;