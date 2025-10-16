'use client';

import { useEffect } from 'react';

export default function ConoceAmbar41() {
  useEffect(() => {
    // Load CSS files dynamically
    const loadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    loadCSS('/conoceambar41/vendor/reset.min.css');
    loadCSS('/conoceambar41/style.css');
    loadCSS('/conoceambar41/fixes.css');

    // Load scripts in order
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        await loadScript('/conoceambar41/vendor/screenfull.min.js');
        await loadScript('/conoceambar41/vendor/bowser.min.js');
        await loadScript('/conoceambar41/vendor/marzipano.js');
        await loadScript('/conoceambar41/data.js');
        await loadScript('/conoceambar41/index.js');
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    // Add body classes and load scripts
    document.body.classList.add('multiple-scenes');
    document.body.classList.add('view-control-buttons');
    loadAllScripts();

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('multiple-scenes');
      document.body.classList.remove('view-control-buttons');
    };
  }, []);

  const handleVoidClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleSceneListToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    // Let the Marzipano JavaScript handle the toggle
    const sceneList = document.querySelector('#sceneList');
    const sceneListToggle = document.querySelector('#sceneListToggle');

    if (sceneList && sceneListToggle) {
      sceneList.classList.toggle('enabled');
      sceneListToggle.classList.toggle('enabled');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, backgroundColor: '#000' }}>
      {/* Panorama container */}
      <div id="pano"></div>

      {/* Scene list */}
      <div id="sceneList">
        <ul className="scenes">
          <a href="#" onClick={handleVoidClick} className="scene" data-id="0-entrada-principal">
            <li className="text">Entrada Principal</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="1-cajones-de-estacionamiento">
            <li className="text">Cajones de Estacionamiento</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="2-vestbulo">
            <li className="text">Vestíbulo</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="3-bodega">
            <li className="text">Bodega</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="4-salacomedor">
            <li className="text">SalaComedor</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="5-jardin">
            <li className="text">Jardin</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="6-cocina">
            <li className="text">Cocina</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="7-oficina">
            <li className="text">Oficina</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="8-bao-oficina">
            <li className="text">Baño Oficina</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="9-zotano">
            <li className="text">Sótano</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="10-cuartomaquinas">
            <li className="text">CuartoMaquinas</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="11-cava">
            <li className="text">Cava</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="12-tercer-nivel">
            <li className="text">Tercer Nivel</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="13-cuarto-nivel">
            <li className="text">Cuarto Nivel</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="14-estancia">
            <li className="text">Estancia</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="15-habitacin-secundaria">
            <li className="text">Habitación secundaria</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="16-terraza-habitacin-a">
            <li className="text">Terraza Habitación A</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="17-bao-habitacin-secundaria">
            <li className="text">Baño Habitación Secundaria</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="18-walking-closet-habitacin">
            <li className="text">Walking Closet Habitación</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="19-habitacin-principal">
            <li className="text">Habitación principal</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="20-tocador">
            <li className="text">Tocador</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="21-walking-closet-principal">
            <li className="text">Walking Closet Principal</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="22-bao-habitacin-principal">
            <li className="text">Baño Habitación Principal</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="23-terraza-habitacin-princiapl">
            <li className="text">Terraza Habitación Princiapl</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="24-cuartolavado">
            <li className="text">CuartoLavado</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="25-terraza-secundaria">
            <li className="text">Terraza Secundaria</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="26-techo">
            <li className="text">Techo</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="27-domos-transitables">
            <li className="text">Domos Transitables</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="28-habitacin-de-usos-mltiples">
            <li className="text">Habitación de usos múltiples</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="29-bao-usos-multiples">
            <li className="text">Baño Usos Multiples</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="30-terraza">
            <li className="text">Terraza</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="31-bao-terraza">
            <li className="text">Baño Terraza</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="32-wc">
            <li className="text">WC</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="33-terraza-panormica">
            <li className="text">Terraza Panorámica</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="34-banosecundario">
            <li className="text">Banosecundario</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="35-cisterna">
            <li className="text">Cisterna</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="36-escaleras-tercer-nivel">
            <li className="text">Escaleras Tercer Nivel</li>
          </a>
          <a href="#" onClick={handleVoidClick} className="scene" data-id="37-pasillo-de-instalaciones">
            <li className="text">Pasillo de Instalaciones</li>
          </a>
        </ul>
      </div>

      {/* Title bar */}
      <div id="titleBar">
        <h1 className="sceneName"></h1>
      </div>

      {/* Control buttons */}
      <a href="#" onClick={handleVoidClick} id="autorotateToggle">
        <img className="icon off" src="/conoceambar41/img/play.png" alt="Play" />
        <img className="icon on" src="/conoceambar41/img/pause.png" alt="Pause" />
      </a>

      <a href="#" onClick={handleVoidClick} id="fullscreenToggle">
        <img className="icon off" src="/conoceambar41/img/fullscreen.png" alt="Fullscreen" />
        <img className="icon on" src="/conoceambar41/img/windowed.png" alt="Windowed" />
      </a>

      <a href="#" onClick={handleSceneListToggle} id="sceneListToggle">
        <img className="icon off" src="/conoceambar41/img/expand.png" alt="Expand" />
        <img className="icon on" src="/conoceambar41/img/collapse.png" alt="Collapse" />
      </a>

      {/* View control buttons */}
      <a href="#" onClick={handleVoidClick} id="viewUp" className="viewControlButton viewControlButton-1">
        <img className="icon" src="/conoceambar41/img/up.png" alt="Up" />
      </a>
      <a href="#" onClick={handleVoidClick} id="viewDown" className="viewControlButton viewControlButton-2">
        <img className="icon" src="/conoceambar41/img/down.png" alt="Down" />
      </a>
      <a href="#" onClick={handleVoidClick} id="viewLeft" className="viewControlButton viewControlButton-3">
        <img className="icon" src="/conoceambar41/img/left.png" alt="Left" />
      </a>
      <a href="#" onClick={handleVoidClick} id="viewRight" className="viewControlButton viewControlButton-4">
        <img className="icon" src="/conoceambar41/img/right.png" alt="Right" />
      </a>
      <a href="#" onClick={handleVoidClick} id="viewIn" className="viewControlButton viewControlButton-5">
        <img className="icon" src="/conoceambar41/img/plus.png" alt="Zoom In" />
      </a>
      <a href="#" onClick={handleVoidClick} id="viewOut" className="viewControlButton viewControlButton-6">
        <img className="icon" src="/conoceambar41/img/minus.png" alt="Zoom Out" />
      </a>
    </div>
  );
}