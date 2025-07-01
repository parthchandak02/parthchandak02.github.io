# Parth Chandak - Portfolio Website

<img alt="Logo" src="src/images/logo-p.svg" width="100" />

**Personal portfolio website of Parth Chandak** - Creative Technologist specializing in autonomous vehicle experiences, manufacturing engineering, and research.

🌐 **Live Site**: [https://parthchandak02.github.io](https://parthchandak02.github.io)  
📧 **Contact**: [parthchandak02@gmail.com](mailto:parthchandak02@gmail.com)  
💼 **LinkedIn**: [linkedin.com/in/parthchandak02](https://www.linkedin.com/in/parthchandak02)

---

## 📋 Table of Contents

- [About This Website](#-about-this-website)
- [Website Sections](#-website-sections)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [How to Update Content](#-how-to-update-content)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Design Credits](#-design-credits)
- [License](#-license)

---

## 🚀 About This Website

This is a modern, responsive portfolio website built with Gatsby.js that showcases my professional journey, projects, and achievements. The site features:

### Key Highlights:
- **Creative Technologist Profile** - Autonomous vehicle UX, manufacturing systems, and research
- **Project Showcase** - Engineering projects from WSU and professional work
- **Awards & Recognition** - Academic honors, scholarships, and professional achievements
- **Research Publications** - Published work and academic contributions
- **Professional Experience** - Timeline of roles and responsibilities
- **Community Involvement** - Leadership and volunteer activities
- **Media Features** - Press coverage and speaking engagements

---

## 🎯 Website Sections

### 1. **Hero Section** (`src/components/sections/hero.js`)
- Personal introduction and tagline
- Quick navigation to key sections
- Professional summary

### 2. **Experience** (`src/components/sections/jobs.js`)
- Professional work history
- Role descriptions and achievements
- Company information and tenure

### 3. **Featured Projects** (`src/components/sections/featured.js`)
- Highlighted engineering and technology projects
- Project descriptions, technologies used, and outcomes
- Links to project details and repositories

### 4. **Awards & Recognition** (`src/components/sections/awards.js`)
- Academic honors and scholarships
- Professional recognition
- Competition awards and achievements
- **Recently Updated**: WSU awards including Harold Frank Fellows Kauffman Award

### 5. **Research** (`src/components/sections/research.js`)
- Published papers and research work
- Academic contributions
- Research interests and methodologies

### 6. **Community Service** (`src/components/sections/community.js`)
- Volunteer work and leadership roles
- Community involvement
- Social impact initiatives

### 7. **Media Coverage** (`src/components/sections/media.js`)
- Press mentions and features
- Speaking engagements
- Media appearances

### 8. **Contact** (`src/components/sections/contact.js`)
- Contact information and social links
- Contact form integration
- Call-to-action for networking

---

## 🛠️ Tech Stack

### Core Technologies:
- **[Gatsby.js](https://www.gatsbyjs.com/)** - React-based static site generator
- **[React](https://reactjs.org/)** - Component-based UI library
- **[Styled Components](https://styled-components.com/)** - CSS-in-JS styling solution
- **[GraphQL](https://graphql.org/)** - Data layer and content management

### Development Tools:
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for code quality
- **[ScrollReveal](https://scrollrevealjs.org/)** - Scroll animations

### Deployment:
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation:

```bash
# Clone the repository
git clone https://github.com/parthchandak02/parthchandak02.github.io.git

# Navigate to project directory
cd parthchandak02.github.io

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts:

```bash
# Development server (http://localhost:8000)
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean cache and public folders
npm run clean

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint
```

---

## ✏️ How to Update Content

### Updating Personal Information:

**Config File** (`src/config.js`):
```javascript
module.exports = {
  email: 'parthchandak02@gmail.com',
  socialMedia: [
    // Update social media links
  ],
  // Other configuration options
};
```

### Adding New Awards:

**Awards Section** (`src/components/sections/awards.js`):
```javascript
const awardsData = [
  {
    title: "Award Name",
    organization: "Awarding Organization",
    date: "Month Year",
    description: "Award description and significance."
  },
  // Add new awards here
];
```

### Adding New Projects:

**Featured Projects** (`src/components/sections/featured.js`):
- Add project images to `src/images/projects/`
- Update the featured projects array with new project data
- Include technologies, descriptions, and links

### Updating Experience:

**Jobs Section** (`src/components/sections/jobs.js`):
- Add new roles to the jobs array
- Include company, position, dates, and responsibilities
- Update current role information

### Adding Research Publications:

**Research Section** (`src/components/sections/research.js`):
- Add new publications to the research data
- Include titles, venues, dates, and abstracts
- Add links to papers and DOIs

### Updating Images:

**Profile Images**:
- Replace `src/images/me.jpg` with updated professional photo
- Maintain same filename or update references

**Project Images**:
- Add new project images to `src/images/projects/`
- Use descriptive filenames
- Optimize images for web (recommended: 800x600px, < 500KB)

### Styling Updates:

**Theme Configuration** (`src/styles/theme.js`):
- Update colors, fonts, and spacing
- Modify breakpoints and layout settings

**Global Styles** (`src/styles/GlobalStyle.js`):
- Update global CSS rules
- Modify typography and base styles

---

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── icons/           # SVG icon components
│   ├── sections/        # Main page sections
│   │   ├── hero.js     # Hero/intro section
│   │   ├── jobs.js     # Experience section
│   │   ├── featured.js # Featured projects
│   │   ├── awards.js   # Awards & recognition
│   │   ├── research.js # Research publications
│   │   ├── community.js# Community service
│   │   ├── media.js    # Media coverage
│   │   └── contact.js  # Contact section
│   ├── layout.js       # Main layout wrapper
│   ├── nav.js         # Navigation component
│   └── timeline.js    # Timeline component
├── styles/             # Styling files
│   ├── GlobalStyle.js # Global CSS styles
│   ├── theme.js       # Theme configuration
│   └── variables.js   # CSS variables
├── images/            # Static images
│   ├── projects/      # Project screenshots
│   ├── me.jpg        # Profile photo
│   └── logo-p.svg    # Site logo
├── fonts/            # Custom fonts
├── pages/            # Gatsby pages
└── config.js         # Site configuration
```

---

## 🚀 Deployment

### GitHub Pages Setup:

1. **Repository Configuration**:
   - Repository name: `parthchandak02.github.io`
   - Branch: `main`
   - Deploy from: `/ (root)`

2. **Build and Deploy**:
   ```bash
   # Build the site
   npm run build
   
   # Commit and push changes
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

3. **GitHub Pages Settings**:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Site will be available at: `https://parthchandak02.github.io`

### Automatic Deployment:

The site automatically deploys when changes are pushed to the main branch. Monitor deployment status in the GitHub Actions tab.

---

## 🎨 Design Credits

This website is built upon the beautiful portfolio template originally designed and developed by [Brittany Chiang](https://brittanychiang.com).

**Original Template**: [github.com/bchiang7/v4](https://github.com/bchiang7/v4)

### Customizations Made:
- ✅ Updated content for Parth Chandak's professional profile
- ✅ Added Awards & Recognition section
- ✅ Enhanced Research section for academic publications
- ✅ Added Community Service section
- ✅ Integrated Media Coverage section
- ✅ Updated color scheme and typography
- ✅ Customized project showcase layout
- ✅ Added timeline component for awards and experience

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Original Design**: MIT License by Brittany Chiang  
**Customizations**: MIT License by Parth Chandak

---

## 🤝 Contributing

This is a personal portfolio website, but if you notice any bugs or have suggestions for improvements:

1. Open an issue describing the problem or suggestion
2. Fork the repository and create a feature branch
3. Submit a pull request with your changes

---

## 📞 Contact & Support

**Parth Chandak**  
📧 Email: [parthchandak02@gmail.com](mailto:parthchandak02@gmail.com)  
💼 LinkedIn: [linkedin.com/in/parthchandak02](https://www.linkedin.com/in/parthchandak02)  
🗓️ Schedule Meeting: [tiny.cc/parthchandakbook](https://tiny.cc/parthchandakbook)  
📄 Resume: [tiny.cc/parthchandakresume](https://tiny.cc/parthchandakresume)

---

## 🔄 Version History

- **v1.0.0** (Current) - Initial portfolio website with comprehensive sections
- **Awards Update** - Updated awards section with accurate WSU achievements
- **GitHub Pages** - Migrated to GitHub Pages hosting

---

*Last Updated: July 2025* 