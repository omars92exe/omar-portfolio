import { getFilms } from '@/lib/films';
import Cinema from '@/components/Cinema';
export default function Home(){return <Cinema films={getFilms()}/>;}
