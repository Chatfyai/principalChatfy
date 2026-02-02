import { useState } from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
    return (
        <motion.div
            className="mt-6 p-1 bg-slate-100 rounded-full flex w-full max-w-[280px] relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            {/* Animated Indicator */}
            <motion.div
                className="absolute h-[calc(100%-8px)] bg-white rounded-full shadow-sm top-1"
                initial={false}
                animate={{
                    left: activeTab === 0 ? '4px' : '50%',
                    width: 'calc(50% - 8px)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Tab Buttons */}
            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(index)}
                    className={`flex-1 relative z-10 py-2 text-xs font-bold text-center transition-colors duration-200 ${activeTab === index ? 'text-[#101622]' : 'text-slate-400'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </motion.div>
    );
};

export default TabNavigation;
