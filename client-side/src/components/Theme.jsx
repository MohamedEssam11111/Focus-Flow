import { useState } from "react";
import { Sun, Moon, Leaf, Zap } from "lucide-react";

export default function ThemeBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Theme Bar */}
      <div className="theme-bar-container flex flex-col items-center">
        <div
          className={`theme-bar-wrapper flex p-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full shadow-2xl transition-all duration-500 ease-in-out overflow-hidden
          ${isExpanded ? "expanded" : "collapsed"}`}
        >
          {/* Main Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-10 h-10 mb-[10px] flex items-center justify-center rounded-full transition-all duration-300 icon-btn-press group/theme shrink-0
            ${
              isExpanded
                ? "bg-purple-600 text-white rotate-180"
                : "bg-slate-50 text-purple-600 border border-purple-100 hover:bg-purple-50"
            }`}
          >
            <Sun size={24} strokeWidth={2.2} className="icon-hover-effect" />
          </button>

          {/* Theme Options */}
          <div
            className={`theme-options flex gap-3 transition-all duration-500 shrink-0
            ${isExpanded ? "visible" : "hidden-state"}`}
          >
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors icon-btn-press">
              <Moon size={20} className="icon-hover-effect" />
            </button>

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors icon-btn-press">
              <Leaf size={20} className="icon-hover-effect" />
            </button>

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors icon-btn-press">
              <Zap size={20} className="icon-hover-effect" />
            </button>
          </div>
        </div>

        <span className="mt-3 text-[9px] font-black text-slate-400 uppercase tracking-widest vertical-text theme-label">
          Theme
        </span>
      </div>

      {/* Component Styles */}
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .icon-hover-effect {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            filter 0.4s ease;
          will-change: transform;
        }

        button:hover .icon-hover-effect {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
        }

        .icon-btn-press:active {
          transform: scale(0.96);
          transition: transform 0.1s ease;
        }

        /* Desktop Layout */
        .theme-bar-container {
          position: fixed;
          z-index: 999;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .theme-bar-wrapper {
          flex-direction: column;
        }

        .theme-bar-wrapper.expanded {
          max-height: 400px;
        }

        .theme-bar-wrapper.collapsed {
          max-height: 56px;
        }

        .theme-options {
          flex-direction: column;
        }

        .theme-options.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .theme-options.hidden-state {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        /* Mobile Behavior */
        @media (max-width: 640px) {
          .theme-bar-container {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            flex-direction: row-reverse;
            z-index: 10;
          }

          .theme-bar-wrapper {
            flex-direction: row-reverse;
            max-height: 56px;
            transition: width 0.5s ease-in-out;
          }

          .theme-bar-wrapper.expanded {
            width: auto;
            max-width: 300px;
          }

          .theme-bar-wrapper.collapsed {
            width: 56px;
          }

          .theme-options {
            flex-direction: row-reverse;
            padding-right: 0.75rem;
          }

          .theme-options.visible {
            opacity: 1;
            transform: translateX(0);
          }

          .theme-options.hidden-state {
            opacity: 0;
            transform: translateX(20px);
            pointer-events: none;
          }

          .theme-label {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
