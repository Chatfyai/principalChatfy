import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, imageUrl, gradient, savedCount, index }) => {
    const gradientClasses = {
        blue: 'gradient-blue text-slate-900 card-shadow-blue',
        purple: 'gradient-purple text-white card-shadow-purple',
        pink: 'gradient-pink text-slate-900 card-shadow-pink',
        green: 'gradient-green text-white',
    };

    return (
        <motion.div
            className={`flex h-[520px] flex-col overflow-hidden rounded-[2.5rem] min-w-[300px] snap-center relative shadow-lg ${gradientClasses[gradient]}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            <div className="flex flex-col flex-1 p-8 pb-0">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <h3 className="text-4xl font-extrabold tracking-tight">{title}</h3>
                    <span className="material-symbols-outlined cursor-pointer hover:opacity-70 transition-opacity">
                        more_vert
                    </span>
                </div>

                {/* Heart Mask Image */}
                <div className="flex-1 flex items-center justify-center py-4">
                    <div
                        className="w-full aspect-square heart-mask bg-center bg-cover scale-110"
                        style={{
                            backgroundImage: `url("${imageUrl}")`,
                            filter: 'grayscale(1)',
                        }}
                    />
                </div>

                {/* Stats and Arrow */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        {savedCount && (
                            <>
                                <span className="material-symbols-outlined !text-lg">bookmark</span>
                                <span className="text-sm font-bold">{savedCount} saved</span>
                            </>
                        )}
                    </div>
                    <motion.span
                        className="material-symbols-outlined !text-2xl cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        arrow_outward
                    </motion.span>
                </div>
            </div>

            {/* Description Footer */}
            <div className="bg-white p-6 pt-5">
                <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
