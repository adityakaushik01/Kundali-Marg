import AriesImage from '../src/assets/aries.png';
import TaurusImage from '../src/assets/taurus.png';
import GeminiImage from '../src/assets/gemini.png';
import CancerImage from '../src/assets/cancer.png';
import LeoImage from '../src/assets/leo.png';
import VirgoImage from '../src/assets/virgo.png';
import LibraImage from '../src/assets/libra.png';
import ScorpioImage from '../src/assets/scorpio.png';
import SagittariusImage from '../src/assets/sagittarius.png';
import CapricornImage from '../src/assets/capricorn.png';
import AquariusImage from '../src/assets/aquarius.png';
import PiscesImage from '../src/assets/pisces.png';

const ZodiacSignSection = () => {

    const zodiacSigns = [
    {
      name: 'Aries',
      dates: 'Mar 21 - Apr 19',
      icon: (<img src={AriesImage} alt="Aries" className="w-30 h-30" />)
    },
    {
      name: 'Taurus',
      dates: 'Apr 20 - May 20',
      icon: (<img src={TaurusImage} alt="Taurus" className="w-30 h-30" />)
    },
    {
      name: 'Gemini',
      dates: 'May 21 - Jun 20',
      icon: (<img src={GeminiImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Cancer',
      dates: 'Jun 21 - Jul 22',
      icon: (<img src={CancerImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Leo',
      dates: 'Jul 23 - Aug 22',
      icon: (<img src={LeoImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Virgo',
      dates: 'Aug 23 - Sep 22',
      icon: (<img src={VirgoImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Libra',
      dates: 'Sep 23 - Oct 22',
      icon: (<img src={LibraImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Scorpio',
      dates: 'Oct 23 - Nov 21',
      icon: (<img src={ScorpioImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Sagittarius',
      dates: 'Nov 22 - Dec 21',
      icon: (<img src={SagittariusImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Capricorn',
      dates: 'Dec 22 - Jan 19',
      icon: (<img src={CapricornImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Aquarius',
      dates: 'Jan 20 - Feb 18',
      icon: (<img src={AquariusImage} alt="Gemini" className="w-30 h-30" />)
    },
    {
      name: 'Pisces',
      dates: 'Feb 19 - Mar 20',
      icon: (<img src={PiscesImage} alt="Gemini" className="w-30 h-30" />)
    }
  ];
    return (
        <section className="relative z-10 py-20 px-6">
        <div className="text-center mb-16">
          <p className="text-lg font-light mb-4 opacity-80">IDENTIFY YOUR</p>
          <h2 className="text-4xl font-light tracking-wider text-amber-400">Zodiac Sign</h2>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {zodiacSigns.map((sign, index) => (
            <div
              key={index}
              className="group border border-gray-600 hover:border-amber-400 p-8 text-center transition-all duration-300 cursor-pointer hover:bg-white/5"
            >
              <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {sign.icon}
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:text-amber-400 transition-colors">
                {sign.name}
              </h3>
              <p className="text-sm opacity-60 font-light">
                {sign.dates}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
}

export default ZodiacSignSection