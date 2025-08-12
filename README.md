Repainter's Homepage

Here, I'm going to share all the details of the tech stack used for my homepage.
Since I use a fairly cheap VPS to host the site, I try to keep everything as minimal as possible.

# Frontend

## Libraries

- [model-viewer](https://modelviewer.dev/): Used to display 3D models without requiring Node.js.  
  You can use the tool below to set the camera orientation and export WebP files:  
  https://modelviewer.dev/editor/
- [Milligram](https://milligram.io/#getting-started): A minimal CSS framework for easier responsive design.
- [particles.js](https://github.com/VincentGarreau/particles.js)
- [randomcolor](https://cdnjs.com/libraries/randomcolor)
- [sweetalert] (https://github.com/t4t5/sweetalert)
- [nprogress](https://github.com/rstacruz/nprogresso)
- [simple-notify](https://github.com/simple-notify/simple-notify)

## Fonts

- [Bitcount Grid Single](https://fonts.google.com/specimen/Bitcount+Grid+Single)
- [Bitcount Grid Double](https://fonts.google.com/specimen/Bitcount+Grid+Double)

# Backend

## Python-libraries

- [faster-whisper](https://pypi.org/project/faster-whisper/)
- uvicorn
- fastapi
- psycopg

## Database & Infrastructure

- PostgreSQL (database)
- Nginx (web server/reverse proxy)
- Certbot (SSL automation)
- systemd (service management)

# Dev Tools

- **Docker Compose** – Sets up isolated environments for local development
- **VS Code** – User-friendly code editor, mainly used for local work
- **Neovim** – Lightweight editor for coding and patching directly on low-spec servers
- **tmux** – Terminal multiplexer for persistent sessions and efficient server-side workflows
