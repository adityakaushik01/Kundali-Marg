const DecorativeElement = () => {
    return (
<>
          <div className="fixed top-20 left-10 w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-amber-400/30"></div>
      </div>
      
      <div className="fixed bottom-10 left-10 opacity-20">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-400">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
          {Array.from({length: 16}).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="20"
              x2="50"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${i * 22.5} 50 50)`}
            />
          ))}
        </svg>
      </div>

      <div className="fixed top-32 right-20 opacity-20">
        <svg viewBox="0 0 100 100" className="w-32 h-32 text-amber-400">
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none"/>
          {Array.from({length: 20}).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="15"
              x2="50"
              y2="5"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 18} 50 50)`}
            />
          ))}
        </svg>
      </div>

      <div className="fixed bottom-20 right-10 w-20 h-20 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
          <path d="M50 10 Q60 40 50 50 Q40 40 50 10 M50 50 Q60 60 50 90 Q40 60 50 50" 
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
</>
)
}

export default DecorativeElement