'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function ProfileCards({ items }) {
  return (
    <div className="profile-cards-grid">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="profile-card"
          custom={i}
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            y: -8, 
            boxShadow: '0 20px 40px rgba(72, 197, 255, 0.2)',
            transition: { duration: 0.3 }
          }}
        >
          {item.icon && <div className="card-icon">{item.icon}</div>}
          <h3>{item.title}</h3>
          {item.subtitle && <p className="card-subtitle">{item.subtitle}</p>}
          {item.description && <p>{item.description}</p>}
          {item.tags && (
            <div className="card-tags">
              {item.tags.map((tag, j) => (
                <span key={j} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
