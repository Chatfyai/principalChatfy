import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newTab) => {
    setPage([newTab, newTab > activeTab ? 1 : -1]);
    setActiveTab(newTab);
  };

  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    if (activeTab === 0 && carouselRef.current) {
      // Calculate draggable width: scrollWidth (total) - offsetWidth (visible)
      // The wrapper has overflow hidden, so its scrollWidth is the total content width
      // and its offsetWidth is the visible width.
      // We explicitly set a timeout to ensure rendering is complete
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Profile Data
  const profile = {
    name: "Chatfy",
    bio: "Transforme ideias em apps & automações",
    avatarUrl: "/images/logo-chatfy.png"
  };

  // Clients Data
  const clients = ["TS", "NW", "GL", "BS", "QT", "AX"];

  // Projects Data
  const projects = [
    {
      title: "Extensão",
      description: "Ferramenta definitiva para WhatsApp: Respostas rápidas, CRM, Funis, Lembretes e IA. Tudo para ser mais produtivo.",
      // Substitua esta URL pela sua imagem local, ex: "/images/zap-bg-novo.png"
      bgImage: "/images/zap-bg-novo.png",
      link: "https://zappremium.vercel.app/",
      gradient: "blue",
      savedCount: null,
      isDarkText: true // Texto preto para melhor visibilidade no fundo claro
    },
    {
      title: "Landing Page",
      description: "Landing page personalizada focada em conversão, integrada com assistente de Inteligência Artificial para atendimento 24 horas e qualificação de leads.",
      bgImage: "/images/landingpage.png",
      link: "https://viva-bem-landing-zpaz.vercel.app/",
      gradient: "purple",
      savedCount: null,
      isDarkText: true
    }
  ];

  const tabs = ["Projetos", "Contato"];

  return (
    <div className="app-container">

      {/* Profile Hero */}
      <div className="profile-hero">
        <motion.div
          className="avatar-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="avatar-glow"></div>
          <div
            className="avatar-image"
            style={{ backgroundImage: `url("${profile.avatarUrl}")` }}
          />
        </motion.div>

        <motion.div
          className="profile-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-bio">{profile.bio}</p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <motion.div
        className="tab-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="tab-wrapper">
          <div className={`tab-indicator ${activeTab === 0 ? 'left' : 'right'}`}></div>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => paginate(index)}
              className={`tab-btn ${activeTab === index ? 'active' : 'inactive'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Container with slide animations */}
      <div className="content-container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {activeTab === 0 ? (
            <motion.div
              key="projects"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="slide-content"
            >
              {/* Clients Section */}
              <div className="clients-section">
                <div className="section-header">
                  <h3 className="section-title">Nossos Clientes</h3>
                  <div className="section-line"></div>
                </div>
                <div className="clients-scroll hide-scrollbar">
                  {clients.map((client, index) => (
                    <motion.div
                      key={index}
                      className="client-avatar"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                    >
                      {client}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <div className="projects-header">
                  <h3 className="section-title">Ultimos Projetos</h3>
                  <div className="section-line"></div>
                </div>

                <div className="projects-carousel-wrapper" ref={carouselRef}>
                  <motion.div
                    className="projects-carousel hide-scrollbar"
                    drag="x"
                    dragConstraints={{ left: -width, right: 0 }}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                    whileTap={{ cursor: "grabbing" }}
                    style={{ cursor: "grab" }}
                  >
                    <div className="projects-inner">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className={`project-card gradient-${project.gradient} ${project.link ? 'clickable' : ''}`}
                          style={project.bgImage ? {
                            backgroundImage: `url(${project.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: project.isDarkText ? '#000000' : '#ffffff'
                          } : {}}
                          onClick={() => project.link && window.open(project.link, '_blank')}
                        >


                          <div className="card-content" style={{ zIndex: 1, position: 'relative' }}>
                            <div className="card-header">
                              <h3 className="card-title">{project.title}</h3>
                              <button className="card-menu-btn">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </div>

                            <div className="card-image-container">
                              {!project.bgImage ? (
                                <div
                                  className="heart-mask"
                                  style={{ backgroundImage: `url("${project.imageUrl}")` }}
                                />
                              ) : (
                                <div style={{ flex: 1 }}></div>
                              )}
                            </div>

                            <div className="card-stats">
                              <div className="saved-count">
                                {project.savedCount && (
                                  <>
                                    <span className="material-symbols-outlined">bookmark</span>
                                    <span className="count">{project.savedCount} saved</span>
                                  </>
                                )}
                              </div>
                              <button className="arrow-btn">
                                <span className="material-symbols-outlined">arrow_outward</span>
                              </button>
                            </div>
                          </div>

                          <div className="card-footer" style={{
                            backgroundColor: '#ffffff',
                            zIndex: 1,
                            position: 'relative'
                          }}>
                            <p className="card-description">{project.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="slide-content"
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="spacer"></div>
    </div>
  );
}

// Contact Section
// Contact Section
const ContactSection = () => (
  <div className="contact-section">
    <div className="contact-content">
      <span className="contact-label">Entre em contato</span>
      <h2 className="contact-title">Vamos criar algo incrível?</h2>
      <a href="mailto:contato@exemplo.com" className="contact-btn">
        Conversar
        <span className="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>

    <div className="social-links">
      <a href="#" className="social-link instagram" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a href="#" className="social-link whatsapp" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  </div>
);

export default App;
