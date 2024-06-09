// components/SpeechBubble.jsx
import React, { useEffect, useState } from 'react';
import '../styles/SpeechBubble.css';

const SpeechBubble = ({ text, speed = 50, onFinishTyping }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (displayText.length < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    } else if (!isTypingComplete) {
      setIsTypingComplete(true);
      if (onFinishTyping) onFinishTyping();
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, text, speed, isTypingComplete, onFinishTyping]);

  return (
    <div className="speech-bubble-container">
      <div className="speech-bubble">
        <p>{displayText}{!isTypingComplete && <span className="cursor">|</span>}</p>
      </div>
    </div>
  );
};

export default SpeechBubble;