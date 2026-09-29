// UX/UI Case Study Viewer Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
    // Case Studies Data
    const caseStudiesData = {
        neopay: {
            title: "NeoPay – Next-Gen Mobile Banking & Wealth Management",
            category: "FinTech Mobile App",
            client: "NeoPay Global Inc.",
            duration: "8 Weeks",
            role: "Lead UX/UI Designer & Researcher",
            overview: "NeoPay redesigned the mobile banking experience for Gen-Z and Millennial users, removing confusing jargon, streamlining money transfers, and integrating automated micro-investments.",
            problem: "Users reported high cart abandonment during peer-to-peer transfers, lack of financial clarity, and anxiety around multi-step authentication processes.",
            solution: "Designed a single-tap biometric checkout, interactive spending analytics, and gamified saving buckets to make financial management intuitive.",
            metrics: [
                { label: "Transfer Completion Rate", value: "+45%" },
                { label: "App Store Rating", value: "4.9 ⭐" },
                { label: "Monthly Active Users", value: "1.2M+" }
            ],
            prototypeUrl: "https://embed.figma.com/proto/sample-neopay-prototype?embed-host=share"
        },
        pulsehealth: {
            title: "PulseHealth – AI Clinical Dashboard & Patient Tracking",
            category: "Healthcare SaaS",
            client: "Pulse Medical Systems",
            duration: "12 Weeks",
            role: "Senior UI/UX Specialist",
            overview: "PulseHealth provides ICU physicians and remote care teams with real-time patient telemetry, AI anomaly detection, and unified health records.",
            problem: "Doctors experienced severe screen fatigue and delayed response times due to fragmented data across 5+ legacy hospital management systems.",
            solution: "Architected a unified dark-mode dashboard with priority alert badges, customizable widget tiles, and voice-assisted clinical logging.",
            metrics: [
                { label: "Diagnostic Time Saved", value: "-60%" },
                { label: "Alert Fatigue Reduction", value: "78%" },
                { label: "Hospitals Onboarded", value: "450+" }
            ],
            prototypeUrl: "https://embed.figma.com/proto/sample-pulsehealth-prototype?embed-host=share"
        },
        aurashop: {
            title: "AuraShop – High-Conversion Luxury Fashion Platform",
            category: "E-Commerce Web App",
            client: "Aura Retail Group",
            duration: "6 Weeks",
            role: "Product Designer",
            overview: "AuraShop is a minimalist digital storefront focused on ultra-fast shopping flow, personalized style recommendation quizzes, and AR virtual try-on.",
            problem: "High bounce rates on mobile product detail pages (PDP) and complex multi-step checkout forms leading to abandoned shopping carts.",
            solution: "Implemented sticky micro-checkouts, high-definition video previews, and instantaneous filtering with localized currency calculation.",
            metrics: [
                { label: "Cart Conversion Rate", value: "+32%" },
                { label: "Average Session Duration", value: "+2.4m" },
                { label: "Page Load Speed", value: "< 0.8s" }
            ],
            prototypeUrl: "https://embed.figma.com/proto/sample-aurashop-prototype?embed-host=share"
        }
    };

    // DOM Elements
    const modal = document.getElementById('case-study-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-dynamic-content');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-study-card');
    const quickProtoBtn = document.getElementById('open-prototype-quick');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            caseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Open Modal
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const studyKey = btn.getAttribute('data-study') || 'neopay';
            renderModalContent(caseStudiesData[studyKey]);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    if (quickProtoBtn) {
        quickProtoBtn.addEventListener('click', () => {
            renderModalContent(caseStudiesData.neopay);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Modal Content Generator
    function renderModalContent(study) {
        modalContent.innerHTML = `
            <div class="modal-header">
                <span class="tag" style="background:#6366f1; color:#fff; font-weight:700;">${study.category}</span>
                <h2 style="font-size: 1.8rem; margin: 12px 0 6px; font-weight: 800; color: #f8fafc;">${study.title}</h2>
                <p style="color: #94a3b8; font-size: 0.95rem;">Client: <strong>${study.client}</strong> | Duration: <strong>${study.duration}</strong> | Role: <strong>${study.role}</strong></p>
            </div>

            <div class="modal-body" style="margin-top: 24px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
                    ${study.metrics.map(m => `
                        <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 10px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
                            <div style="font-size: 1.5rem; font-weight: 800; color: #10b981;">${m.value}</div>
                            <div style="font-size: 0.8rem; color: #94a3b8;">${m.label}</div>
                        </div>
                    `).join('')}
                </div>

                <h4 style="font-size: 1.1rem; color: #6366f1; margin-bottom: 8px;"><i class="fa-solid fa-bullseye"></i> Executive Overview</h4>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 20px;">${study.overview}</p>

                <h4 style="font-size: 1.1rem; color: #ef4444; margin-bottom: 8px;"><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h4>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 20px;">${study.problem}</p>

                <h4 style="font-size: 1.1rem; color: #10b981; margin-bottom: 8px;"><i class="fa-solid fa-circle-check"></i> Design Solution</h4>
                <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 24px;">${study.solution}</p>

                <h4 style="font-size: 1.1rem; color: #a855f7; margin-bottom: 12px;"><i class="fa-solid fa-mobile-screen"></i> Interactive Figma Prototype Showcase</h4>
                <div class="prototype-frame">
                    <div style="text-align: center; padding: 20px;">
                        <i class="fa-brands fa-figma" style="font-size: 3rem; color: #a855f7; margin-bottom: 12px;"></i>
                        <h5 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 8px;">Interactive Prototype Embed Placeholder</h5>
                        <p style="color: #94a3b8; font-size: 0.88rem; max-width: 500px; margin: 0 auto 16px;">In production, this container hosts live Figma iFrames. Click below to simulate interactive navigation.</p>
                        <button class="btn btn-primary" onclick="alert('Simulated Figma Prototype Interaction: Navigating flow steps successfully!')">
                            <i class="fa-solid fa-play"></i> Launch Interactive Preview
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
});
