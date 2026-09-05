# 3 Angels Water Station (Front End)

Angels Water is a frontend web application, this is UI only (no backend) every screen uses local mock data so you can navigate through the whole app, built to showcase the company's services, information, and contact details. This project is implementing the approved Figma design with a working homepage, navigation, and reusable UI components.

## Group Members
- Christina Paalisbo (Project Manager)
- Jayvee Coleta
- Gian Carlo Angeles
- RJ Jose Reyes
- Karlo Gazo
- Ken Angelo Castro



## Run it in VS Code

1. Open this folder (`mj-prints-admin`) in VS Code.
2. Open a terminal (Terminal → New Terminal) and install dependencies:
   ```
   npm install or cmd /c npm install 
   ```
3. Start the dev server:
   ```
   npm run dev or cmd /c npm run dev
   ```
4. Open the printed URL (usually `http://localhost:5174`) in your browser.

## Login

The login screen is UI-only. Type anything in Username/Password and click **Login** to
enter the web app(there's no real authentication).

## Structure

front-end-3-angels-water-main/
 public/              # Static assets (favicon, icons)
 src/
│ assets/          # Images and logos
│  components/      # Reusable UI components (e.g. Navigation)
│  hooks/           # Custom React hooks
│  pages/           # Route pages (Home, About, Services, Contact)
│  styles/          # CSS files
│  utils/           # Utility/helper functions
│  App.jsx          # Root component with route definitions
│   main.jsx         # App entry point
index.html
package.json
vite.config.js

## Pages & Navigation

- **Home** — landing page
- **About** — business information 
- **Services** — services offered
- **Contact** — contact details
