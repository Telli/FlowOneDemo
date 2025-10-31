import React, { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={toggleListening}
        className={`w-20 h-20 rounded-full flex items-center justify-center ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white shadow-lg transition-colors`}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={isListening ? { repeat: Infinity, duration: 1 } : {}}
      >
        {isListening ? <Square size={32} /> : <Mic size={32} />}
      </motion.button>

      <p className="text-sm text-gray-600">
        {isListening ? 'Listening...' : 'Tap to speak'}
      </p>

      {/* Waveform visualization */}
      {isListening && (
        <div className="flex gap-1 items-end h-12">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-blue-500 rounded-full"
              animate={{
                height: ['20%', '100%', '20%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
