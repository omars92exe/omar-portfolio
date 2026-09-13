import fs from 'node:fs';
import path from 'node:path';
const folder='content/projects';
const files=fs.readdirSync(folder).filter(f=>f.endsWith('.json'));
const slugs=new Set();let live=0;
function localImage(value,label){if(typeof value!=='string'||!value.startsWith('/media/')||value.includes('..')||!fs.existsSync(path.join('public',value)))throw Error(`${label}: select an existing image in public/media.`)}
function https(value,label){const u=new URL(value);if(u.protocol!=='https:')throw Error(`${label}: use an HTTPS link.`);return u}
for(const file of files){
 const f=JSON.parse(fs.readFileSync(path.join(folder,file),'utf8'));
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug)||slugs.has(f.slug))throw Error(`${file}: slug must be unique and use lowercase words separated by hyphens.`);
 slugs.add(f.slug);
 if(typeof f.published!=='boolean')throw Error(`${file}: published must be true or false.`);
 if(!f.published)continue;
 live++;
 if(!f.title||!Number.isFinite(f.order))throw Error(`${file}: title and display order are required.`);
 for(const video of f.videos??[]){
 const u=https(video.youtube,file),host=u.hostname.toLowerCase();
 const id=host==='youtu.be'?u.pathname.slice(1):['www.youtube.com','youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(host)?u.searchParams.get('v')??u.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1]:null;
 if(!id||!/^[\w-]{11}$/.test(id))throw Error(`${file}: enter a valid YouTube video link.`);
 }
 if(!f.videos?.length)throw Error(`${file}: add at least one video.`);
 localImage(f.poster,file);
 for(const s of f.stills??[])localImage(s.image,file);
 for(const p of f.press??[]){if(!p.title)throw Error(`${file}: press links need titles.`);https(p.url,file)}
}
if(!live)throw Error('Publish at least one film.');
const profile=JSON.parse(fs.readFileSync('content/profile.json','utf8'));localImage(profile.portrait,'About portrait');
if(fs.readdirSync('public/media').some(f=>/\.(mp4|mov|webm)$/i.test(f)))throw Error('Video playback must use YouTube. Move local video files out of public/media.');
console.log(`Validated ${live} published projects, detail images, press links and About content.`);
