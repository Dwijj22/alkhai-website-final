'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProcessReport() {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (open) return;
    setOpen(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={handleOpen}
        className="process-report-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="process-report-dot" />
        Process Report
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="process-report-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="process-report-popup"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 0.72, 0.25, 1] }}
            >
              <div className="process-report-header">
                <span className="process-report-dot" />
                <span>Process Report</span>
              </div>

              <div className="process-report-divider" />

              <div className="process-report-row">
                <span>Hidden rework</span>
                <span className="process-report-value" style={{ color: '#FF3B5C' }}>22%</span>
              </div>
              <div className="process-report-row">
                <span>Deadline risk</span>
                <span className="process-report-value" style={{ color: '#FF3B5C' }}>HIGH</span>
              </div>
              <div className="process-report-row">
                <span>Looping paths</span>
                <span className="process-report-value" style={{ color: '#FFB020' }}>3</span>
              </div>

              <div className="process-report-legend">
                <span><span className="legend-dot" style={{ background: '#3DDC97' }} /> Healthy</span>
                <span><span className="legend-dot" style={{ background: '#FFB020' }} /> Rework</span>
                <span><span className="legend-dot" style={{ background: '#FF3B5C' }} /> Breach</span>
              </div>

              {/* Auto-close progress bar */}
              <div className="process-report-progress">
                <motion.div
                  className="process-report-progress-bar"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
