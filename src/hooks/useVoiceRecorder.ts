import { useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
    } catch {
      setError("Не може да се получи достъп до микрофона.");
    }
  }, []);

  const stopAndTranscribe = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) return reject("No recorder");

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);

        try {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const arrayBuffer = await blob.arrayBuffer();
          const base64 = btoa(
            String.fromCharCode(...new Uint8Array(arrayBuffer))
          );

          const {
            data: { session },
          } = await supabase.auth.getSession();
          const token = session?.access_token;

          const response = await fetch("/.netlify/functions/transcribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              audioBase64: base64,
              mimeType: "audio/webm",
            }),
          });

          if (!response.ok) throw new Error("Transcription failed");
          const { text } = await response.json();
          resolve(text);
        } catch (err) {
          setError("Грешка при транскрипция.");
          reject(err);
        } finally {
          setIsTranscribing(false);
          mediaRecorder.stream.getTracks().forEach((t) => t.stop());
        }
      };

      mediaRecorder.stop();
    });
  }, []);

  return {
    isRecording,
    isTranscribing,
    error,
    startRecording,
    stopAndTranscribe,
  };
}
