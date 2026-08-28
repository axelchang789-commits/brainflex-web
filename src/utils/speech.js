// Web Speech API helper for reading text aloud to seniors
let synth = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function speakText(text, onEnd) {
  if (!synth) return;

  // Cancel any ongoing speech
  synth.cancel();

  if (!text || typeof text !== 'string') return;

  const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.9; // Slightly slower, clear pace for seniors
  utterance.pitch = 1.0;

  // Try to pick a Traditional Chinese voice if available
  const voices = synth.getVoices();
  const zhVoice = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh-HK' || v.lang.startsWith('zh'));
  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  synth.speak(utterance);
}

export function stopSpeech() {
  if (synth) {
    synth.cancel();
  }
}
