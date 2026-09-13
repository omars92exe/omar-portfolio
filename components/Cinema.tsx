import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Film } from '@/lib/films';
import ProjectDetails from './ProjectDetails';
import profile from '@/content/profile.json';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';
const clamp=(n:number,min=0,max=1)=>Math.max(min,Math.min(max,n));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t)};
const pad=(n:number)=>String(n).padStart(2,'0');
export default function Cinema({films}:{films:Film[]}) {
 const [introComplete,setIntroComplete]=useState(false);
 const loaderWord=useRef<HTMLDivElement>(null);
 const [loaded,setLoaded]=useState(false),[progress,setProgress]=useState(0),[active,setActive]=useState(-1),[selected,setSelected]=useState<Film|null>(null);
 const runway=useRef<HTMLElement>(null),scene=useRef<HTMLDivElement>(null),brand=useRef<HTMLButtonElement>(null),intro=useRef<HTMLDivElement>(null),details=useRef<HTMLDivElement>(null),counter=useRef<HTMLDivElement>(null);
 const dialogHeading=useRef<HTMLHeadingElement>(null);
 const captions=useRef<(HTMLDivElement|null)[]>([]);
 const cards=useRef<(HTMLButtonElement|null)[]>([]),activeRef=useRef(-1);
 useEffect(()=>{
  let cancelled=false,settled=0;
  const oldOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
  const assets=films.map(film=>new Promise<void>(resolve=>{const image=new Image();const done=()=>{settled++;if(!cancelled)setProgress(Math.round(settled/films.length*100));resolve()};image.onload=done;image.onerror=done;image.src=film.poster;if(image.complete){image.onload=null;image.onerror=null;done()}}));
  const maxWait=new Promise<void>(resolve=>{setTimeout(resolve,5000)});
  const minWait=new Promise<void>(resolve=>{setTimeout(resolve,window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:1800)});
  void Promise.all([Promise.race([Promise.all(assets),maxWait]),minWait]).then(()=>{if(!cancelled){setLoaded(true);document.documentElement.style.overflow=oldOverflow;}});
  return()=>{cancelled=true;document.documentElement.style.overflow=oldOverflow};
 },[films]);
 useEffect(()=>{
  if(!loaded)return;
  const word=loaderWord.current,target=brand.current;
  if(!word||!target){setIntroComplete(true);return;}
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setIntroComplete(true);return;}
  const from=word.getBoundingClientRect(),to=target.getBoundingClientRect();
  word.style.left=`${from.left}px`;word.style.top=`${from.top}px`;word.style.transform='none';word.style.transformOrigin='0 0';
  const animation=word.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${to.left-from.left}px,${to.top-from.top}px) scale(${to.width/from.width})`}],{duration:1050,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
  animation.onfinish=()=>setIntroComplete(true);
  return()=>animation.cancel();
 },[loaded]);
 useEffect(()=>{window.dispatchEvent(new Event('cinema-wake'))},[selected]);
 const modalOpen=useRef(false);modalOpen.current=!!selected;
 useEffect(()=>{
  let raf=0,last=0,current=0,viewportW=window.innerWidth,viewportH=scene.current?.clientHeight||window.innerHeight,dirty=true,visible=true;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateSize=()=>{viewportW=window.innerWidth;viewportH=scene.current?.clientHeight||window.innerHeight;dirty=true};
  const wake=()=>{dirty=true;if(!raf&&visible)raf=requestAnimationFrame(tick)};
  const onVisibility=()=>{visible=!document.hidden;if(visible)wake();else{cancelAnimationFrame(raf);raf=0}};
  function tick(time:number){
   raf=0;if(!runway.current||!scene.current)return;
   const target=clamp((window.scrollY-runway.current.offsetTop)/viewportH,0,1.25+Math.max(0,films.length-1)*.9);
   const dt=Math.min(64,time-last||16.7);last=time;
   current=reduced.matches?target:lerp(current,target,1-Math.exp(-dt/110));
   if(Math.abs(target-current)<.0001)current=target;
   const floating=current<1.25&&!reduced.matches&&!modalOpen.current;
   if(dirty||current!==target||floating){
    const zoom=smooth(current/1.25),position=Math.max(0,(current-1.25)/.9),mobile=viewportW<760;
    const focalWidth=Math.min(mobile?viewportW*.78:viewportW*.36,620),focalHeight=focalWidth*.68;
    const cx=viewportW*(mobile?.5:.56),cy=viewportH*(mobile?.45:.49);
    const overviewWidth=Math.min(viewportW*(mobile?.34:.205),viewportH*.27);
    const scatter=[[-.7,-.66,-12],[.34,-.8,9],[.82,-.3,-7],[-.92,.1,8],[.05,-.16,-4],[.66,.42,12],[-.46,.67,-9],[.19,.86,6],[-.24,-.89,3],[.93,.8,-6],[-.85,-.47,11],[.37,.15,-10],[-.19,.35,4]];
    films.forEach((film,i)=>{
     const el=cards.current[i];if(!el)return;
     const d=i-position,[sx,sy,tilt]=scatter[i%scatter.length];
     const depth=((i*7)%13)/12;
     const drift=reduced.matches?0:time*.00032;
     const floatX=Math.sin(drift+i*2.4)*(mobile?7:18),floatY=Math.cos(drift*.8+i*1.7)*(mobile?10:24);
     const ox=viewportW*.5+sx*viewportW*.27+floatX,oy=viewportH*.51+sy*viewportH*.25+floatY;
     const gx=cx+Math.sin(d*.65)*viewportW*.18,gy=cy+d*viewportH*(mobile?.76:.56);
     const scale=lerp(overviewWidth/focalWidth*lerp(.72,1.12,depth),Math.max(.5,1-Math.abs(d)*.14),zoom);
     const angle=lerp(tilt+(reduced.matches?0:Math.sin(drift+i)*3),clamp(d*10,-24,24),zoom);
     const opacity=lerp(1,1-smooth((Math.abs(d)-.65)/1.2),zoom);
     el.style.width=`${focalWidth}px`;el.style.height=`${focalHeight}px`;
     el.style.transform=`translate3d(${lerp(ox,gx,zoom)-focalWidth/2}px,${lerp(oy,gy,zoom)-focalHeight/2}px,0) perspective(1200px) rotateX(${lerp((sy*14),clamp(d*14,-30,30),zoom)}deg) rotateY(${lerp(sx*-17,clamp(d*-10,-20,20),zoom)}deg) rotate(${angle}deg) scale(${scale})`;
     el.style.opacity=String(opacity*lerp(.72+depth*.28,1,zoom));el.style.filter=`blur(${(1-zoom)*(1-depth)*3.2}px)`;el.style.setProperty('--edge-softness',`${lerp(7,1.5,zoom)}%`);el.style.zIndex=String(zoom<.2?100+Math.round(depth*30):150-Math.round(Math.abs(d)*10));
     const interactive=zoom<.2||Math.abs(d)<.5;el.style.pointerEvents=interactive?'auto':'none';el.tabIndex=interactive?0:-1;el.setAttribute('aria-hidden',String(!interactive));
     el.style.setProperty('--caption-opacity',String(0));el.style.setProperty('--overview-scale',String(overviewWidth/focalWidth));
    });
    if(intro.current){intro.current.style.opacity=String(1-smooth(current/.6));intro.current.style.transform=`translate3d(0,${-current*25}px,0)`;intro.current.style.pointerEvents=current<.3?'auto':'none';}
    const ui=smooth((zoom-.7)/.3);
    if(details.current){details.current.style.opacity=String(ui);details.current.style.transform=`translate3d(0,${(1-ui)*15}px,0)`;details.current.style.pointerEvents='none';}
    captions.current.forEach((el,i)=>{if(!el)return;const distance=i-position,near=Math.abs(distance);el.style.transform=`translate3d(0,${distance*viewportH*.22}px,0)`;el.style.filter=`blur(${reduced.matches?0:Math.min(6,near*5)}px)`;el.style.opacity=String(mobile?(near<.5?1:0):Math.max(0,1-near*.68));el.inert=near>=.5;el.setAttribute('aria-hidden',String(near>=.5));});
    if(counter.current)counter.current.style.opacity=String(ui);
    if(brand.current){const turn=mobile?0:zoom;brand.current.style.transform=`translate3d(${mobile?20:28}px,${lerp(25,mobile?25:245,turn)}px,0) rotate(${-90*turn}deg) scale(${lerp(1,mobile?.9:.77,zoom)})`;brand.current.style.setProperty('--brand-spread',`${lerp(0,3,zoom)}px`);}
    const next=zoom<.8?-1:Math.min(films.length-1,Math.round(position));if(next!==activeRef.current){activeRef.current=next;setActive(next)}
    dirty=false;
   }
   if(current!==target||floating)raf=requestAnimationFrame(tick);
  }
  window.addEventListener('cinema-wake',wake);window.addEventListener('scroll',wake,{passive:true});window.addEventListener('resize',updateSize);window.addEventListener('resize',wake);reduced.addEventListener('change',wake);document.addEventListener('visibilitychange',onVisibility);wake();
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('cinema-wake',wake);window.removeEventListener('scroll',wake);window.removeEventListener('resize',updateSize);window.removeEventListener('resize',wake);reduced.removeEventListener('change',wake);document.removeEventListener('visibilitychange',onVisibility)};
 },[films]);
 function go(index:number){const top=index<0?0:(1.25+clamp(index,0,films.length-1)*.9)*(scene.current?.clientHeight||window.innerHeight);window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 function openFilm(film:Film){setSelected(film)}
 const film=films[Math.max(0,active)];
 return <>
 {!introComplete&&<div className={`preloader ${loaded?'is-leaving':''}`}><output className="sr-only">Opening projects: {progress}%</output><div className="loader-top"><span>OMAR ALOTHMAN</span><span>FILM / DIRECTION</span></div><div className="loader-word" ref={loaderWord}><span>OMAR</span><span>ALOTHMAN</span></div><div className="loader-bottom"><span>Opening projects</span><span>{pad(progress)} / 100</span><button onClick={()=>{setLoaded(true);document.documentElement.style.overflow='';}}>Skip intro</button></div><div className="loader-progress" style={{transform:`scaleX(${progress/100})`}}/></div>}
 <main inert={!loaded} className={`cinema ${loaded?'is-ready':''} ${introComplete?'intro-complete':''}`}>
 <a className="skip-link" href="#film-list">Skip animation / Browse projects</a>
 <button onClick={()=>go(-1)} ref={brand} className="brand" aria-label="Omar Alothman — all projects"><span>OMAR</span><span>ALOTHMAN</span></button>
 <header className="site-header"><span className="header-location">Filmmaker & art director<br/>{profile.location}</span><nav aria-label="Main navigation"><button onClick={()=>go(-1)}>Projects</button><Link to="/about">About</Link><a href="#contact">Contact</a></nav></header>
 <section className="cinema-runway" ref={runway} style={{height:`${100+125+Math.max(0,films.length-1)*90}svh`}} aria-label="Project collection">
 <div className="cinema-scene" ref={scene}>
 <div className="overview-copy" ref={intro} inert={active>=0}><div className="overview-heading"><h1>Projects.</h1><span>A selection by Omar Alothman</span></div><div className="overview-bottom"><span>{pad(films.length)} projects<br/>A collection in motion</span><button onClick={()=>go(0)}>Scroll to explore <span className="scroll-line"/></button><span>Film. Feeling.<br/>A different perspective.</span></div></div>
 <div className="film-space">{films.map((f,i)=><button ref={el=>{cards.current[i]=el}} key={f.slug} className="film-plane" style={{'--entry-delay':`${i*.045}s`} as CSSProperties} onClick={()=>openFilm(f)} aria-label={`Open ${f.title}`}><span className="cover-window"><img src={f.poster} alt={f.title} fetchPriority={i<2?'high':'auto'}/></span><span className="plane-label"><span>{pad(i+1)}</span><span className="plane-name">{f.title}</span></span><span className="plane-play" aria-hidden="true">↗</span></button>)}</div>
 <div className="film-information" ref={details} aria-hidden={active<0}><div className="film-role"><span className="eyebrow">Role</span><p>{film?.role}</p><span className="eyebrow">{film?.year?'Year':'Type'}</span><p>{film?.year||film?.category}</p></div>{films.map((f,i)=><div className="film-title project-caption" key={f.slug} ref={el=>{captions.current[i]=el}}><span className="eyebrow">{f.category}</span><h2>{f.title}</h2><button className="underlined" tabIndex={active===i?0:-1} onClick={()=>openFilm(f)}>View project ↗</button></div>)}</div>
 <div className="film-counter" ref={counter}><span className="eyebrow">Selected project</span><span className="counter-number">{pad(Math.max(0,active)+1)}</span><span className="counter-total">/{pad(films.length)}</span></div>
 <div className="scene-bottom"><button onClick={()=>go(-1)}>Overview</button><div className="scene-progress">{films.map((f,i)=><button key={f.slug} onClick={()=>go(i)} aria-label={`Go to ${f.title}`} aria-current={i===active?'true':undefined}><span/></button>)}</div><div className="scene-arrows"><button disabled={active<0} aria-label="Previous project" onClick={()=>go(active-1)}>↑</button><button disabled={active===films.length-1} aria-label="Next project" onClick={()=>go(active+1)}>↓</button></div></div>
 </div></section>
 <section id="film-list" className="film-index"><span className="eyebrow">The complete selection</span>{films.map((f,i)=><button key={f.slug} onClick={()=>openFilm(f)}><span>{pad(i+1)}</span><h2>{f.title}</h2><span>{f.category}</span><span>↗</span></button>)}</section>
 <footer id="contact" className="contact"><span className="eyebrow">Have a story in mind?</span><a className="contact-heading" href={`mailto:${profile.email}`}>Let’s talk.</a><a className="email" href={`mailto:${profile.email}`}>{profile.email}</a><div className="contact-bottom"><span>© 2026 Omar Alothman</span><SocialLinks/><button onClick={()=>go(-1)}>Back to the beginning ↑</button></div></footer>
 </main>
 <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="film-dialog" initialFocus={dialogHeading}>{selected&&<div className="project-scroll"><DialogTitle className="dialog-title" ref={dialogHeading} tabIndex={-1}>{selected.title}</DialogTitle><DialogDescription className="dialog-description">{selected.category}{selected.year?` · ${selected.year}`:''}</DialogDescription><ProjectDetails key={selected.slug} project={selected}/></div>}</DialogContent></Dialog>
 </>;
}
