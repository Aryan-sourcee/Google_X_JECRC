class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string,
    languageCode: string = 'en-US',
    onEnd?: () => void,
    onError?: () => void
  ): boolean {
    if (!this.synth) {
      console.warn('Speech synthesis not supported on this browser');
      return false;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.95; // slightly deliberate for emergency clarity
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = this.synth.getVoices();
    const targetVoice = voices.find((v) => v.lang.startsWith(languageCode.split('-')[0]));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      if (onError) onError();
    };

    this.synth.speak(utterance);
    return true;
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}

export const speechService = new TextToSpeechService();
