# Gigzlr

A modern platform connecting freelancers with clients for seamless gig-based work opportunities.

##  Overview

Gigzlr is a comprehensive freelancing platform designed to bridge the gap between talented professionals and businesses seeking specialized services. Our platform streamlines the process of finding, hiring, and managing freelance work with intuitive tools and secure payment systems.

## ✨ Features

- **User Authentication & Profiles**
  - Secure user registration and login
  - Detailed freelancer and client profiles
  - Portfolio showcase capabilities
  - Skill verification and ratings

- **Project Management**
  - Post and browse gig opportunities
  - Advanced search and filtering
  - Project milestone tracking
  - Real-time collaboration tools

- **Communication Hub**
  - Built-in messaging system
  - File sharing capabilities
  - Video call integration
  - Notification system

- **Review & Rating System**
  - Bidirectional feedback system
  - Detailed project reviews
  - Reputation scoring
  - Quality assurance metrics

## 🛠️ Tech Stack

### Frontend
- React.js / Next.js
- TypeScript
- Tailwind CSS
- Redux / Context API

### Backend
- Node.js / Python
- Express.js / FastAPI
- MongoDB / PostgreSQL
- JWT Authentication

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB or PostgreSQL
- Git

### Clone the Repository
```bash
git clone https://github.com/manasmaheshwarii/Gigzlr.git
cd Gigzlr
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in both frontend and backend directories:

**Backend `.env`:**
```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
EMAIL_SERVICE_API_KEY=your_email_api_key
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

##  Getting Started

1. **Register an Account**
   - Sign up as either a freelancer or client
   - Complete your profile with relevant information
   - Verify your email address

2. **For Freelancers**
   - Create a detailed profile showcasing your skills
   - Browse available gigs and submit proposals
   - Communicate with potential clients
   - Deliver quality work and build your reputation

3. **For Clients**
   - Post detailed project requirements
   - Review freelancer proposals and profiles
   - Select the best candidate for your project
   - Manage project progress and provide feedback

## 📱 Usage Examples

### Posting a Gig (Client)
```javascript
const newGig = {
  title: "Modern Website Development",
  description: "Need a responsive website for my business",
  budget: 1500,
  deadline: "2024-02-15",
  skills: ["React", "Node.js", "MongoDB"],
  category: "Web Development"
};
```

### Submitting a Proposal (Freelancer)
```javascript
const proposal = {
  gigId: "gig_123",
  coverLetter: "I'm excited to work on your project...",
  proposedBudget: 1200,
  deliveryTime: "10 days",
  portfolio: ["project1.com", "project2.com"]
};
```

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# Integration tests
npm run test:integration
```

### Test Coverage
```bash
npm run test:coverage
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Gig Endpoints
- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create new gig
- `GET /api/gigs/:id` - Get specific gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig

### Proposal Endpoints
- `POST /api/proposals` - Submit proposal
- `GET /api/proposals/gig/:gigId` - Get proposals for a gig
- `PUT /api/proposals/:id` - Update proposal status

For complete API documentation, visit `/api/docs` when the server is running.

## 🤝 Contributing

We welcome contributions to Gigzlr! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Known Issues

- File upload size limitation (currently 10MB)
- Real-time notifications may have slight delays
- Search filters need performance optimization


## 👥 Team

- **Manas Maheshwari** - *Project Lead & Full Stack Developer* - [@manasmaheshwarii](https://github.com/manasmaheshwarii)


## 📞 Support

If you encounter any issues or have questions:
- **Issues**: [GitHub Issues](https://github.com/manasmaheshwarii/Gigzlr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/manasmaheshwarii/Gigzlr/discussions)

## 🌟 Show Your Support

If you find this project helpful, please consider:
- Giving it a ⭐ on GitHub
- Sharing it with others
- Contributing to the codebase
- Reporting bugs and suggesting features

---

**  THANK YOU  **
