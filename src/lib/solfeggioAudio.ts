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

  public startFrequency(freqHz: number = 528, volume: number = 0.5) {
    try {
      if (isNaN(freqHz)) freqHz = 528;
      
      this.initAudio();
      if (!this.audioCtx) return;

      // Force stop any existing playing audio instantly
      this.stopFrequency();

      // Create new clean sine wave oscillator + gain
      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(freqHz, this.audioCtx.currentTime);

      // Smooth attack ramp (0.05s)
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(volume, this.audioCtx.currentTime + 0.05);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.oscillator.start();
      this.isPlaying = true;

      this.triggerHaptic([30, 40]);
    } catch (err) {
      console.error('[AudioEngine] Web Audio start failed:', err);
    }
  }

  public stopFrequency() {
    if (this.stopTimeoutId) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    if (this.oscillator) {
      try {
        if (this.gainNode && this.audioCtx) {
          this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
          this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        }
        this.oscillator.stop();
        this.oscillator.disconnect();
      } catch {
        // Ignore if already stopped
      }
      this.oscillator = null;
      this.gainNode = null;
    }
    this.isPlaying = false;
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

  public playForDuration(freqHz: number = 528, volume: number = 0.5, durationMs: number = 10000) {
    this.startFrequency(freqHz, volume);
    
    // startFrequency clears old timeouts synchronously.
    // Now we safely set the new 10s stop timer.
    this.stopTimeoutId = setTimeout(() => {
      this.stopFrequency();
      // Dispatch a custom event so React can update UI state
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('solfeggio-auto-stop'));
      }
      this.triggerHaptic([30, 30]);
    }, durationMs);
  }
}

export const solfeggioAudio = new SolfeggioAudioEngine();
