'use client';

import Image from 'next/image';
import profilePhoto from './profile-photo.jpg';
import Canvas3D from '../components/Canvas3D';
import ProfileCards from '../components/ProfileCards';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollAnimations';

const skillsData = [
    { icon: '☕', title: 'Java / Spring Boot', description: 'Enterprise-grade backend services.' },
    { icon: '⚛️', title: 'React / Next.js', description: 'Modern interactive UIs with SSR/SSG.' },
    { icon: '🚀', title: 'Node.js / Express', description: 'Fast APIs and realtime systems.' },
    { icon: '🗄️', title: 'MongoDB / PostgreSQL', description: 'Flexible & scalable data storage.' },
    { icon: '🛡️', title: 'Security / Testing', description: 'Authentication, authorization, unit/integration tests.' },
    { icon: '🐳', title: 'Docker / Kubernetes', description: 'Cloud devops and container orchestration.' },
];

const projectsData = [
    {
        icon: '🎮',
        title: '3D Portfolio Experience',
        subtitle: 'Next.js + R3F + GSAP',
        description: 'Interactive WebGL UI with animated cloud & code effects.',
        tags: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
    },
    {
        icon: '📈',
        title: 'MERN CRM SaaS',
        subtitle: 'Role-based system with real-time dashboards',
        description: 'Secure and scalable MERN CRM with reporting and WebSocket updates.',
        tags: ['MERN', 'JWT', 'Socket.io', 'MongoDB'],
    },
    {
        icon: '⚙️',
        title: 'Java Microservices',
        subtitle: 'Spring Boot + Kafka + Docker',
        description: 'Event-driven architecture with CI/CD automation.',
        tags: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes'],
    },
];

const experienceData = [
    {
        title: 'Java Developer',
        company: 'Qurilo Solution Pvt Ltd',
        period: 'Aug 2025 - Feb 2026',
        highlights: [
            'Delivered microservices for high-traffic finance platform.',
            'Led implementation for response time reduction by 35%.',
            'Mentored engineers on clean architecture and unit tests.',
        ],
    },
    {
        title: 'Full Stack Developer',
        company: 'HAL Korwa',
        period: 'July 2024 - Aug 2024',
        highlights: [
            'Launched MERN SaaS product with 15k active users.',
            'Built interactive dashboards and real-time collaboration features.',
            'Improved release cycle with automated tests and CI/CD pipelines.',
        ],
    },
];

export default function Home() {
    return (
        <div className="page-wrap">
            <Canvas3D />

            <header className="nav-wrap">
                <div className="logo">Sagar <span>Satyarthi Mishra</span></div>
                <nav>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <main>
                <ScrollReveal>
                    <section className="hero" id="home">
                        <div className="hero-content">
                            <h1>Hi, I’m <span>Sagar Satyarthi Mishra</span></h1>
                            <p>Building high-performance web apps with Java Full Stack, MERN, and immersive 3D experiences.</p>
                            <div className="hero-buttons">
                                <a className="btn" href="#projects">View Projects</a>
                                <a className="btn-outline" href="#contact">Get in Touch</a>
                            </div>
                        </div>
                        <div className="hero-badge">3D animation | Full stack products | High impact</div>
                    </section>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <section className="panel" id="about">
                        <h2>About Me</h2>
                        <p>Software developer with a passion for large-scale distributed systems, real-time user experiences, and elegant design.</p>
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section className="panel profile-section" id="profile">
                        <h2>Profile</h2>
                        <div className="profile-grid">
                            <div
                                className="profile-photo-card"
                                onMouseMove={(event) => {
                                    const elem = event.currentTarget;
                                    const rect = elem.getBoundingClientRect();
                                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                                    const y = (event.clientY - rect.top) / rect.height - 0.5;
                                    elem.style.transform = `perspective(850px) rotateY(${x * 18}deg) rotateX(${y * -12}deg)`;
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = 'perspective(850px) rotateY(0deg) rotateX(0deg)';
                                }}
                            >
                                <Image src={profilePhoto} alt="Sagar Satyarthi Mishra" width={116} height={116} className="profile-photo" />
                                <div className="profile-info">
                                    <h3>Sagar Satyarthi Mishra</h3>
                                    <p>Java Full Stack | MERN | 3D Web Experiences</p>
                                    <p>
                                        <code>Java Full Stack Developer</code> skilled in Spring Boot, MERN stack, and modern scalable web applications.
                                    </p>                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <section className="panel" id="skills">
                    <h2>Skills</h2>
                    <ProfileCards items={skillsData} />
                </section>

                <section className="panel" id="projects">
                    <h2>Projects</h2>
                    <ProfileCards items={projectsData} />
                </section>

                <section className="panel" id="experience">
                    <h2>Experience</h2>
                    <div className="hierarchy">
                        <StaggerContainer delayBase={0.12}>
                            {experienceData.map((item, idx) => (
                                <StaggerItem key={idx}>
                                    <div className="level">
                                        <p className="position">{item.title}</p>
                                        <p className="company">{item.company} · {item.period}</p>
                                        <ul>
                                            {item.highlights.map((point, i) => (<li key={i}>{point}</li>))}
                                        </ul>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                <ScrollReveal>
                    <section className="panel" id="contact">
                        <h2>Contact</h2>
                        <p>Open to remote and freelance opportunities. Let’s build something impactful.</p>
                        <div className="contact-grid">
                            <div>📧 <a href="mailto:sagarsatyarthimishra@gmail.com">sagarsatyarthimishra@gmail.com</a></div>
                            <div>📱 <a href="tel:+919473746455">+91 94737 46455</a></div>
                            <div>💼 <a href="https://www.linkedin.com/in/sagar-satyarthi-mishra-0a1800254/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
                            <div>💻 <a href="https://github.com/sagarsatyarthimishra" target="_blank" rel="noopener noreferrer">GitHub</a></div>
                        </div>
                    </section>
                </ScrollReveal>
            </main>
        </div>
    );
}