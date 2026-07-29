// ============================================================
// Solfeggio Web Audio Synthesizer & Haptic Feedback Engine
// ============================================================

class SolfeggioAudioEngine {
  private audioCtx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private stopTimeoutId: any = null;

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public startFrequency(freqHz: number = 528, volume: number = 0.15) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      // Cancel any pending stop timeouts
      if (this.stopTimeoutId) {
        clearTimeout(this.stopTimeoutId);
        this.stopTimeoutId = null;
      }

      // If oscillator is already active, smoothly glide the frequency instantly!
      if (this.oscillator && this.gainNode && this.isPlaying) {
        this.oscillator.frequency.cancelScheduledValues(this.audioCtx.currentTime);
        this.oscillator.frequency.setValueAtTime(freqHz, this.audioCtx.currentTime);
        this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
        this.gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
        return;
      }

      // Create new clean sine wave oscillator + harmonic gain
      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(freqHz, this.audioCtx.currentTime);

      // Smooth attack ramp (0.2s)
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(volume, this.audioCtx.currentTime + 0.2);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.oscillator.start();
      this.isPlaying = true;

      this.triggerHaptic([30, 40]);
    } catch (err) {
      console.warn('[AudioEngine] Web Audio initialization warning:', err);
    }
  }

  public stopFrequency() {
    if (this.stopTimeoutId) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    if (this.gainNode && this.audioCtx && this.oscillator) {
      const now = this.audioCtx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(0, now + 0.3);

      const oscToStop = this.oscillator;
      this.oscillator = null;
      this.isPlaying = false;

      this.stopTimeoutId = setTimeout(() => {
        try {
          oscToStop.stop();
          oscToStop.disconnect();
        } catch {
          // ignore if already stopped
        }
      }, 300);
    } else {
      this.isPlaying = false;
    }
  }

  public toggleFrequency(freqHz: number = 528): boolean {
    if (this.isPlaying) {
      this.stopFrequency();
      return false;
    } else {
      this.startFrequency(freqHz);
      return true;
    }
  }

  public triggerHaptic(pattern: number | number[] = 40) {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Haptics not supported or blocked
      }
    }
  }
}

export const solfeggioAudio = new SolfeggioAudioEngine();
