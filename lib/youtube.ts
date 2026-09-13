export function youtubeId(input:string):string|null {
 try {
  const url=new URL(input);
  if(url.protocol!=='https:')return null;
  const host=url.hostname.toLowerCase();
  const id=host==='youtu.be'?url.pathname.slice(1):['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(host)?url.searchParams.get('v')??url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1]:null;
  return id&&/^[a-zA-Z0-9_-]{11}$/.test(id)?id:null;
 } catch {return null;}
}
