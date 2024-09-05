//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';  // Припустимо, що у вас є CSS-стилі
import MusicPlayer from './components/MusicPlayer.tsx';  // Імпорт компоненту

const App: React.FC = () => {
  return (
      <div className="App">
          <header className="App-header">
              <h1>Music Flow</h1>
          </header>
          <main>
          <MusicPlayer />  {/* Додаємо програвач на сторінку */}
        </main>
      </div>
  );
}

export default App;
