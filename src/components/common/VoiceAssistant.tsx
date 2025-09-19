import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VoiceAssistantProps {
  onFieldFocus?: (fieldName: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onFieldFocus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleUserInput(transcript.toLowerCase());
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleUserInput = (input: string) => {
    let response = '';
    
    // Handle different user queries
    if (input.includes('help me fill out this form') || input.includes('guide')) {
      response = "I can help you fill out the registration form. You can ask about specific fields like name, phone, email, or documents required.";
    } 
    else if (input.includes('name')) {
      response = "Please enter your full name as it appears on your official documents.";
      onFieldFocus?.('name');
    }
    else if (input.includes('phone') || input.includes('mobile')) {
      response = "Enter your 10-digit mobile number that you actively use.";
      onFieldFocus?.('phone');
    }
    else if (input.includes('email')) {
      response = "Enter your email address. This will be used for important notifications.";
      onFieldFocus?.('email');
    }
    else if (input.includes('document') || input.includes('documents')) {
      response = "You'll need to provide your Aadhaar card, and optionally PAN card and Voter ID.";
      onFieldFocus?.('documents');
    }
    else if (input.includes('address')) {
      response = "Please provide your current residential address. Make sure to include your street, city, state, and PIN code.";
      onFieldFocus?.('address');
    }
    else if (input.includes('skill') || input.includes('skills')) {
      response = "Select all the skills that apply to you from the list. You can choose multiple skills.";
      onFieldFocus?.('skills');
    }
    else {
      response = "I'm sorry, I didn't understand that. Could you please rephrase your question?";
    }

    speakResponse(response);
    resetTranscript();
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);

      // Also show the response as a toast
      toast({
        description: text,
        duration: 5000,
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          className="rounded-full w-12 h-12 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Mic className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Voice Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            {listening 
              ? "I'm listening... Ask your question!"
              : "Click the microphone and ask how I can help you with the registration"}
          </div>

          {transcript && (
            <div className="text-sm bg-muted p-2 rounded mb-4">
              You said: {transcript}
            </div>
          )}

          <div className="flex justify-center">
            <Button 
              variant={listening ? "destructive" : "default"}
              onClick={toggleListening}
              disabled={isSpeaking}
              className="w-full"
            >
              {listening ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Listening
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceAssistant;