import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Eye, ZoomIn, ZoomOut, Compass, Search, Map, Car, Coffee, Shield } from 'lucide-react';

export default function MapWidget() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapTheme, setMapTheme] = useState<'grayscale' | 'midnight' | 'chiffon'>('grayscale');
  const [highlightService, setHighlightService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const triggerZoom = (factor: number) => {
    setZoom((prev) => Math.min(Math.max(prev + factor, 0.6), 2.2));
  };

  const resetMap = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSearchQuery('');
    setHighlightService(null);
  };

  // Color mappings based on luxury themes
  const getThemeStyles = () => {
    switch (mapTheme) {
      case 'midnight':
        return {
          bg: 'bg-[#121212]',
          water: '#1a2b3c',
          park: '#18241b',
          block: '#222222',
          avenue: '#3a3a3a',
          text: '#ffffff',
          accent: '#c5a880',
        };
      case 'chiffon':
        return {
          bg: 'bg-[#faf8f5]',
          water: '#e0ecf8',
          park: '#edf5ec',
          block: '#f3ede2',
          avenue: '#ffffff',
          text: '#443c33',
          accent: '#a37f53',
        };
      default: // Grayscale / slate
        return {
          bg: 'bg-[#f4f4f4]',
          water: '#e5e7eb',
          park: '#f1f3f4',
          block: '#ffffff',
          avenue: '#f9f9f9',
          text: '#1a1a1a',
          accent: '#b5956a',
        };
    }
  };

  const theme = getThemeStyles();

  // Highlight filters matching search
  const isHighlighted = (serviceType: string) => {
    if (searchQuery) {
      return serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return highlightService === serviceType;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapTheme('grayscale')}
            className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase border transition-all ${
              mapTheme === 'grayscale'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            GRAYSCALE
          </button>
          <button
            onClick={() => setMapTheme('midnight')}
            className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase border transition-all ${
              mapTheme === 'midnight'
                ? 'bg-gold-600 text-[#111111] border-gold-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            MIDNIGHT LUXE
          </button>
          <button
            onClick={() => setMapTheme('chiffon')}
            className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase border transition-all ${
              mapTheme === 'chiffon'
                ? 'bg-gold-100 text-[#554433] border-gold-400'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            CHIFFON WARM
          </button>
        </div>

        {/* Search & filters */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search (e.g., parking, cafe, station)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 rounded-sm"
            />
          </div>
          <button
            onClick={resetMap}
            className="px-2.5 py-1.5 border border-gray-200 hover:bg-gray-50 text-[10px] font-mono tracking-wider text-gray-500 uppercase"
          >
            RESET
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Interactive Map Container */}
        <div
          id="studio-district-map"
          className={`relative w-full h-[380px] rounded-lg border border-gold-100 overflow-hidden cursor-grab active:cursor-grabbing select-none transition-colors duration-500 ${theme.bg}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Map Grid and Vector Assets */}
          <svg
            className="absolute w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
            viewBox="0 0 800 500"
          >
            {/* Water Inlet / River */}
            <path d="M 0 50 Q 150 120 400 120 T 800 80 L 800 0 L 0 0 Z" fill={theme.water} opacity="0.8" />

            {/* Cathedral Gardens Sector */}
            <rect x="50" y="160" width="160" height="240" rx="6" fill={theme.park} />
            <text x="130" y="280" fill="#9ba89c" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
              CATHEDRAL GARDENS
            </text>

            {/* City block rectangles */}
            <rect x="260" y="160" width="120" height="70" rx="3" fill={theme.block} />
            <rect x="400" y="160" width="140" height="70" rx="3" fill={theme.block} />
            <rect x="560" y="160" width="180" height="70" rx="3" fill={theme.block} />

            <rect x="260" y="250" width="120" height="90" rx="3" fill={theme.block} />
            {/* The Studio Block */}
            <rect x="400" y="250" width="140" height="90" rx="3" fill={theme.block} stroke={theme.accent} strokeWidth="2" strokeDasharray="3 2" />
            <rect x="560" y="250" width="180" height="90" rx="3" fill={theme.block} />

            <rect x="260" y="360" width="120" height="90" rx="3" fill={theme.block} />
            <rect x="400" y="360" width="140" height="90" rx="3" fill={theme.block} />
            <rect x="560" y="360" width="180" height="90" rx="3" fill={theme.block} />

            {/* Avenues & Streets Lines */}
            {/* High Street */}
            <line x1="235" y1="120" x2="235" y2="500" stroke={theme.avenue} strokeWidth="16" />
            <text x="235" y="470" fill={mapTheme === 'midnight' ? '#555555' : '#aaaaaa'} fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 235 470)">
              HIGH STREET
            </text>

            {/* Madison Avenue */}
            <line x1="390" y1="120" x2="390" y2="500" stroke={theme.avenue} strokeWidth="16" />
            <text x="390" y="470" fill={mapTheme === 'midnight' ? '#555555' : '#aaaaaa'} fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 390 470)">
              BROADGATE
            </text>

            {/* Earl Street */}
            <line x1="550" y1="120" x2="550" y2="500" stroke={theme.avenue} strokeWidth="16" />
            <text x="550" y="470" fill={mapTheme === 'midnight' ? '#555555' : '#aaaaaa'} fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 550 470)">
              SEWALL HWY
            </text>

            {/* Fairfax St */}
            <line x1="200" y1="240" x2="780" y2="240" stroke={theme.avenue} strokeWidth="14" />
            <text x="730" y="238" fill={mapTheme === 'midnight' ? '#555555' : '#aaaaaa'} fontSize="7" fontFamily="monospace">
              FAIRFAX ST
            </text>

            {/* Jordan Well St */}
            <line x1="200" y1="350" x2="780" y2="350" stroke={theme.avenue} strokeWidth="14" />
            <text x="730" y="348" fill={mapTheme === 'midnight' ? '#555555' : '#aaaaaa'} fontSize="7" fontFamily="monospace">
              JORDAN WELL ST
            </text>

            {/* Nearby amenities / search highlighting indicators */}
            {/* 1. Parking */}
            <g opacity={isHighlighted('parking') ? '1' : searchQuery || highlightService ? '0.15' : '1'} className="transition-opacity duration-300">
              <circle cx="340" cy="180" r="10" fill="#a0aec0" />
              <text x="340" y="183" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
              <text x="340" y="198" fill={theme.text} fontSize="7" textAnchor="middle" fontWeight="bold">West Orchard Parking</text>
            </g>

            {/* 2. Cozy Cafe */}
            <g opacity={isHighlighted('cafe') ? '1' : searchQuery || highlightService ? '0.15' : '1'} className="transition-opacity duration-300">
              <circle cx="680" cy="380" r="10" fill="#c3a175" />
              <text x="680" y="383" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">☕</text>
              <text x="680" y="398" fill={theme.text} fontSize="7" textAnchor="middle" fontWeight="bold">The Rising Cafe</text>
            </g>

            {/* 3. Station */}
            <g opacity={isHighlighted('station') || isHighlighted('metro') || isHighlighted('subway') || isHighlighted('train') ? '1' : searchQuery || highlightService ? '0.15' : '1'} className="transition-opacity duration-300">
              <circle cx="235" cy="400" r="11" fill="#4299e1" />
              <text x="235" y="403" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">T</text>
              <text x="235" y="418" fill={theme.text} fontSize="7" textAnchor="middle" fontWeight="bold">Coventry Train Station</text>
            </g>

            {/* 4. Luxury Hotel (Telegraph Hotel) */}
            <g opacity={searchQuery ? '0.2' : '1'}>
              <circle cx="210" cy="140" r="6" fill="#111111" />
              <text x="222" y="143" fill={theme.text} fontSize="7" fontWeight="bold">Telegraph Hotel Coventry</text>
            </g>

            {/* 5. AV Lashes Main Studio Glowing Marker */}
            <g transform="translate(470, 290)">
              {/* Outer pulsing ring */}
              <circle cx="0" cy="0" r="18" fill={theme.accent} className="animate-ping" opacity="0.2" />
              <circle cx="0" cy="0" r="12" fill={theme.accent} opacity="0.4" />
              {/* Actual Pin drop */}
              <circle cx="0" cy="-6" r="8" fill="#111111" />
              <path d="M-8 -6 L0 8 L8 -6 Z" fill="#111111" />
              <circle cx="0" cy="-6" r="3.5" fill={theme.accent} />
              <text x="0" y="24" fill="#111111" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle" className="bg-white/80 p-0.5 border border-gold-200">
                ★ AV LASHES
              </text>
            </g>
          </svg>

          {/* Floaters */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-md shadow-md border border-gold-100 flex flex-col space-y-1.5 pointer-events-auto">
            <h5 className="text-[10px] font-mono tracking-widest text-[#111111] uppercase font-bold">
              MAP COMPASS & TOOLS
            </h5>
            <p className="text-[9px] text-gray-500 font-medium">Studio District Map Widget</p>
            <div className="pt-2 flex items-center space-x-2 border-t border-neutral-100">
              <button
                onClick={() => triggerZoom(0.15)}
                className="p-1 hover:bg-gold-50 border border-gray-100 rounded-sm text-gray-600"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => triggerZoom(-0.15)}
                className="p-1 hover:bg-gold-50 border border-gray-100 rounded-sm text-gray-600"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetMap}
                className="p-1 hover:bg-gold-50 border border-gray-100 rounded-sm text-gray-600"
                title="Re-center"
              >
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-[#111111]/90 backdrop-blur-md text-white p-3 rounded-md shadow-lg border border-gold-500/30 max-w-[240px] pointer-events-none">
            <div className="flex items-center space-x-1.5 mb-1 text-gold-400">
              <MapPin className="w-4.5 h-4.5" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">ADDRESS</span>
            </div>
            <p className="text-xs font-serif font-medium leading-normal mb-1">
              Sewall Highway, Coventry, CV6 7JD
            </p>
            <p className="text-[9px] text-neutral-400">
              Our main lash studio overlooking Sewall Highway. Ample roadside parking is available nearby.
            </p>
          </div>
        </div>

        {/* Quick highlight widgets */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => setHighlightService(highlightService === 'parking' ? null : 'parking')}
            className={`p-2 border rounded-md text-xs flex items-center justify-center gap-2 transition-all ${
              highlightService === 'parking'
                ? 'bg-[#111111] text-white border-[#111111] font-semibold'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Car className="w-4 h-4 text-gold-500" />
            <span className="text-[10px] font-mono tracking-wider">SHOW PARKING</span>
          </button>
          <button
            onClick={() => setHighlightService(highlightService === 'cafe' ? null : 'cafe')}
            className={`p-2 border rounded-md text-xs flex items-center justify-center gap-2 transition-all ${
              highlightService === 'cafe'
                ? 'bg-[#111111] text-white border-[#111111] font-semibold'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Coffee className="w-4 h-4 text-gold-500" />
            <span className="text-[10px] font-mono tracking-wider">SHOW CAFES</span>
          </button>
          <button
            onClick={() => setHighlightService(highlightService === 'station' ? null : 'station')}
            className={`p-2 border rounded-md text-xs flex items-center justify-center gap-2 transition-all ${
              highlightService === 'station'
                ? 'bg-[#111111] text-white border-[#111111] font-semibold'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Navigation className="w-4 h-4 text-gold-500" />
            <span className="text-[10px] font-mono tracking-wider">SHOW STATION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
