# Portfolio Website Template

A modern, responsive portfolio website template built with Next.js 14 and React 18. This template is designed for developers to easily customize and deploy their own professional portfolio.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18
- **Styling**: Pure CSS (no UI libraries)
- **Language**: JavaScript
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.js          # Root layout with navbar and global styles
│   └── page.js            # Main page with all sections
├── components/
│   ├── Navbar.js          # Sticky navigation component
│   ├── Hero.js            # Hero section with CTA buttons
│   ├── Skills.js          # Skills section with categorized cards
│   ├── Projects.js        # Projects section with project cards
│   ├── ProjectCard.js     # Reusable project card component
│   ├── About.js           # About section
│   └── Contact.js         # Contact section with social links
├── styles/
│   └── globals.css        # Global styles and responsive design
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone or download the template**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## � Customization Guide

### Personal Information

Update the following files with your information (look for `TODO` comments):

1. **Name & Logo**: `components/Navbar.js` - Change "Your Name" in the logo
2. **Hero Section**: `components/Hero.js` - Update name, description, and GitHub link
3. **Projects**: `components/Projects.js` - Replace with your actual projects
4. **Contact**: `components/Contact.js` - Update email and social links
5. **About**: `components/About.js` - Personalize your about text
6. **Page Title**: `app/layout.js` - Update the page title

### Adding Your Projects

Edit `components/Projects.js` and update the `projects` array:

```javascript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description...',
    techStack: ['Tech1', 'Tech2', 'Tech3'],
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://project-demo.com',
    imageUrl: null // or path to project image
  },
  // Add more projects...
];
```

### Skills Section

Customize skills in `components/Skills.js`:

```javascript
const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
  Backend: ['Node.js', 'PHP', 'Python'],
  Databases: ['MySQL', 'MongoDB'],
  Tools: ['Git', 'GitHub', 'Postman', 'VS Code']
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your GitHub account and deploy

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🎯 Features

- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ✅ **Smooth Scrolling**: Navigation links smoothly scroll to sections
- ✅ **Sticky Navigation**: Navbar stays visible while scrolling
- ✅ **Project Cards**: Interactive cards with hover effects
- ✅ **Skill Categories**: Organized display of technical skills
- ✅ **Contact Links**: Easy access to professional profiles
- ✅ **Semantic HTML**: Proper HTML5 structure for accessibility
- ✅ **SEO Friendly**: Proper meta tags and structure
- ✅ **Performance Optimized**: Built with Next.js for optimal performance
- ✅ **Easy Customization**: Clear TODO comments throughout the code

## 📱 Sections

1. **Hero**: Introduction with name, title, and call-to-action buttons
2. **Skills**: Categorized display of technical skills
3. **Projects**: Showcase of 4 featured projects with details
4. **About**: Personal description and background
5. **Contact**: Professional contact information and links

## 🎨 Design Principles

- **Minimal**: Clean, uncluttered interface
- **Modern**: Contemporary design patterns
- **Professional**: Business-appropriate aesthetics
- **Accessible**: Semantic HTML and proper structure
- **Responsive**: Mobile-first responsive design

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a portfolio template. Feel free to:
- Fork and customize for your own use
- Submit issues and suggestions
- Contribute improvements via pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have questions about setting up or customizing this template:
- Check the TODO comments in the code
- Open an issue on GitHub
- Review the customization guide above

---

**Built with ❤️ using Next.js and React**

**Perfect for developers who want a clean, professional portfolio without the complexity of UI libraries!**
