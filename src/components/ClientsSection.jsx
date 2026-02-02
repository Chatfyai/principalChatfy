import { motion } from 'framer-motion';

const ClientsSection = ({ clients }) => {
    return (
        <motion.div
            className="flex flex-col gap-3 px-6 pb-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-slate-400 text-xs font-black leading-tight tracking-[0.2em] uppercase">
                    Clientes
                </h3>
                <div className="h-px flex-1 ml-4 bg-slate-200"></div>
            </div>

            {/* Clients Scroll */}
            <div className="flex overflow-x-auto hide-scrollbar gap-6 items-center opacity-60">
                {clients.map((client, index) => (
                    <motion.div
                        key={index}
                        className="shrink-0 flex items-center justify-center bg-slate-100 rounded-full h-12 w-12 text-slate-500 font-bold text-[10px] tracking-tighter hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    >
                        {client}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ClientsSection;
