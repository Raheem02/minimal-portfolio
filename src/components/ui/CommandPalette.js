import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE, CORE_SKILLS } from '../../data/resumeData';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = [
    {
      label: 'Download Resume',
      category: 'Links',
      action: () => {
        window.open('https://raw.githubusercontent.com/raheem022/Portfolio/main/main.tex', '_blank', 'noopener,noreferrer');
        onClose(false);
      }
    },
    {
      label: 'Open GitHub Profile',
      category: 'Links',
      action: () => {
        window.open('https://github.com/raheem022', '_blank', 'noopener,noreferrer');
        onClose(false);
      }
    },
    {
      label: 'Open LinkedIn Profile',
      category: 'Links',
      action: () => {
        window.open('https://www.linkedin.com/in/raheem02', '_blank', 'noopener,noreferrer');
        onClose(false);
      }
    }
  ];

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-lg bg-(--color-canvas-bg) border border-(--color-border-subtle) rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-3 border-b border-(--color-border-subtle)">
            <input
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-(--color-text-primary) placeholder-(--color-text-muted) focus:outline-none font-mono"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-2 flex flex-col gap-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={opt.action}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-subtle) flex items-center justify-between transition-colors focus-visible:outline-2 focus-visible:outline-(--color-accent-indigo)"
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] text-(--color-text-muted)">{opt.category}</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs font-mono text-(--color-text-muted)">
                No results found.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
