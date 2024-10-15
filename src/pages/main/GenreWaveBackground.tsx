const GenreWaveBackground: React.FC<{ color: string; className?: string }> = ({ color, className }) => {
  const svg = `
    <svg width="159" height="183" viewBox="0 0 159 183" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.109589 182.18C0.109589 173.44 2.3496 165.53 5.8696 157.53C18.5496 128.76 18.6896 104.35 8.5896 77.52C-14.6904 19.48 16.9896 0.350017 20.1596 0.330017H123.22H143.07C151.65 0.330017 158.61 7.29001 158.61 15.87V167.4C158.61 175.98 151.65 182.94 143.07 182.94H0.0996094V182.18H0.109589Z" 
      fill="${color}"
      transform="scale(-1, 1) translate(-159, 0)" 
      />
    </svg>
  `;

  const backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <div
      className={className}
      style={{
        width: '170px',
        height: '182px',
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    </div>
  );
};

export default GenreWaveBackground;