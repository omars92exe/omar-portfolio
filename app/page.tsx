'use client';
/* oxlint-disable next/no-img-element -- Images are pre-optimized local assets; this is a static export without an image server. */
/* oxlint-disable jsx-a11y/media-has-caption -- The supplied portfolio videos do not include caption tracks. */
import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { profile, projects, music, type Project, type Film } from '@/content/portfolio';
const pad = (n:number) => String(n).padStart(2,'0');
export default function Home(){
 const [index,setIndex]=useState(0);
 const [selected,setSelected]=useState<Project|null>(null);
 const [film,setFilm]=useState<Film|null>(null);
 const [playing,setPlaying]=useState(false);
 const runway=useRef<HTMLElement>(null), stage=useRef<HTMLDivElement>(null), dialog=useRef<HTMLDivElement>(null);
 const p=projects[index];
 useEffect(()=>{
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   if(!runway.current||!stage.current)return;
   const distance=runway.current.offsetHeight-stage.current.offsetHeight;
   const progress=Math.max(0,Math.min(1,-runway.current.getBoundingClientRect().top/distance));
   setIndex(Math.round(progress*(projects.length-1)));
  })};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 function go(next:number){
  if(!runway.current||!stage.current)return;
  const n=(next+projects.length)%projects.length;
  const top=runway.current.getBoundingClientRect().top+window.scrollY;
  const distance=runway.current.offsetHeight-stage.current.offsetHeight;
  window.scrollTo({top:top+distance*n/(projects.length-1),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 function openProject(project:Project){setSelected(project);setFilm(project.films?.[0]??null);setPlaying(false)}
 function chooseFilm(item:Film){setFilm(item);setPlaying(false);dialog.current?.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}
 function openMusic(item:Film){setSelected({id:'music',title:item.title,category:'Music / Personal',year:'Ongoing',image:item.poster,role:'Musician',creditLabel:'Instruments',credit:'Guitar & oud',description:'Music as a parallel creative outlet.',story:'I’ve played guitar for over thirteen years and am exploring Khaleeji and Levantine melodies on the oud. Sometimes I collaborate with friends or bring music into my video projects.',films:music});setFilm(item);setPlaying(false)}
 return <main>
 <a className="skip-link" href="#project-index">Skip to project index</a>
 <aside className="identity"><a href="#work" aria-label="Omar Alothman home">OMAR ALOTHMAN<span>©</span></a><span className="identity-caption">ART DIRECTOR & FILMMAKER · 2026</span></aside>
 <section id="work" className="work-runway" ref={runway} style={{'--project-count':projects.length} as CSSProperties} aria-label="Selected work">
 <div className="work-stage" ref={stage}>
 <header className="topbar"><span>Art director & filmmaker</span><span>Based in Dubai, UAE<br/>Working across image & film</span><a href={`mailto:${profile.email}`}>Let’s talk ↗</a></header>
 <nav className="navigation" aria-label="Main navigation"><span className="eyebrow">Explore</span><a className="current" href="#work">Work</a><a href="#about">About</a><a href="#playground">Playground</a><a href="#contact">Contact</a></nav>
 <div className="project-meta" key={`meta-${p.id}`}><dl><div><dt>Role</dt><dd>{p.role}</dd></div><div><dt>Year</dt><dd>{p.year}</dd></div><div><dt>{p.creditLabel}</dt><dd>{p.credit}</dd></div></dl></div>
 <div className="image-stage" aria-hidden="false">
 <img key={`before-${p.id}`} className="ghost-image" src={projects[(index+projects.length-1)%projects.length].image} alt=""/>
 <button key={p.id} className="main-image" onClick={()=>openProject(p)} aria-label={`Explore ${p.title}`}><img src={p.image} alt={p.title} fetchPriority="high"/><span>{p.films?'View films':'Explore project'} ↗</span></button>
 <img key={`after-${p.id}`} className="below-image" src={projects[(index+1)%projects.length].image} alt=""/>
 </div>
 <div className="project-caption" key={`caption-${p.id}`}><span className="eyebrow">{p.category}</span><h1>{p.title}</h1><span className="dash">—</span><p>{p.description}</p></div>
 <div className="project-counter"><span className="eyebrow">Selected work</span><span className="big-number">{pad(index+1)}</span><span className="total">/{pad(projects.length)}</span></div>
 <div className="project-dots" aria-label="Choose a project">{projects.map((item,i)=><button key={item.id} className={i===index?'active':''} aria-label={`Show ${item.title}`} aria-current={i===index?'true':undefined} onClick={()=>go(i)} />)}</div>
 <footer className="stage-footer"><span>Stories, told through images.</span><div><button onClick={()=>go(index-1)} aria-label="Previous project">↑</button><button onClick={()=>go(index+1)} aria-label="Next project">↓</button></div><a href="#project-index">Scroll to discover ↓</a></footer>
 </div></section>
 <section id="project-index" className="index-section section-shell">
 <div className="section-top"><span className="eyebrow">01 / Selected work</span><span className="eyebrow">Film, image & everything between</span></div>
 <h2 className="section-heading">A closer look.</h2>
 <div className="work-grid">{projects.map((item,i)=><button className="work-card" key={item.id} onClick={()=>openProject(item)}><div className="work-card-image"><img loading="lazy" src={item.image} alt={item.title}/><span className="card-arrow">↗</span></div><div className="card-caption"><span>{pad(i+1)}</span><h3>{item.title}</h3><span>{item.year}</span></div><p>{item.category}</p></button>)}</div>
 </section>
 <section id="about" className="about-section section-shell">
 <div className="section-top"><span className="eyebrow">02 / About</span><span className="eyebrow">Omar Alothman · عمر العثمان</span></div>
 <h2 className="about-heading">An eye for the image.<br/><span>A feeling for the story.</span></h2>
 <div className="about-grid"><figure><img src="/media/omar.jpg" alt="Portrait of Omar Alothman" loading="lazy"/><figcaption>Omar Alothman — Dubai, UAE</figcaption></figure><div className="about-copy"><p>{profile.biography}</p><p>{profile.philosophy}</p><div className="disciplines"><span>Art direction</span><span>Filmmaking</span><span>Photography</span><span>AI visuals</span><span>Digital collage</span></div><a className="text-link" href={`mailto:${profile.email}`}>Let’s make something together ↗</a></div></div>
 <div className="experience"><span className="eyebrow">Along the way</span><div>{profile.experience.map(item=><div className="experience-row" key={item.company}><span>{item.role}<small>{item.company}</small></span><span>{item.date}</span></div>)}</div></div>
 <div className="about-notes"><p><span className="eyebrow">A different starting point</span>MD, AlFurat University · 2016<br/>MSc Clinical Pathology, Damascus University · 2023</p><p><span className="eyebrow">Creative community</span>International Documentary Association member<br/>twofour54 community through The Creator Space</p></div>
 </section>
 <section id="playground" className="playground-section section-shell">
 <div className="section-top"><span className="eyebrow">03 / Playground</span><span className="eyebrow">Personal work. Open-ended curiosity.</span></div>
 <div className="playground-intro"><h2 className="section-heading">Outside<br/>the frame.</h2><p>Collage, music and things that don’t fit neatly into a brief. A space for memory, identity and the joy of making.</p></div>
 <div className="collage-grid">{Array.from({length:6},(_,i)=><button key={i} onClick={()=>openProject(projects.find(item=>item.id==='collage-art')!)} aria-label={`View collage artwork ${i+1}`}><img src={`/media/collage-${i+1}.jpg`} alt={['A musician in a cosmic landscape','A city layered into an embrace','A whirling figure in a ruined city','A veiled portrait against a patterned background','A figure looking toward an eclipse','A city submerged in blue'][i]} loading="lazy"/></button>)}</div>
 <div className="playground-label"><span>Fragments of Memory / Digital collage</span><a href="https://www.instagram.com/omars.exe/" target="_blank" rel="noreferrer">More collage work ↗</a></div>
 <div className="music-section"><div><span className="eyebrow">Another kind of rhythm</span><h3>A musician<br/>at heart.</h3><p>Thirteen years of guitar. New conversations with the oud. Exploring Khaleeji and Levantine melodies along the way.</p></div><div className="music-grid">{music.map(item=><button key={item.title} onClick={()=>openMusic(item)}><img loading="lazy" src={item.poster} alt={item.title}/><span>{item.title}<span>↗</span></span></button>)}</div></div>
 </section>
 <footer id="contact" className="contact-section section-shell">
 <div className="section-top"><span className="eyebrow">04 / Contact</span><a href="#work">Back to top ↑</a></div>
 <h2>Have a story<br/>in mind?</h2><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a>
 <div className="contact-bottom"><div>Art director. Filmmaker. Artist.<br/>Based in Dubai, UAE.</div><div className="social-links">{profile.social.map(item=><a key={item.label} href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</div><span>© {new Date().getFullYear()} Omar Alothman</span></div>
 </footer>
 <Dialog open={selected!==null} onOpenChange={open=>{if(!open){setSelected(null);setFilm(null);setPlaying(false)}}}>
 <DialogContent ref={dialog} className="project-dialog">{selected&&<>
 <div className="dialog-kicker">{selected.category} <span>{selected.year}</span></div>
 <DialogTitle className="dialog-title">{selected.title}</DialogTitle>
 <DialogDescription className="dialog-description">{selected.description}</DialogDescription>
 {playing&&film&&(film.src||film.youtube)?<div className={`film-player ${film.src?'native-player':''}`}>{film.src?<video key={film.src} src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata"/>:<iframe key={film.youtube} src={`https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>}</div>:<div className="dialog-hero"><img src={film?.poster??selected.image} alt={film?.title??selected.title}/>{film&&(film.url?<a className="play-film" href={film.url} target="_blank" rel="noreferrer">Watch on Instagram ↗</a>:<button className="play-film" onClick={()=>setPlaying(true)}>▶ Play film</button>)}</div>}
 {film?.youtube&&<a className="video-fallback" href={`https://www.youtube.com/watch?v=${film.youtube}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>}
 <div className="dialog-story"><p>{selected.story}</p><dl><dt>Role</dt><dd>{selected.role}</dd><dt>{selected.creditLabel}</dt><dd>{selected.credit}</dd></dl></div>
 {selected.films&&selected.films.length>1&&<div className="film-list">{selected.films.map(item=><button key={item.title} onClick={()=>chooseFilm(item)} className={film?.title===item.title?'selected-film':''}><img src={item.poster} alt="" loading="lazy"/><span>{item.title}<small>{film?.title===item.title?'Selected':'Select film ↗'}</small></span></button>)}</div>}
 {selected.gallery&&selected.gallery.length>1&&<div className="dialog-gallery">{selected.gallery.map((src,i)=><img key={src} src={src} alt={`Collage artwork ${i+1}`} loading="lazy"/>)}</div>}
 {selected.id==='behind-the-scenes'&&<a className="text-link" href="https://www.flickr.com/photos/omars-jpg/" target="_blank" rel="noreferrer">Explore photography on Flickr ↗</a>}
 </>}</DialogContent></Dialog>
 </main>
}
