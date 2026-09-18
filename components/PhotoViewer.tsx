import {useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,X} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';

type Photo={image:string;caption?:string};
export default function PhotoViewer({images,index,title,onChange,onClose,trigger}:{images:Photo[];index:number|null;title:string;onChange:(index:number)=>void;onClose:()=>void;trigger:React.RefObject<HTMLButtonElement|null>}){
 const gesture=useRef<{x:number;y:number;id:number}|null>(null);
 const suppressClick=useRef(false);
 const [drag,setDrag]=useState(0);
 const [direction,setDirection]=useState(1);
 const current=index??0;
 const move=(next:number)=>{if(next<0||next>=images.length||next===current)return;setDirection(next>current?1:-1);onChange(next)};
 return <Dialog open={index!==null} onOpenChange={open=>{if(!open)onClose()}}>
 <DialogContent className="photo-viewer" overlayClassName="photo-backdrop" onBackdropClick={onClose} showCloseButton={false} finalFocus={trigger} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(current+1)}if(event.key==='ArrowLeft'){event.preventDefault();move(current-1)}}} onClick={event=>{if(event.target===event.currentTarget)onClose()}}>
 <div className="photo-toolbar"><DialogClose className="photo-back"><ArrowLeft size={16}/> Back to project</DialogClose><span className="photo-project-name">{title}</span><DialogClose className="photo-dismiss" aria-label="Close photo"><X size={20}/></DialogClose></div>
 <DialogTitle className="sr-only">{title} — photo viewer</DialogTitle><DialogDescription className="sr-only">Swipe left or right, or use the arrow buttons to browse. Press Escape or tap outside the image to return to the project.</DialogDescription>
 <div className="photo-stage" onPointerDown={event=>{if(event.pointerType==='mouse'||!event.isPrimary)return;suppressClick.current=false;gesture.current={x:event.clientX,y:event.clientY,id:event.pointerId};event.currentTarget.setPointerCapture(event.pointerId)}} onPointerMove={event=>{
 const start=gesture.current;if(!start||start.id!==event.pointerId)return;
 const dx=event.clientX-start.x,dy=event.clientY-start.y;
 if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){suppressClick.current=true;setDrag((current===0&&dx>0||current===images.length-1&&dx<0)?dx*.2:dx)}
 }} onPointerUp={event=>{const start=gesture.current;if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;gesture.current=null;setDrag(0);if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2)move(current+(dx<0?1:-1))}} onPointerCancel={()=>{gesture.current=null;setDrag(0)}} onClick={event=>{
 if(suppressClick.current){suppressClick.current=false;return}
 const image=event.currentTarget.querySelector('img');if(!image||!image.naturalWidth)return;
 const r=image.getBoundingClientRect(),scale=Math.min(r.width/image.naturalWidth,r.height/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;
 const x=r.left+(r.width-w)/2,y=r.top+(r.height-h)/2;
 if(event.clientX<x||event.clientX>x+w||event.clientY<y||event.clientY>y+h)onClose();
 }}>
 <div className="photo-drag" style={{transform:`translateX(${drag}px)`,transition:drag?'none':'transform .25s ease'}}>
 {images[current]&&<img key={images[current].image} className={`photo-full photo-enter-${direction>0?'next':'previous'}`} src={images[current].image} alt={images[current].caption||title} draggable={false}/>}
 </div>
 </div>
 <div className="photo-footer"><p className="photo-caption" aria-live="polite">{images[current]?.caption||title}</p><div className="photo-controls"><button aria-label="Previous photo" disabled={current===0} onClick={()=>move(current-1)}><ArrowLeft size={19}/></button><span className="photo-count" aria-live="polite">{String(current+1).padStart(2,'0')} <span>/ {String(images.length).padStart(2,'0')}</span></span><button aria-label="Next photo" disabled={current===images.length-1} onClick={()=>move(current+1)}><ArrowRight size={19}/></button></div>
 {images.length>1&&<div className="photo-dots">{images.map((image,i)=><button key={image.image} aria-label={`Go to photo ${i+1}`} aria-current={current===i?'true':undefined} onClick={()=>move(i)}><span/></button>)}</div>}<span className="photo-swipe-hint">Swipe to explore</span></div>
 </DialogContent></Dialog>
}
