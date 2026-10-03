Ko će piće platiti: put it on Vercel
====================================

This folder is a finished static website. There is nothing to build.
The files must stay at the top level (index.html next to vercel.json).

Option A: from a computer, with the Vercel command line (about 5 minutes)
  1. Install Node.js from nodejs.org.
  2. Open a terminal and run:   npm install -g vercel
  3. Go into this folder:       cd path/to/this/folder
  4. Log in:                    vercel login
  5. Deploy:                    vercel --prod
     Answer the questions: set up and deploy = Y, link to existing project = N,
     project name = anything, directory = ./, change settings = N.
  6. Vercel prints your address, for example https://your-name.vercel.app

Option B: with GitHub (no command line)
  1. Create a new repository on github.com and upload all the files from this folder to it
     (Add file > Upload files). index.html must be at the top level of the repository.
  2. On vercel.com choose Add New > Project, and import that repository.
  3. Framework Preset: Other. Leave the build command and output directory empty. Click Deploy.

After it is online
  - Anyone can open the address in Chrome or Safari. No account and no Claude needed.
  - On Android Chrome: menu > Install app. On iPhone Safari: Share > Add to Home Screen.
  - If visitors are asked to log in to Vercel, open the project on vercel.com >
    Settings > Deployment Protection and turn it off for production, then try again.
  - Everything people enter (trips, expenses, game history) is saved only on their own phone.
    Nothing is sent to any server, and nothing is shared between people or devices.

Updating later
  Replace index.html with the new version and change the version number at the top of sw.js
  (ko-ce-pice-platiti-v1 to v2), then deploy again. Phones then pick up the update.
