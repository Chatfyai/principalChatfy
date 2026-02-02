import { motion } from 'framer-motion';

const ProfileHero = ({ name, bio, avatarUrl }) => {
    return (
        <div className="flex p-8 pb-4 flex-col items-center">
            {/* Avatar with Glow Effect */}
            <motion.div
                className="relative mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-[#135bec] blur-2xl opacity-10 rounded-full scale-110 animate-pulse-glow"></div>

                {/* Avatar Image */}
                <div
                    className="relative z-10 bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 border-4 border-slate-50 shadow-xl"
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                />
            </motion.div>

            {/* Name and Bio */}
            <motion.div
                className="flex flex-col items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className="text-[#101622] text-4xl font-extrabold leading-tight tracking-tight text-center">
                    {name}
                </h1>
                <p className="text-[#101622]/70 text-sm font-normal leading-relaxed text-center max-w-[280px]">
                    {bio}
                </p>
            </motion.div>
        </div>
    );
};

export default ProfileHero;
