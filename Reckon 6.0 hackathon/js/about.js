class AboutManager {
  constructor() {
    this.teamMembers = [
      {
        name: "John Doe",
        role: "Fitness Expert",
        image: "images/team/member1.jpg",
      },
      {
        name: "Sarah Johnson",
        role: "Nutrition Specialist",
        image: "images/team/member2.jpg",
      },
      {
        name: "Raj Patel",
        role: "Yoga Instructor",
        image: "images/team/member3.jpg",
      },
      {
        name: "Priya Sharma",
        role: "Wellness Coach",
        image: "images/team/member4.jpg",
      },
    ];

    this.initializeAboutPage();
  }

  initializeAboutPage() {
    this.setupAnimations();
    this.setupEventListeners();
  }

  setupAnimations() {
    // Add scroll animations for sections
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-section");
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  setupEventListeners() {
    // Add hover effects for team cards
    document.querySelectorAll(".team-card").forEach((card) => {
      card.addEventListener("mouseenter", this.handleTeamCardHover);
      card.addEventListener("mouseleave", this.handleTeamCardLeave);
    });
  }

  handleTeamCardHover(e) {
    e.currentTarget.classList.add("team-card-hover");
  }

  handleTeamCardLeave(e) {
    e.currentTarget.classList.remove("team-card-hover");
  }
}

// Initialize about page manager
const aboutManager = new AboutManager();
