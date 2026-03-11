# eSthira Mobility - React + Sanity CMS Website

A modern, responsive website for eSthira Mobility built with React and Sanity CMS. This replicates the original esthira.com website with a scalable headless CMS architecture.

## 🚀 Features

- **React 18** with TypeScript for type-safe development
- **Sanity CMS** for content management
- **Styled Components** for CSS-in-JS styling
- **Responsive Design** optimized for all devices
- **Interactive Components** with smooth animations
- **SEO Optimized** with proper meta tags
- **Modern Architecture** with reusable components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Styled Components
- **CMS**: Sanity CMS with custom schemas
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Sanity CMS:
   ```bash
   cd esthira
   npm install
   ```

## 🚀 Development

### Start React Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Start Sanity Studio
```bash
cd esthira
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) to access the Sanity Studio.

## 📁 Project Structure

```
esthira-react/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductFeatures.tsx
│   │   ├── Benefits.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Support.tsx
│   │   ├── Retailers.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useSanityData.ts
│   ├── lib/               # Utility functions
│   │   └── sanity.ts
│   ├── styles/            # Global styles
│   │   └── GlobalStyles.ts
│   └── App.tsx            # Main App component
├── esthira/               # Sanity CMS configuration
│   ├── schemas/           # Content schemas
│   └── sanity.config.ts   # Sanity configuration
└── package.json
```

## 🎨 Components

### Header
- Responsive navigation with hamburger menu
- Dropdown menus for Shop, Chronicles, and Support
- Smooth scroll navigation

### Hero Section
- Eye-catching hero banner with call-to-action buttons
- Gradient background with animated elements

### Product Features
- 8 key features of the eSthira Raptric
- Interactive cards with hover effects
- Icon-based visual representation

### Benefits Section
- 9 benefits of choosing eBikes
- Card-based layout with left border accent
- Responsive grid system

### Testimonials
- Customer reviews with author information
- Social proof section
- Animated card effects

### Support Center
- FAQ, Service, Safety Tips, and Manual sections
- Icon-based support cards
- Quick access to help resources

### Retailers Network
- List of authorized dealers
- Contact information for each location
- City-based organization

### Contact Form
- Interactive contact form with validation
- Real-time form feedback
- Notification system for user feedback

### Footer
- Company information and links
- Social media integration
- Legal pages navigation

## 🔧 Sanity CMS Schemas

The following content types are configured:

1. **Hero Section** - Main banner content
2. **Product Features** - eBike features and specifications
3. **Benefits** - eBike advantages
4. **Testimonials** - Customer reviews
5. **Contact Info** - Company contact details
6. **Retailers** - Authorized dealer locations

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Key Features

- **Content Management**: Easily update content through Sanity Studio
- **Performance**: Optimized loading with React hooks
- **Accessibility**: Semantic HTML and ARIA labels
- **SEO**: Proper meta tags and structured content
- **User Experience**: Smooth animations and transitions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Sanity Studio
```bash
cd esthira
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: info@esthira.com
- Phone: +91 98765 43210

---

**Built with ❤️ for eSthira Mobility**
