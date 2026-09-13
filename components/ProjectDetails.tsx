import {useEffect,useRef,useState} from 'react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
import type {Film} from '@/lib/films';
import {youtubeId} from '@/lib/youtube';
export default function ProjectDetails({project}:{project:Film}) {
 const [photo,setPhoto]=useState<number|null>(null);
 const photoTrigger=useRef<HTMLButtonElement|null>(null);
 const images=project.stills??[];
 const currentPhoto=photo===null?null:images[photo];
 const [playing,setPlaying]=useState<number|null>(null);
 const [playerStatus,setPlayerStatus]=useState<'idle'|'loading'|'slow'>('idle');
 useEffect(()=>{if(playerStatus!=='loading')return;const timer=window.setTimeout(()=>setPlayerStatus('slow'),10000);return()=>window.clearTimeout(timer)},[playing,playerStatus]);
 return <>
 <section className="project-videos" aria-label={`${project.title} videos`}>
 {project.videos.map((v,i)=><article key={v.youtube} className={`project-video ${v.format}`}>
 <div className="project-video-heading"><span>{String(i+1).padStart(2,'0')}</span><h3>{v.title}</h3></div>
 <div className="detail-screen">{playing===i?<iframe onLoad={()=>setPlayerStatus('idle')} onError={()=>setPlayerStatus('slow')} src={`https://www.youtube.com/embed/${youtubeId(v.youtube)}?autoplay=1&rel=0&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button className="detail-poster" onClick={()=>{setPlaying(i);setPlayerStatus('loading')}} aria-label={`Play ${v.title}`}><img src={project.videos.length===1?project.poster:`https://i.ytimg.com/vi/${youtubeId(v.youtube)}/hqdefault.jpg`} alt={v.title} loading="lazy"/><span>▶ Play</span></button>}</div>
 {playing===i&&playerStatus!=='idle'&&<p className="player-status" role="status">{playerStatus==='loading'?'Loading YouTube…':'The player is taking longer than expected in this browser.'} {playerStatus==='slow'&&<a href={v.youtube} target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>}</p>}
 <a className="youtube-fallback" href={v.youtube} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
 </article>)}
 </section>
 <div className="project-editorial"><div className="project-description"><span className="eyebrow">About the project</span>{project.description?.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div><dl className="project-credits"><dt>Role</dt><dd>{project.role}</dd>{project.year&&<><dt>Year</dt><dd>{project.year}</dd></>}{project.credit&&<><dt>Production / Context</dt><dd>{project.credit}</dd></>}</dl></div>
 {(['event','press'] as const).map(kind=>{const images=project.stills?.filter(s=>(s.kind||'event')===kind);return images?.length?<section className={`project-gallery ${kind}`} key={kind}><h3>{kind==='press'?'Press & recognition':'From the exhibition'}</h3><div>{images.map(s=><figure key={s.image}><button className="gallery-image-button" onClick={event=>{photoTrigger.current=event.currentTarget;setPhoto((project.stills??[]).findIndex(item=>item.image===s.image))}} aria-label={`View ${s.caption}`}><img src={s.image} alt={s.caption||project.title} loading="lazy"/></button><figcaption>{s.caption}</figcaption></figure>)}</div></section>:null})}
 {!!project.press?.length&&<section className="detail-press"><h3>Press & features</h3>{project.press.map(p=><a key={p.url} href={p.url} target="_blank" rel="noreferrer">{p.title} ↗</a>)}</section>}
 <Dialog open={photo!==null} onOpenChange={open=>{if(!open)setPhoto(null)}}><DialogContent className="photo-viewer" showCloseButton={false} finalFocus={photoTrigger}><div className="photo-toolbar"><DialogTitle className="photo-title">{currentPhoto?.caption||project.title}</DialogTitle><DialogClose className="photo-back">← Back to project</DialogClose></div><DialogDescription className="sr-only">Enlarged project image. Close to return to the project.</DialogDescription>{currentPhoto&&<img className="photo-full" src={currentPhoto.image} alt={currentPhoto.caption||project.title}/>}<div className="photo-controls"><button disabled={photo===0} onClick={()=>setPhoto(i=>Math.max(0,(i??0)-1))}>← Previous</button><span>{(photo??0)+1} / {images.length}</span><button disabled={photo===images.length-1} onClick={()=>setPhoto(i=>Math.min(images.length-1,(i??0)+1))}>Next →</button></div></DialogContent></Dialog>
 </>;
}
