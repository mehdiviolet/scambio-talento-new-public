import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Struttura completa dell'app
const structure = {
  "src/components/Onboarding": [
    "SplashScreen.jsx",
    "OnboardingSlides.jsx",
    "ReadyToStartSlide.jsx",
    "QuickSetupSlides.jsx",
    "AuthScreen.jsx",
    "index.js",
  ],
  "src/components/MainApp/Home": [
    "HomePage.jsx",
    "FeedUpdates.jsx",
    "SuggestedContent.jsx",
    "Cherry.jsx",
    "PeopleNearby.jsx",
    "QuickActions.jsx",
    "index.js",
  ],
  "src/components/MainApp/Search": [
    "SearchPage.jsx",
    "SearchPeople.jsx",
    "SearchExperiences.jsx",
    "SearchEvents.jsx",
    "SearchFilters.jsx",
    "SearchResults.jsx",
    "SearchHistory.jsx",
    "index.js",
  ],
  "src/components/MainApp/Explore": [
    "ExplorePage.jsx",
    "ExploreNavigation.jsx",
    "index.js",
  ],
  "src/components/MainApp/Explore/Events": [
    "EventsList.jsx",
    "EventCard.jsx",
    "EventDetails.jsx",
    "CreateEvent.jsx",
    "EventFilters.jsx",
    "EventCategories.jsx",
    "index.js",
  ],
  "src/components/MainApp/Explore/Experiences": [
    "ExperiencesList.jsx",
    "ExperienceCard.jsx",
    "ExperienceDetails.jsx",
    "CreateExperience.jsx",
    "ExperienceFilters.jsx",
    "ExperienceCategories.jsx",
    "index.js",
  ],
  "src/components/MainApp/Chat": [
    "ChatPage.jsx",
    "ChatList.jsx",
    "ChatRoom.jsx",
    "ChatMessage.jsx",
    "MessageInput.jsx",
    "ChatHeader.jsx",
    "ChatSettings.jsx",
    "GroupChat.jsx",
    "index.js",
  ],
  "src/components/MainApp/Profile": [
    "ProfilePage.jsx",
    "ProfileHeader.jsx",
    "ProfileAbout.jsx",
    "ProfileSkills.jsx",
    "ProfileExperiences.jsx",
    "ProfileOffre.jsx",
    "ProfileRicerca.jsx",
    "ProfilePartecipante.jsx",
    "ProfileEvents.jsx",
    "ProfileGallery.jsx",
    "ProfileActions.jsx",
    "ProfileStats.jsx",
    "ProfileSettings.jsx",
    "index.js",
  ],
  "src/components/MainApp/Settings": [
    "SettingsPage.jsx",
    "AccountSettings.jsx",
    "NotificationSettings.jsx",
    "PrivacySettings.jsx",
    "LanguageSettings.jsx",
    "HelpSupport.jsx",
    "index.js",
  ],
  "src/components/MainApp/Shared": [
    "BottomNavigation.jsx",
    "TopHeader.jsx",
    "LoadingSpinner.jsx",
    "EmptyState.jsx",
    "ErrorBoundary.jsx",
    "index.js",
  ],
  "src/components/MainApp/Shared/Cards": [
    "SkillCard.jsx",
    "ExperienceCard.jsx",
    "EventCard.jsx",
    "UserCard.jsx",
    "index.js",
  ],
  "src/components/MainApp/Shared/Gamification": [
    "GemCounter.jsx",
    "LevelBadge.jsx",
    "AchievementPopup.jsx",
    "ProgressBar.jsx",
    "index.js",
  ],
  "src/components/MainApp/Shared/Forms": [
    "InputField.jsx",
    "SelectField.jsx",
    "TextArea.jsx",
    "ImageUpload.jsx",
    "index.js",
  ],
  "src/components/Context": [
    "OnboardingContext.jsx",
    "AppContext.jsx",
    "UserContext.jsx",
    "GamificationContext.jsx",
    "ChatContext.jsx",
    "index.js",
  ],
  src: ["main.jsx", "App.jsx"],
  "src/components": ["MainAppRouter.jsx", "OnboardingApp.jsx"],
  "src/utils": [
    "soundUtils.js",
    "storageUtils.js",
    "dateUtils.js",
    "imageUtils.js",
    "validationUtils.js",
    "constants.js",
    "index.js",
  ],
  "src/assets/sounds": [],
  "src/assets/images": [],
  "src/assets/icons": [],
  "src/styles": ["globals.css", "components.css"],
};

// Template per main.jsx
const getMainTemplate = () => {
  return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
};

// Template per App.jsx principale
const getAppTemplate = () => {
  return `import React from 'react';
import { OnboardingProvider } from './components/Context/OnboardingContext';
import OnboardingApp from './components/OnboardingApp';

function App() {
  return (
    <OnboardingProvider>
      <OnboardingApp />
    </OnboardingProvider>
  );
}

export default App;
`;
};

// Template base per i componenti React
const getComponentTemplate = (componentName) => {
  return `import React from 'react';

const ${componentName} = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">${componentName}</h2>
      <p className="text-gray-600">Componente in sviluppo...</p>
    </div>
  );
};

export default ${componentName};
`;
};

// Template per index.js
const getIndexTemplate = (folderPath) => {
  const files = structure[folderPath] || [];
  const exports = files
    .filter((file) => file.endsWith(".jsx"))
    .map((file) => {
      const componentName = file.replace(".jsx", "");
      return `export { default as ${componentName} } from './${componentName}';`;
    })
    .join("\n");

  return exports || "// Export dei componenti di questa cartella\n";
};

// Template per file JavaScript non-React
const getUtilTemplate = (fileName) => {
  const baseName = fileName.replace(".js", "");
  return `// ${baseName} utilities

export const ${baseName} = {
  // Implementazione in arrivo...
};

export default ${baseName};
`;
};

// Template per file CSS
const getCSSTemplate = (fileName) => {
  return `/* ${fileName} */

/* Stili personalizzati */
`;
};

// Funzione per creare le cartelle e i file
const createStructure = () => {
  console.log("🚀 Creazione struttura componenti...\n");

  Object.entries(structure).forEach(([folderPath, files]) => {
    // Crea la cartella
    const fullPath = path.join(process.cwd(), folderPath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Creata cartella: ${folderPath}`);
    }

    // Crea i file
    files.forEach((fileName) => {
      const filePath = path.join(fullPath, fileName);

      if (!fs.existsSync(filePath)) {
        let content = "";

        if (fileName.endsWith(".jsx")) {
          const componentName = fileName.replace(".jsx", "");
          if (fileName === "main.jsx") {
            content = getMainTemplate();
          } else if (fileName === "App.jsx") {
            content = getAppTemplate();
          } else {
            content = getComponentTemplate(componentName);
          }
        } else if (fileName === "index.js") {
          content = getIndexTemplate(folderPath);
        } else if (fileName.endsWith(".js")) {
          content = getUtilTemplate(fileName);
        } else if (fileName.endsWith(".css")) {
          content = getCSSTemplate(fileName);
        }

        fs.writeFileSync(filePath, content);
        console.log(`   ✅ ${fileName}`);
      }
    });
  });

  console.log("\n🎉 Struttura completata con successo!");
  console.log("\n📋 Prossimi passi:");
  console.log("1. Verifica che tutti i file siano stati creati");
  console.log("2. Inizia a copiare/incollare il codice nei componenti");
  console.log("3. Aggiorna gli import nei vari componenti");
  console.log(
    "\n💡 Tutti i componenti hanno un template base con className Tailwind"
  );
};

// Esegui lo script
createStructure();
