import { useState, useRef } from 'react';
import { ICON_LIST, ICON_REGISTRY } from '../utils/iconRegistry.js';

export default function IconPicker({ value = 'CheckCircle2', onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <>
      {/* Overlay (click outside to close) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Icon Button + Picker */}
      <div className="relative z-50" ref={containerRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-12 h-12 flex items-center justify-center 
          bg-slate-50 border border-slate-200 rounded-xl 
          text-purple-600 hover:bg-purple-50 hover:border-purple-300 
          transition-all shadow-sm icon-btn-press"
        >
          {(() => {
            const Icon = ICON_REGISTRY[value];
            return <Icon size={24} className="icon-hover-effect" />;
          })()}
        </button>

        {/* Icon Picker Toast */}
        {open && (
          <div
            className="absolute top-14 left-0 
            w-64 bg-white border border-slate-200 
            rounded-2xl shadow-2xl p-3 
            animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} // ⛔ prevent overlay close
          >
            <div className="grid grid-cols-5 gap-1 max-h-56 overflow-y-auto custom-scrollbar p-1">
              {ICON_LIST.map((iconId) => {
                const Icon = ICON_REGISTRY[iconId];
                const isActive = iconId === value;

                return (
                  <button
                    key={iconId}
                    onClick={() => {
                      onChange?.(iconId);
                      setOpen(false);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-center 
                    transition-all icon-btn-press
                    ${
                      isActive
                        ? 'bg-purple-100 text-purple-700 shadow-inner'
                        : 'hover:bg-slate-50 text-slate-400 hover:text-purple-500'
                    }`}
                  >
                    <Icon size={20} className="icon-hover-effect" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .icon-hover-effect {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            filter 0.4s ease;
          will-change: transform;
        }

        button:hover .icon-hover-effect {
          transform: scale(1.15) rotate(6deg);
          filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.35));
        }

        .icon-btn-press:active {
          transform: scale(0.96);
          transition: transform 0.1s ease;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </>
  );
}
