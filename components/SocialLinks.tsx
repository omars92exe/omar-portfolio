import profile from '@/content/profile.json';

export default function SocialLinks() {
  return (
    <nav className="social-icons" aria-label="Personal social profiles">
      {profile.social.map(({label,url}) => (
        <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Omar Alothman (opens in a new tab)`} title={label}>
          {label === 'Instagram' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7.5" cy="7" r=".9" fill="currentColor" stroke="none"/></svg>
          )}
        </a>
      ))}
    </nav>
  );
}
