import React, { useEffect, useRef, useState } from 'react';
import { Video, Phone, Mic, MicOff, VideoOff, X, Clock, RotateCcw } from 'lucide-react';

interface CallInterfaceProps {
  target: string;
  mode: 'audio' | 'video' | '';
  isDemo: boolean;
  status: 'idle' | 'connecting' | 'in-call';
  onEndCall: () => void;
}

const CallInterface: React.FC<CallInterfaceProps> = ({ target, mode, isDemo, status, onEndCall }) => {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    if (status === 'in-call') {
      timer = window.setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'idle' || isDemo || mode !== 'video') return undefined;

    const acquireStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setLocalStream(null);
      }
    };

    acquireStream();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    };
  }, [status, isDemo, mode]);

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  if (status === 'idle' || !target) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-5 shadow-2xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{status === 'connecting' ? 'Connecting...' : 'In call with'} {target}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{mode === 'video' ? 'Video' : 'Audio'} {status === 'in-call' ? 'session active' : 'session starting'}</p>
        </div>
        <button onClick={onEndCall} className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 transition-all duration-200">
          <X size={16} />
        </button>
      </div>

      <div className="rounded-3xl bg-[hsl(var(--muted))] p-4 mb-4 text-sm text-[hsl(var(--muted-foreground))]">
        {isDemo
          ? 'This is a simulated demo call experience with ringing, timer, and interactive controls.'
          : 'Live audio/video support is enabled using browser media devices. Your camera and mic are captured securely on your device.'}
      </div>

      {mode === 'video' && (
        <div className="relative mb-4 overflow-hidden rounded-3xl bg-black/80 h-44">
          {localStream && !isDemo ? (
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-white/80">
              <VideoOff size={32} />
            </div>
          )}
          {status === 'connecting' && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white/90">
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="animate-spin" /> Connecting
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-[hsl(var(--foreground))]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--muted))] px-3 py-1">{status === 'in-call' ? <Clock size={14} /> : <Phone size={14} />} {status === 'in-call' ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : 'Ringing'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all duration-200"
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          {mode === 'video' && (
            <button
              type="button"
              onClick={() => setCameraOff((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-all duration-200"
            >
              {cameraOff ? <VideoOff size={18} /> : <Video size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
