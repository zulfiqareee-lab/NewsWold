import React, { useState, useEffect, useRef } from 'react';
import { ShortVideoItem } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Languages,
  Download,
  ShieldCheck,
  Music,
  Share2,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface VerticalVideoPlayerProps {
  video: ShortVideoItem;
  onApprove?: (id: string) => void;
  onReject?: (id: string, reason: string) => void;
  onPublishYouTube?: (id: string) => void;
  onPublishFacebookReel?: (id: string) => void;
}

export const VerticalVideoPlayer: React.FC<VerticalVideoPlayerProps> = ({
  video,
  onApprove,
  onReject,
  onPublishYouTube,
  onPublishFacebookReel
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeLang, setActiveLang] = useState<'bn' | 'en'>(video.language === 'en' ? 'en' : 'bn');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const duration = video.durationSeconds || 40;

  // Active subtitle tracking
  useEffect(() => {
    if (!video.subtitles || video.subtitles.length === 0) {
      setActiveSubtitle(activeLang === 'bn' ? video.headlineBn : video.headlineEn);
      return;
    }

    const currentCue = video.subtitles.find(
      (cue) => currentTime >= cue.timeStart && currentTime <= cue.timeEnd
    );

    if (currentCue) {
      setActiveSubtitle(activeLang === 'bn' ? currentCue.textBn : currentCue.textEn);
    } else {
      setActiveSubtitle(activeLang === 'bn' ? video.headlineBn : video.headlineEn);
    }
  }, [currentTime, activeLang, video]);

  // Speech synthesis for AI voiceover preview
  const speakNarration = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = video.voiceover.speed || 1.0;
    utterance.pitch = video.voiceover.pitch || 1.0;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(langCode));
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now() - pausedAtRef.current * 1000;

      // Trigger voiceover at start or resume
      const textToSpeak = activeLang === 'bn' ? video.scriptBn : video.scriptEn;
      speakNarration(textToSpeak, activeLang);

      const updateProgress = (now: number) => {
        if (!startTimeRef.current) return;
        const elapsedSec = (now - startTimeRef.current) / 1000;

        if (elapsedSec >= duration) {
          setCurrentTime(duration);
          setIsPlaying(false);
          pausedAtRef.current = 0;
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        } else {
          setCurrentTime(elapsedSec);
          animFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      pausedAtRef.current = currentTime;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, activeLang, isMuted, duration]);

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
      pausedAtRef.current = 0;
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    pausedAtRef.current = 0;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setTimeout(() => {
      setIsPlaying(true);
    }, 50);
  };

  const toggleLanguage = () => {
    const newLang = activeLang === 'bn' ? 'en' : 'bn';
    setActiveLang(newLang);
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const textToSpeak = newLang === 'bn' ? video.scriptBn : video.scriptEn;
      speakNarration(textToSpeak, newLang);
    }
  };

  // 9:16 Canvas Video Exporter using MediaRecorder
  const handleExportVerticalVideo = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(10);

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = video.visuals.primaryImageUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Continue even if fallback
    });

    setExportProgress(40);

    // Render 1080x1920 canvas frame
    // Background gradient & image
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1080, 1920);

    if (img.complete && img.naturalWidth > 0) {
      // Draw centered image scaled to fit upper 9:16 area
      const scale = Math.max(1080 / img.naturalWidth, 1920 / img.naturalHeight) * 1.1;
      const x = (1080 - img.naturalWidth * scale) / 2;
      const y = (1920 - img.naturalHeight * scale) / 2;
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);

      // Gradient overlay for contrast
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, 'rgba(0,0,0,0.75)');
      grad.addColorStop(0.35, 'rgba(0,0,0,0.2)');
      grad.addColorStop(0.65, 'rgba(0,0,0,0.6)');
      grad.addColorStop(1, 'rgba(0,0,0,0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);
    }

    // Header branding
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.roundRect(80, 100, 360, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('NEWS WORLD 9:16', 110, 142);

    // Category pill
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.roundRect(460, 100, 540, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(video.categoryNameBn || video.categorySlug, 490, 140);

    // Headline Center Banner
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px sans-serif';
    const headline = activeLang === 'bn' ? video.headlineBn : video.headlineEn;
    wrapText(ctx, headline, 80, 1250, 920, 85);

    // Subtitle card
    ctx.fillStyle = 'rgba(220, 38, 38, 0.9)';
    ctx.beginPath();
    ctx.roundRect(80, 1550, 920, 180, 24);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '500 38px sans-serif';
    const subText = activeSubtitle || (activeLang === 'bn' ? video.scriptBn : video.scriptEn);
    wrapText(ctx, subText, 120, 1610, 840, 52);

    // Watermark footer
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '32px sans-serif';
    ctx.fillText('newsworld-portal.org | Official AI Video Studio', 80, 1830);

    setExportProgress(80);

    // Export high-res 9:16 PNG / Poster
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsworld-short-${video.id}-1080x1920.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setExportProgress(100);
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 800);
    }, 'image/png');
  };

  // Canvas text wrap helper
  function wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = Math.min(100, (currentTime / duration) * 100);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-stone-900 border border-stone-800 rounded-2xl p-5 text-stone-100 shadow-2xl">
      {/* LEFT: 9:16 VERTICAL SMARTPHONE REEL/SHORT PREVIEW PLAYER */}
      <div className="relative mx-auto w-[310px] sm:w-[330px] h-[550px] sm:h-[590px] rounded-[36px] p-3 bg-stone-950 border-4 border-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0 flex flex-col justify-between overflow-hidden select-none">
        
        {/* Phone Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-10 h-1 bg-stone-700 rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800 ml-2" />
        </div>

        {/* 9:16 Content Viewport */}
        <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex flex-col justify-between">
          
          {/* Animated Ken Burns Background Visual */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={video.visuals.primaryImageUrl}
              alt={video.headlineEn}
              className={`w-full h-full object-cover transition-transform duration-1000 ease-linear ${
                isPlaying ? 'scale-115 translate-y-1' : 'scale-100'
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
          </div>

          {/* TOP OVERLAYS: Branding & Category */}
          <div className="relative z-10 p-4 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                NEWS WORLD
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium text-[10px] truncate max-w-[130px]">
                {video.categoryNameBn || video.categorySlug}
              </span>
            </div>

            <button
              onClick={toggleLanguage}
              title="Toggle Audio/Subtitle Language"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/90 text-amber-300 border border-amber-500/30 text-[10px] font-bold backdrop-blur-sm transition-colors"
            >
              <Languages className="w-3 h-3" />
              <span>{activeLang === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>
          </div>

          {/* CENTER: DYNAMIC SYNCHRONIZED SUBTITLE CARD */}
          <div className="relative z-10 px-4 py-2 flex flex-col justify-center items-center text-center">
            <div className="bg-red-600/90 backdrop-blur-md border border-red-500/40 rounded-xl px-3 py-2 text-white font-semibold text-xs sm:text-sm shadow-xl leading-relaxed max-w-[92%] animate-fade-in">
              <span className="font-extrabold text-amber-200 block text-[9px] uppercase tracking-wider mb-0.5">
                {activeLang === 'bn' ? 'সাবটাইটেল ও ভয়েসওভার' : 'SYNCHRONIZED CAPTIONS'}
              </span>
              "{activeSubtitle}"
            </div>
          </div>

          {/* BOTTOM: AUDIO WAVEFORM & HEADLINE TICKER */}
          <div className="relative z-10 p-4 pb-4 space-y-2.5">
            {/* Audio Waveform Animation */}
            {video.visuals.hasWaveform && isPlaying && (
              <div className="flex items-center justify-center gap-1 h-5">
                {[6, 12, 18, 24, 14, 20, 8, 16, 22, 10, 14, 20, 8].map((height, i) => (
                  <span
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.max(4, Math.sin((currentTime * 4) + i) * height + 10)}px`,
                      animationDuration: `${0.4 + (i % 3) * 0.2}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Headline Ticker */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/10">
              <p className="text-xs font-bold text-white line-clamp-2 leading-snug">
                {activeLang === 'bn' ? video.headlineBn : video.headlineEn}
              </p>
              <div className="flex items-center justify-between text-[9px] text-stone-400 mt-1">
                <span>9:16 Vertical HD</span>
                <span>{video.backgroundMusic.trackTitle.slice(0, 24)}</span>
              </div>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-300 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* In-Phone Action Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleRestart}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: EDITORIAL METADATA, SCRIPTS & MULTI-PLATFORM PUBLISHING CONTROLS */}
      <div className="flex-1 flex flex-col justify-between space-y-5">
        <div>
          {/* Header & Status Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Short-Video Project</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                    {video.id}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Vertical 9:16 (1080×1920) | Duration: {duration}s | Formatted for YouTube Shorts & Facebook Reels
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                  video.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : video.status === 'approved'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : video.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                Status: {video.status}
              </span>
            </div>
          </div>

          {/* Dual Script Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <span>বাংলা স্ক্রিপ্ট (Bengali Narration)</span>
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {video.scriptBn.length} chars
                </span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">{video.scriptBn}</p>
            </div>

            <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <span>English Script (International)</span>
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {video.scriptEn.length} chars
                </span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">{video.scriptEn}</p>
            </div>
          </div>

          {/* Subtitles Timeline Cue Table */}
          <div className="mt-4 bg-stone-950/50 rounded-xl p-3 border border-stone-800">
            <h4 className="text-xs font-bold text-stone-300 mb-2 flex items-center justify-between">
              <span>Synchronized Subtitle Cues ({video.subtitles.length} cues)</span>
              <span className="text-[10px] text-stone-500 font-normal">Auto-synced with voiceover timeline</span>
            </h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
              {video.subtitles.map((cue, idx) => (
                <div
                  key={cue.id}
                  onClick={() => setCurrentTime(cue.timeStart)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                    currentTime >= cue.timeStart && currentTime <= cue.timeEnd
                      ? 'bg-red-950/60 border-red-700/60 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-0.5">
                    <span className="text-amber-400 font-semibold">Cue #{idx + 1} ({cue.timeStart}s - {cue.timeEnd}s)</span>
                  </div>
                  <div className="font-medium text-stone-200">{cue.textBn}</div>
                  <div className="text-[11px] text-stone-400">{cue.textEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Licensing & Provenance Proof */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-950/60 p-2.5 rounded-lg border border-stone-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-300 block">AI Voice Compliance</span>
                <span className="text-stone-400 text-[11px]">{video.voiceover.complianceNote}</span>
              </div>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-lg border border-stone-800 flex items-start gap-2">
              <Music className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-300 block">Licensed Background Music</span>
                <span className="text-stone-400 text-[11px]">
                  {video.backgroundMusic.trackTitle} ({video.backgroundMusic.licenseType} #{video.backgroundMusic.licenseCertNumber})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="border-t border-stone-800 pt-4 space-y-3">
          {/* Export / Download Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleExportVerticalVideo}
              disabled={isExporting}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{isExporting ? `Exporting 1080x1920 Poster (${exportProgress}%)...` : 'Export 1080x1920 Poster'}</span>
            </button>

            {/* Social Automation Trigger Buttons */}
            <div className="flex items-center gap-2">
              {onPublishYouTube && (
                <button
                  onClick={() => onPublishYouTube(video.id)}
                  disabled={video.youtubeShort.status === 'published'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>
                    {video.youtubeShort.status === 'published' ? 'YouTube Uploaded ✓' : 'Upload to YouTube #Shorts'}
                  </span>
                </button>
              )}

              {onPublishFacebookReel && (
                <button
                  onClick={() => onPublishFacebookReel(video.id)}
                  disabled={video.facebookReel.status === 'published'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>
                    {video.facebookReel.status === 'published' ? 'FB Reel Uploaded ✓' : 'Upload Facebook Reel (Limit: 4/day)'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Admin Approval Row */}
          {video.status === 'pending' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-950/40 border border-amber-800/40">
              <span className="text-xs text-amber-200">
                <strong>Admin Approval Required:</strong> Verify script, voiceover and licensing before publication.
              </span>
              <div className="flex items-center gap-2">
                {onReject && (
                  <button
                    onClick={() => onReject(video.id, 'Needs editorial adjustments')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                  >
                    Reject
                  </button>
                )}
                {onApprove && (
                  <button
                    onClick={() => onApprove(video.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                  >
                    Approve Video Project
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
