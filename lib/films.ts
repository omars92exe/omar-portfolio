export type Film = { slug:string; title:string; order:number; published:boolean; videos:{title:string;youtube:string;format:"vertical"|"landscape"}[]; poster:string; category:string; year?:string; role?:string; credit?:string; summary?:string; description?:string; stills?:{image:string;caption?:string;kind?:"press"|"event"}[]; press?:{title:string;publication?:string;url:string}[] };
const projects = Object.values(import.meta.glob<Film>('/content/projects/*.json', { eager: true, import: 'default' }))
 .filter(project => project.published)
 .sort((a,b) => a.order-b.order || a.title.localeCompare(b.title));
export function getFilms(): Film[] { return projects; }
