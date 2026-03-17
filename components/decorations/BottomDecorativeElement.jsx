const BottomDecorativeElement = () => {
    return (
        <>
         <div className="fixed bottom-0 left-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
          {Array.from({length: 12}).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="20"
              x2="50"
              y2="10"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
          <path d="M50 10 Q60 40 50 50 Q40 40 50 10 M50 50 Q60 60 50 90 Q40 60 50 50" 
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      </>
    )
}

export default BottomDecorativeElement