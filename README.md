# Eliosa Studio

> **Create. Collect. Connect.**  
> Sacred Iconography, Approaches for Beginners & DIY Painting Kits.

Official website for **Eliosa Studio** by Mary Elias Sawires, hosted on GitHub Pages.

---

## 🎨 Overview

Eliosa Studio bridges ancient sacred tradition and modern creativity. Whether you are looking for a meaningful gift, a custom-painted commission, or the tools to write your very first icon, Eliosa Studio provides approachable spiritual practices for children, beginners, and collectors.

### Offerings
- **Original Hand-Written Sacred Icons**: Egg tempera and genuine gold leaf on custom Baltic Birch wood and Claybord with traditional levkas grounds.
- **Watercolor Icons Ready to Paint**: Perfect for travel activities, Sunday schools, and church retreats.
- **Pre-Printed Canvas Icons**: Outlines ready for watercolors, acrylics, oils, gouache, or markers.
- **Sacred Art Coloring Books**: Reverent line art for reflection and discovery.
- **Parish & Community Workshops**: In-person icon painting events and retreats.

---

## 🌐 Custom Domain & DNS Setup

To link your custom domain (`eliosastudio.com`) to this GitHub Pages site:

### 1. GitHub Pages Configuration
In your GitHub repository settings:
- Navigate to **Settings** &rarr; **Pages**.
- **Source**: Deploy from a branch &rarr; Branch: `main` &rarr; Folder: `/ (root)`.
- **Custom domain**: `eliosastudio.com`.
- Check **Enforce HTTPS** once DNS has propagated.

### 2. DNS Records (at your domain registrar / DNS provider)

#### For apex domain (`eliosastudio.com`):
Add the following **4 A records**:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

#### For `www` subdomain (`www.eliosastudio.com`):
Add **1 CNAME record**:
- **Host**: `www`
- **Value / Target**: `maryeliassawires.github.io.`

---

## 📁 Project Structure

```
├── index.html                  # Main responsive single-page site
├── styles.css                  # Modern stylesheet with brand tokens & typography
├── script.js                   # Interactive filtering, modals, and inquiry handlers
├── CNAME                       # GitHub Pages custom domain routing
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── assets/
│   └── images/                 # High-resolution artwork, photography, and icons
└── canva_site_backup.json      # Original Canva site data backup
```

---

## ✉️ Inquiries & Commissions

For inquiries, commissions, or hosting a workshop:
- **Email**: maryeliassawires@gmail.com
- **Website**: [eliosastudio.com](https://eliosastudio.com)
