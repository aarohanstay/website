# Aarohan Hospitality - Tirthan Valley Hotel Web Application

Official web application for **Aarohan Retreat Tirthan Valley**. Built with Next.js 16 (App Router), React 19, Tailwind CSS, TypeScript, and integrated AI Butler capabilities.

---

## 🤖 1-Click GitHub Actions CI/CD (Deploy to Hostinger Subdomain)

A manual **"Run workflow"** button CI/CD is configured in `.github/workflows/deploy.yml` using `SamKirkland/FTP-Deploy-Action@v4.3.5`.

### How to Trigger Deployment via 1-Click GitHub Button:
1. Go to your repository on GitHub.
2. Click the **Actions** tab at the top.
3. Select **"Deploy Aarohan App to Hostinger"** on the left menu.
4. Click the **"Run workflow"** dropdown button on the right → Click **"Run workflow"**.

---

### Step-by-Step GitHub Setup (One-Time Configuration)

To connect your GitHub repository to your Hostinger subdomain folder, add these **4 Secrets** to your GitHub repository:

1. In GitHub, go to your repository **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret** and add the following:

| Secret Name | Description / Example Value |
| :--- | :--- |
| `HOSTINGER_FTP_SERVER` | Your Hostinger FTP server IP or `ftp.yourdomain.com` |
| `HOSTINGER_FTP_USERNAME` | Your Hostinger FTP username (e.g. `u123456789`) |
| `HOSTINGER_FTP_PASSWORD` | Your Hostinger FTP password |
| `HOSTINGER_TARGET_FOLDER` | Subdomain folder path (e.g. `public/` or `public_html/`) |

---

## 🚀 Quick Start (Local Development)

To run the application locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live website.

---

## 📦 Manual Build & Hostinger Deployment

If you prefer uploading files manually without GitHub Actions:

### Step 1: Generate the `out/` Folder
Run the build command in your terminal:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run build
```

### Step 2: Upload Files to Hostinger File Manager
1. Log in to your Hostinger hPanel ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Go to **Websites** → Click **Manage** next to your domain.
3. Open **Files** → **File Manager** → Navigate to your **subdomain folder** (e.g. `public_html/aarohan/`).
4. Upload **ALL contents inside the `out/` folder** (`index.html`, `checkout.html`, `_next/`, `branding/`, `slides/`, `real/`, `favicon.ico`) directly into that subdomain folder.

### Step 3: Configure `.htaccess` for Clean URL Routing
Create or edit the **`.htaccess`** file inside your subdomain folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Serve static files directly if they exist
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite extensionless routes to .html
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>
```
