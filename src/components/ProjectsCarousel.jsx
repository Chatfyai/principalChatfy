import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectsCarousel = ({ projects }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {/* Section Header */}
            <div className="flex gap-2 px-6 py-4 items-center">
                <h3 className="text-slate-400 text-xs font-black leading-tight tracking-[0.2em] uppercase">
                    Projetos
                </h3>
                <div className="h-px flex-1 ml-4 bg-slate-200"></div>
            </div>

            {/* Carousel */}
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory mt-2">
                <div className="flex items-stretch p-6 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            title={project.title}
                            description={project.description}
                            imageUrl={project.imageUrl}
                            gradient={project.gradient}
                            savedCount={project.savedCount}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectsCarousel;
