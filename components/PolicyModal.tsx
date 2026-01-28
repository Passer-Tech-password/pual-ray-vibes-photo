"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function PolicyModal({
  isOpen,
  onClose,
  onAccept,
}: PolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h2 className="text-2xl font-bold text-brand dark:text-white">
                OUR POLICY
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Policy Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-4">
              <ol className="list-decimal pl-5 space-y-2 marker:text-brand marker:font-bold">
                <li>
                  <strong>DEPOSIT VALIDATES BOOKING!</strong>
                </li>
                <li>ANY SHOOT PAST 8PM ATTRACTS ADDITIONAL 15,000</li>
                <li>
                  RESCHEDULING MUST BE DONE AT LEAST 24HRS TO THE SHOOT.
                </li>
                <li>
                  RESCHEDULING DONE ON THE DAY OF THE SHOOT ATTRACTS ADDITIONAL
                  10,000
                </li>
                <li>
                  ANY SHOOT LOCATION OUTSIDE AWKA TERRITORY (I.E ASABA) ATTRACTS
                  ADDITIONAL 15,000 FOR LOGISTICS.
                </li>
                <li>2HRS LATENESS TO THE SHOOT ATTRACTS ADDITIONAL 10,000</li>
                <li>EDITING TAKES 3 DAYS AFTER THE SHOOT.</li>
                <li>
                  EXPRESS DELIVERY COSTS AN EXTRA 15,000 AND THE DURATION OF THE
                  DELIVERY IS 24HRS
                </li>
                <li>
                  BALANCE IS MEANT TO BE CLEARED AFTER SELECTION OF PICTURES
                </li>
                <li>
                  FOR APARTMENT SHOOTS, KINDLY NOTE THAT YOU ARE EXPECTED TO
                  BOOK A SUITE OR REACH AN AGREEMENT WITH THE SUITE MANAGEMENT
                  BEFORE SHOOTING.
                </li>
                <li>
                  YOUR COMPANY MUST TAKE PERMISSION BEFORE INTERFERING WITH THE
                  SHOOT.
                </li>
                <li>OUR RATE IS FIXED.</li>
                <li>NO REFUNDS</li>
              </ol>

              <div className="mt-6 p-4 bg-brand/5 dark:bg-brand/10 rounded-lg border border-brand/10 text-center font-medium text-brand dark:text-brand-light">
                PLEASE READ THROUGH BEFORE MAKING PAYMENT • THANK YOU
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Decline
              </button>
              <button
                onClick={onAccept}
                className="px-6 py-2.5 rounded-xl bg-brand text-white font-medium hover:bg-brand/90 shadow-lg shadow-brand/20 transition transform hover:scale-[1.02] active:scale-[0.98]"
              >
                I Agree & Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
