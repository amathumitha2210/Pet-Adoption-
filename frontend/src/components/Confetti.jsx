import { useEffect } from 'react';

const Confetti = () => {
  useEffect(() => {
    
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
      
     
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `;
      container.appendChild(style);
      container.appendChild(confetti);
    }
    
    document.body.appendChild(container);
    
   
    const timer = setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return null;
};

export default Confetti;
