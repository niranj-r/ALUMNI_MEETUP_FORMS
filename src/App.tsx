import AlumniRegistrationForm from './components/AlumniRegistrationForm';
import EventInfo from './components/EventInfo';
import EventPoster from './components/EventPoster';
import FormsClosed from './components/FormsClosed';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--dominant-bg)] via-[var(--white)] to-[var(--dominant-bg)] py-16 px-4 relative overflow-hidden">
      {/* 
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--secondary)] rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent)] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--secondary)] rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            <AlumniRegistrationForm />
          </div>
          <div className="w-full lg:w-80 lg:sticky lg:top-8 space-y-8">
            <EventPoster />
            <EventInfo />
          </div>
        </div>
      </div>
      */}<FormsClosed />
    </div>
  );
}