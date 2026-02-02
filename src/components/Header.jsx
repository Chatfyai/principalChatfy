import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            className="flex items-center p-6 pb-2 justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.button
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#101622] hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="material-symbols-outlined">menu</span>
            </motion.button>

            <motion.button
                className="flex items-center justify-center rounded-full size-10 text-[#101622] hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="material-symbols-outlined">notifications</span>
            </motion.button>
        </motion.header>
    );
};

export default Header;
