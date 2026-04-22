import { AnimatePresence, motion } from 'motion/react';
import { Linkedin, Check } from 'lucide-react';
import { FormEvent, useState } from 'react';

const premiumEasing = [0.22, 1, 0.36, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: customDelay, duration: 1, ease: premiumEasing }
  })
};

const WaveSVG = () => (
  <svg width="1200" height="180" viewBox="0 0 1200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block shrink-0">
    <path d="M0,90 C150,180 300,0 450,90 C600,180 750,0 900,90 C1050,180 1200,0 1200,90" fill="none" stroke="var(--color-brand-300)" strokeWidth="2" opacity="0.6" />
    <path d="M0,90 C150,0 300,180 450,90 C600,0 750,180 900,90 C1050,0 1200,180 1200,90" fill="none" stroke="var(--color-brand-200)" strokeWidth="1.5" opacity="0.8" />
  </svg>
);

function SleekBackgroundWaves() {
  return (
    <div className="absolute top-[35%] left-0 w-full h-[180px] -translate-y-1/2 overflow-hidden -z-10 pointer-events-none opacity-40">
      <motion.div 
        className="flex w-[2400px]"
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        <WaveSVG />
        <WaveSVG />
      </motion.div>
    </div>
  );
}

function getDetailedNextFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysUntilFriday = 5 - dayOfWeek;
  if (daysUntilFriday <= 0) daysUntilFriday += 7;
  
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  const month = nextFriday.toLocaleDateString('en-US', { month: 'long' });
  const day = nextFriday.getDate();
  return `Friday, ${month} ${day}`;
}

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-brand-950/80 backdrop-blur-2xl border-b border-brand-800/50">
      <div className="flex items-center justify-between px-5 sm:px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
          Orbit
        </div>
        <div className="flex items-center gap-8 text-[15px] font-medium tracking-tight">
          <a href="#pricing" className="text-brand-300 hover:text-white transition-colors hidden sm:block">
            Pricing
          </a>
          <a href="#subscribe" className="text-brand-300 hover:text-white transition-colors hidden sm:block">
            Subscribe
          </a>
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href="https://forms.gle/JwTDhPd1S6RhDQjRA" 
            target="_blank" 
            rel="noreferrer" 
            className="px-6 py-2.5 bg-white text-brand-950 font-medium rounded-[0.4rem] shadow-sm hover:bg-brand-50 transition-all"
          >
            Post a Job
          </motion.a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [role, setRole] = useState<'writer' | 'designer' | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="relative px-6 pt-32 pb-28 md:pt-48 md:pb-40 overflow-hidden flex flex-col justify-center min-h-[90vh] bg-brand-950" id="subscribe">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.4)_0%,transparent_50%)] pointer-events-none opacity-60" />
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-start text-left">
        
        {/* Eyebrow matching screenshot style */}
        <motion.div custom={0.05} initial="hidden" animate="visible" variants={fadeUpVariants} className="text-brand-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-10">
          The curated job board for creatives
        </motion.div>

        {/* Huge Heading */}
        <motion.h1 custom={0.1} initial="hidden" animate="visible" variants={fadeUpVariants} className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-light text-white leading-[1.05] tracking-tight mb-8 max-w-5xl">
          Where writers and designers <br className="hidden lg:block" />
          <span className="font-serif italic font-medium text-brand-300">land their next role.</span>
        </motion.h1>
        
        {/* Subtext */}
        <motion.p custom={0.2} initial="hidden" animate="visible" variants={fadeUpVariants} className="text-xl md:text-[1.35rem] text-brand-200/80 mb-12 max-w-2xl leading-[1.6]">
          hand-picked roles delivered weekly to 30,000+ subscribers
        </motion.p>
        
        {/* Actions */}
        <motion.div custom={0.3} initial="hidden" animate="visible" variants={fadeUpVariants} className="w-full max-w-xl flex justify-start">
          <AnimatePresence mode="wait">
            {!role && !subscribed && (
              <motion.div 
                key="buttons"
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full justify-start"
              >
                <button 
                  onClick={() => setRole('writer')} 
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white border border-brand-600 rounded-[0.4rem] font-medium text-[16px] shadow-lg hover:bg-brand-500 transition-all hover:scale-[1.02]"
                >
                  I'm a writer &rarr;
                </button>
                <button 
                  onClick={() => setRole('designer')} 
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-500 text-brand-100 rounded-[0.4rem] font-medium text-[16px] hover:bg-brand-900 hover:text-white transition-all hover:scale-[1.02]"
                >
                  I'm a designer &rarr;
                </button>
              </motion.div>
            )}

            {role && !subscribed && (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full justify-start"
              >
                <input 
                  type="email" 
                  placeholder={`Email for ${role} roles...`}
                  required
                  className="w-full sm:flex-1 px-6 py-4 bg-brand-900/50 border border-brand-800 rounded-[0.4rem] outline-none text-white placeholder:text-brand-400 font-medium text-[16px] focus:border-brand-500 transition-colors shadow-sm"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-10 py-4 bg-brand-600 text-white rounded-[0.4rem] font-medium text-[16px] shadow-sm hover:bg-brand-500 transition-colors"
                >
                  Subscribe
                </button>
              </motion.form>
            )}

            {subscribed && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="w-full px-6 py-4 border border-brand-800 bg-brand-900/50 text-white rounded-[0.4rem] font-medium text-[16px] flex items-center justify-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                Check your inbox. You're on the list.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

function PricingCard({ pretitle, title, pricePrefix, price, priceSuffix, features, cta, link, isPrimary, delay }: any) {
  return (
    <motion.div 
      custom={delay} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariants}
      className={`relative p-8 sm:p-10 flex flex-col h-full rounded-[2.5rem] transition-all duration-300 ${
        isPrimary 
        ? 'bg-white border-2 border-brand-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:scale-105 z-10' 
        : 'bg-white border border-gray-200 shadow-sm'
      }`}
    >
      {isPrimary && (
        <div className="absolute top-0 right-10 -translate-y-[45%] bg-brand-950 text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
          Most Popular
        </div>
      )}
      
      <div className="text-brand-500 font-bold text-xs tracking-widest uppercase mb-4 font-sans">{pretitle}</div>
      <h3 className="text-[2rem] font-serif text-brand-950 font-bold mb-6 tracking-tight leading-tight">{title}</h3>
      
      <div className="mb-2 flex items-baseline leading-none font-sans">
        {pricePrefix && <span className="text-2xl text-brand-800/80 mr-1.5">{pricePrefix}</span>}
        {price.startsWith('$') ? (
          <>
            <span className="text-[1.75rem] font-normal text-brand-950 mr-1 align-top self-start mt-2">$</span>
            <span className="text-[3.5rem] font-bold tracking-tight text-brand-950 leading-none">{price.slice(1)}</span>
          </>
        ) : (
          <span className="text-[3.5rem] font-bold tracking-tight text-brand-950 leading-none">{price}</span>
        )}
        {priceSuffix && <span className="text-[17px] font-medium text-gray-500 ml-2">{priceSuffix}</span>}
      </div>

      <a href={link} className={`block w-full text-center py-4 rounded-[0.8rem] font-semibold text-[17px] transition-all mt-8 mb-8 ${
        isPrimary 
        ? 'bg-brand-950 text-white hover:bg-brand-900 shadow-md' 
        : 'bg-brand-50 text-brand-950 hover:bg-brand-100 border border-brand-200/50'
      }`}>
        {cta}
      </a>

      <hr className="border-gray-100 mb-8" />

      <ul className="flex-1 space-y-4">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start gap-4">
             <Check className="w-[18px] h-[18px] text-orange-600 shrink-0 mt-0.5" strokeWidth={3} />
             <span className="text-[15px] leading-[1.6] text-gray-600 font-medium">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Pricing() {
  const nextFriday = getDetailedNextFriday();
  return (
    <div id="pricing">
      {/* Feature Part Header visually matched to screenshot */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#3B349E] border-none overflow-hidden">
        <motion.div 
          custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariants}
          className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="text-[#AFAEE1] font-bold text-[13px] sm:text-[15px] tracking-[0.25em] uppercase mb-8">
            Feature on Orbit
          </div>
          <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-serif tracking-tight text-white mb-8 leading-[1]">
            Reach 30,000+ Writers and Designers
          </h2>
          <p className="text-xl md:text-[1.35rem] text-white font-normal leading-relaxed max-w-2xl">
            Feature your roles or sponsor a placement in our weekly newsletter
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 sm:pb-32 pt-16 px-4 sm:px-6 md:px-8 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch relative">
             {/* Connecting Line hidden on mobile */}
             <div className="hidden md:block absolute top-[40%] left-0 right-0 h-px bg-gray-200 -z-10" />

             <PricingCard 
               delay={0.1}
               isPrimary={false}
               pretitle="For Publishers"
               title="Post a Job"
               price="$249"
               priceSuffix="per posting"
               features={[
                 "Priority placement in the Orbit newsletter",
                 "LinkedIn post across our founder network"
               ]}
               link="https://forms.gle/JwTDhPd1S6RhDQjRA"
               cta="Request a Slot"
             />
             <PricingCard 
               delay={0.2}
               isPrimary={true}
               pretitle="For Brands"
               title="Sponsor an Edition"
               pricePrefix="from"
               price="$249"
               priceSuffix="per placement"
               features={[
                 "Featured placement in our weekly send",
                 "Reach 30,000+ high-signal creatives"
               ]}
               link="https://forms.gle/ZBwuKQPjzSnqpgk57"
               cta="Request a Slot"
             />
          </div>

          <div className="mt-16 sm:mt-24 text-center">
            <p className="text-brand-950 text-[15px] font-semibold tracking-wide">
              Next edition: {nextFriday} at 10 AM EST &middot; Request by Thursday Evening
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <>
      {/* About Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-brand-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
            className="text-brand-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            About Us
          </motion.h2>
          
          <motion.div 
            custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          >
            <p className="text-2xl sm:text-[2rem] font-medium tracking-tight text-white leading-[1.4] mb-8">
              Finding good creative work shouldn't mean scrolling through a thousand low-quality listings.
            </p>
            <p className="text-lg sm:text-xl text-brand-200/80 leading-[1.8] mb-12 max-w-3xl mx-auto font-light">
              Every week, we hand-pick writing and design roles worth actually applying to, and send them straight to your inbox. Just roles that pay well, from teams worth working with.
            </p>
            <a href="#subscribe" className="inline-block px-10 py-4 bg-white text-brand-950 rounded-[0.8rem] font-medium text-[16px] hover:bg-brand-50 transition-colors shadow-lg hover:scale-[1.02]">
              Subscribe
            </a>
          </motion.div>
        </div>
      </section>

      {/* Team Section Extracted to Distinct Color Block */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-brand-50 text-brand-950 relative overflow-hidden border-t border-brand-100">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h3 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
            className="text-brand-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-16"
          >
            The Orbit Team
          </motion.h3>
          
          <div className="grid sm:grid-cols-2 gap-16 max-w-2xl mx-auto">
            <motion.div custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white mb-6 flex items-center justify-center text-brand-600 text-3xl font-medium shadow-sm border border-brand-100">
                JC
              </div>
              <h4 className="text-2xl font-semibold text-brand-950 tracking-tight">Josh Cons</h4>
              <p className="text-brand-600 mt-2 font-medium tracking-wide uppercase text-xs">Founder</p>
            </motion.div>

            <motion.div custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white mb-6 flex items-center justify-center text-brand-600 text-3xl font-medium shadow-sm border border-brand-100">
                YN
              </div>
              <h4 className="text-2xl font-semibold text-brand-950 tracking-tight">Yathin N.</h4>
              <p className="text-brand-600 mt-2 font-medium tracking-wide uppercase text-xs">Founders Office</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-8 bg-[#FCFBF9]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-[#1A1A1A] tracking-tight">Orbit</span>
          <span className="text-[14px] font-medium tracking-tight text-gray-500">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-8 text-gray-500">
          <motion.a whileHover={{ scale: 1.15, color: "#1A1A1A" }} whileTap={{ scale: 0.9 }} href="#" className="transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="w-4 h-4" />
          </motion.a>
          <motion.a whileHover={{ color: "#1A1A1A" }} whileTap={{ scale: 0.9 }} href="mailto:hello@orbit.xyz" className="transition-colors text-[14px] font-medium">
            Contact
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-200 selection:text-brand-950 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}
