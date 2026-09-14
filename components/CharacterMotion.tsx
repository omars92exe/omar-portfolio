import { useEffect, useRef, useState } from 'react';

export default function CharacterMotion({ active }: { active: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playingFrame, setPlayingFrame] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (reduced.matches) setPlayingFrame(false);
      if (active && !document.hidden && !reduced.matches) {
        element.muted = true;
        void element.play().catch(() => setPlayingFrame(false));
      } else {
        element.pause();
      }
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    reduced.addEventListener('change', syncPlayback);
    return () => {
      element.pause();
      document.removeEventListener('visibilitychange', syncPlayback);
      reduced.removeEventListener('change', syncPlayback);
    };
  }, [active]);

  return <div className="character-crop">
    <img src="/media/omar-world.png" alt="" fetchPriority="high" />
    <video ref={video} className={playingFrame ? 'character-video is-playing' : 'character-video'}
      src="/media/omar-character.mp4" muted loop playsInline preload="metadata"
      disablePictureInPicture onPlaying={() => setPlayingFrame(true)}
      onError={() => setPlayingFrame(false)} aria-hidden="true" />
  </div>;
}
