document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('jobModal');
    const jobCards = document.querySelectorAll('.job-card:not(.coming-soon)');
    const jobButtons = document.querySelectorAll('.job-button:not(.disabled), [data-job="genius"]');
    const geniusButtons = document.querySelectorAll('a[href="#zone-of-genius"]');

    function showJobDetails(jobId) {
        const modalContent = jobId === 'genius' ? `
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Create Your Zone of Genius Role</h2>
                <p>Design your perfect role that aligns with your unique talents and our mission</p>
            </div>
            <div class="job-description">
                <form id="geniusForm" class="genius-form">
                    <section>
                        <h3>Tell Us About Your Zone of Genius</h3>
                        <div class="form-group">
                            <label for="impact">What impact do you want to make?</label>
                            <textarea id="impact" name="impact" rows="4" placeholder="Describe the meaningful change you want to create..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="skills">What are your unique strengths?</label>
                            <textarea id="skills" name="skills" rows="4" placeholder="List your key skills, experiences, and natural talents..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="vision">How do you envision your role?</label>
                            <textarea id="vision" name="vision" rows="4" placeholder="Describe your ideal role and how it would work..."></textarea>
                        </div>
                    </section>
                    <section>
                        <h3>Contact Information</h3>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="portfolio">Portfolio/LinkedIn (Optional)</label>
                            <input type="url" id="portfolio" name="portfolio">
                        </div>
                    </section>
                    <button type="submit" class="cta-button primary">Submit Your Zone of Genius</button>
                </form>
            </div>
        ` : `
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Execution Builder</h2>
                <p>Help small businesses grow by building and automating their systems</p>
            </div>
            <div class="job-description">
                <section>
                    <h3>Role Overview</h3>
                    <p>As an Execution Builder at Build Things, you'll be at the forefront of transforming small businesses through automation and system optimization. This role combines technical expertise with practical business acumen to deliver real, measurable results for our clients.</p>
                </section>
                <section>
                    <h3>What You'll Do</h3>
                    <ul>
                        <li>Design and implement automated solutions for small business operations</li>
                        <li>Build and optimize systems that drive business growth</li>
                        <li>Collaborate with clients to understand their needs and deliver tailored solutions</li>
                        <li>Create documentation and training materials for implemented systems</li>
                        <li>Measure and report on the impact of automation initiatives</li>
                    </ul>
                </section>
                <section>
                    <h3>What You'll Bring</h3>
                    <ul>
                        <li>Strong problem-solving abilities and attention to detail</li>
                        <li>Experience with automation tools and programming (specific tools less important than ability to learn)</li>
                        <li>Excellent communication skills and ability to explain technical concepts clearly</li>
                        <li>Self-motivated with a drive to deliver measurable results</li>
                        <li>Passion for helping small businesses succeed</li>
                    </ul>
                </section>
                <section>
                    <h3>Benefits & Culture</h3>
                    <ul>
                        <li>Competitive compensation based on your impact</li>
                        <li>Flexible work arrangements</li>
                        <li>Continuous learning opportunities</li>
                        <li>Direct impact on small business success</li>
                        <li>Collaborative, innovation-focused environment</li>
                    </ul>
                </section>
            </div>
            <a href="mailto:careers@buildthings.dev" class="cta-button primary change-world-btn">Ready to Change the World?</a>
        `;
        
        modal.querySelector('.modal-content').innerHTML = modalContent;
        modal.style.display = 'block';
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    jobCards.forEach(card => {
        card.addEventListener('click', () => {
            const jobId = card.getAttribute('data-job');
            showJobDetails(jobId);
        });
    });

    jobButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const jobId = button.getAttribute('data-job') || button.closest('.job-card')?.getAttribute('data-job');
            if (jobId) {
                showJobDetails(jobId);
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission handler for Zone of Genius
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'geniusForm') {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                impact: formData.get('impact'),
                skills: formData.get('skills'),
                vision: formData.get('vision'),
                name: formData.get('name'),
                email: formData.get('email'),
                portfolio: formData.get('portfolio')
            };

            // For now, we'll send an email with the form data
            const emailBody = `
Name: ${data.name}
Email: ${data.email}
Portfolio: ${data.portfolio}

Impact Vision:
${data.impact}

Key Strengths:
${data.skills}

Role Vision:
${data.vision}
            `;

            window.location.href = `mailto:careers@buildthings.dev?subject=Zone of Genius Submission - ${data.name}&body=${encodeURIComponent(emailBody)}`;
            
            // Show success message
            const form = document.getElementById('geniusForm');
            form.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for sharing your Zone of Genius!</h3>
                    <p>We're excited to explore how we can create something amazing together. We'll be in touch soon!</p>
                </div>
            `;
        }
    });

    // Smooth scrolling for anchor links (except Zone of Genius)
    document.querySelectorAll('a[href^="#"]:not([href="#zone-of-genius"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.process-step, .path-card, .timeline-step, .innovation-card, .testimonial');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
});
