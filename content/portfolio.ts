// Add projects here. Images and web videos live in public/media.
export type Film = { title: string; poster: string; youtube?: string; src?: string; url?: string };
export type Project = { id: string; title: string; category: string; year: string; image: string; role: string; creditLabel: string; credit: string; description: string; story: string; films?: Film[]; gallery?: string[] };
export const profile = {
 name: 'Omar Alothman', email: 'o.ot92@outlook.com', location: 'Dubai, UAE',
 introduction: 'I make images that carry a story.',
 biography: 'I’m Omar, a filmmaker, art director and artist based in Dubai. I work across film, photography and AI-assisted visuals, shaping ideas from the first concept through to the final frame.',
 philosophy: 'My work explores culture, memory and contemporary visual language. I’m interested in how an image feels, how a sequence moves, and what stays with you after it ends.',
 social: [
  {label:'Instagram',url:'https://www.instagram.com/omars.jpg/'},
  {label:'Collage Instagram',url:'https://www.instagram.com/omars.exe/'},
  {label:'Flickr',url:'https://www.flickr.com/photos/omars-jpg/'},
  {label:'LinkedIn',url:'https://www.linkedin.com/in/omar-alothman-265b1770/'},
 ],
 experience: [
  {role:'Art Director',company:'Rabdan Developments',date:'2026 — Present'},
  {role:'Media Specialist / Photographer',company:'The Creator Space',date:'2024 — 2026'},
  {role:'Content Creator',company:'ZeFi',date:'2020 — 2023'},
  {role:'Independent Photographer / Filmmaker',company:'Freelance',date:'2019 — Present'},
 ],
};
export const projects: Project[] = [
 {id:'house-of-saffron',title:'House of Saffron',category:'Documentary / Culture',year:'2025',image:'/media/saffron.jpg',role:'Direction, cinematography & editing',creditLabel:'Exhibited at',credit:'Sikka Art Festival · Dubai Culture',description:'An intimate exploration of saffron, told through the people who keep its traditions alive.',story:'Commissioned by Dubai Culture for Sikka Art Festival 2025, this five-minute ambient documentary was shown on loop inside the gallery at Al Shindagha. Through conversations with a perfumer and henna artist, a saffron merchant, and a poet and coffee maker, the film explores the cultural symbolism of saffron in the UAE.',films:[{title:'House of Saffron — Full film',poster:'/media/saffron.jpg',youtube:'Uif14YxZJaw'}]},
 {id:'archiving-the-now',title:'Archiving the Now',category:'Documentary / Memory',year:'2024',image:'/media/archiving.jpg',role:'Filmmaking & editing',creditLabel:'Exhibited at',credit:'Sikka Art Festival · Dubai Culture',description:'A portrait of Emirati photographer Mohammad Ahmad Bin Hashim and the memories held in his photographs.',story:'A reflective documentary about the visual legacy of Emirati photographer Mohammad Ahmad Bin Hashim. Presented by Dubai Culture as part of the official video exhibitions at Sikka Art Festival 2024 in Al Shindagha, Dubai. Running time: 7 minutes, 38 seconds.',films:[{title:'Archiving the Now — Full film',poster:'/media/archiving.jpg',youtube:'WZiwqsg2Efk'}]},
 {id:'ai-visuals',title:'Imagined Worlds',category:'AI / Visual storytelling',year:'2025 — 2026',image:'/media/jellyfish.jpg',role:'Concept, AI generation & editing',creditLabel:'Practice',credit:'Independent visual experiments',description:'Cinematic experiments at the meeting point of storytelling and emerging tools.',story:'A selection of independently developed AI films and visual experiments. Each work covers the complete creative process: concept development, storytelling, image generation, editing and final delivery. These pieces explore both realistic and stylized worlds.',films:[
  {title:'Jellyfish',poster:'/media/jellyfish.jpg',src:'/media/jellyfish.mp4'},
  {title:'The elevator',poster:'/media/interior.jpg',youtube:'VPx3jdG_PdI'},
  {title:'AI narrative experiment',poster:'/media/ai-film.jpg',youtube:'rbOsIEghkCw'},
  {title:'A world reimagined',poster:'/media/wes.jpg',youtube:'IxuCzh38brw'},
  {title:'Between Damascus and Deir Ezzor',poster:'/media/between-cities.jpg',youtube:'y_Xcjjj7zwc'},
  {title:'Floating bag',poster:'/media/bag.jpg',src:'/media/bag.mp4'},
  {title:'Floating bottle',poster:'/media/bottle.jpg',src:'/media/bottle.mp4'},
  {title:'Floating man',poster:'/media/man.jpg',src:'/media/man.mp4'},
 ]},
 {id:'behind-the-scenes',title:'Behind the Frame',category:'Photography / Production',year:'2024 — 2026',image:'/media/bts.jpg',role:'BTS photographer & media specialist',creditLabel:'Production / Client',credit:'The Creator Space / ADTV',description:'The moments around the take. Photography and media work on television productions.',story:'Behind-the-scenes photography and media work for Alboom Season 02, Squad Season 01, and Creatures Seasons 01 and 02. Produced by The Creator Space for ADTV in the UAE and Tunisia. My contribution included photography, BTS filming, short-form editing and creative support for pitch materials.',gallery:['/media/bts.jpg']},
 {id:'collage-art',title:'Fragments of Memory',category:'Digital collage / Personal',year:'Ongoing',image:'/media/collage-3.jpg',role:'Artist',creditLabel:'Themes',credit:'Identity, migration & memory',description:'Memories and emotions, reassembled into another kind of reality.',story:'Digital collage is a form of self-expression and emotional documentation in my practice. It began in Syria and evolved in the UAE, transforming memories and emotions into visual metaphors around identity, migration and memory.',gallery:Array.from({length:6},(_,i)=>`/media/collage-${i+1}.jpg`)},
 {id:'uae-stories',title:'Stories of the UAE',category:'Film / Creative contributions',year:'2026',image:'/media/uae.jpg',role:'Visual storytelling',creditLabel:'Subject',credit:'Culture & national identity',description:'Creative contributions celebrating the UAE through cinematic storytelling.',story:'A collection of visual works developed to creatively support and celebrate the UAE, reflecting national values through cinematic storytelling.',films:[
  {title:'UAE — Film 01',poster:'/media/uae.jpg',url:'https://www.instagram.com/reel/DWssO0-DCji/'},
  {title:'UAE — Film 02',poster:'/media/uae-2.jpg',url:'https://www.instagram.com/reel/DX6tQZ_sK3n/'},
  {title:'UAE — Film 03',poster:'/media/uae-3.jpg',url:'https://www.instagram.com/reel/DWE7-KtjnxZ/'},
 ]},
];
export const music: Film[] = [
 {title:'Guitar & oud',poster:'/media/oud.jpg',youtube:'2wpKcPoI9FA'},
 {title:'Farewell Damascus',poster:'/media/farewell.jpg',youtube:'Ima8jL3bzx4'},
 {title:'A musical moment',poster:'/media/oud.jpg',youtube:'IO1OL8VCdBo'},
];
