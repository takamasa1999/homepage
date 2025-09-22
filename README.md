# Repainter's Homepage

Here, I'm going to share all the details of the tech stack used for my homepage.
Since I use a fairly cheap VPS to host the site, I try to keep everything as minimal as possible.

<!-- toc -->

- [Environment](#environment)
    * [Production server](#production-server)
- [Frontend](#frontend)
    * [Libraries](#libraries)
    * [Fonts](#fonts)
    * [Version Control](#version-control)
- [Backend](#backend)
    * [Python-libraries](#python-libraries)
        + [Database & Infrastructure](#database--infrastructure)
- [Dev Tools](#dev-tools)

<!-- tocstop -->

## Environment

### Production server

Server spec upgraded on 23rd Sep 2025 🎉

OS: Ubuntu 24.04.2 LTS x86_64  
CPU: Intel Xeon E312xx (Sandy Bridge) (4) @ 2.20 GHz  
GPU: Cirrus Logic GD 5446  
Memory: 3.82 GiB  
Disk (/): 76.45 GiB

## Frontend

### Libraries

- [model-viewer](https://modelviewer.dev/): Used to display 3D models without requiring Node.js.  
  You can use the tool below to set the camera orientation and export WebP files:  
  https://modelviewer.dev/editor/
- [Milligram](https://milligram.io/##getting-started): A minimal CSS framework for easier responsive design.
- [particles.js](https://github.com/VincentGarreau/particles.js)
- [randomcolor](https://cdnjs.com/libraries/randomcolor)
- [sweetalert] (https://github.com/t4t5/sweetalert)
- [nprogress](https://github.com/rstacruz/nprogresso)
- [simple-notify](https://github.com/simple-notify/simple-notify)

### Fonts

- [Bitcount Grid Single](https://fonts.google.com/specimen/Bitcount+Grid+Single)
- [Bitcount Grid Double](https://fonts.google.com/specimen/Bitcount+Grid+Double)

### Version Control

The application version is set via the rv (Repainter Version) query parameter, e.g., ?rv=0.1.1.  
Use the following Vim command to apply a version update across files (via the quickfix list):

```bash
:cfdo %s/rv=0.1.2/rv=0.1.3/gc | update | bd
```

## Backend

### Python-libraries

- [faster-whisper](https://pypi.org/project/faster-whisper/)
- uvicorn
- fastapi
- psycopg

#### Database & Infrastructure

- PostgreSQL (database)
- Nginx (web server/reverse proxy)
- Certbot (SSL automation)
- systemd (service management)

## Dev Tools

- **Docker Compose** – Sets up isolated environments for local development
- **VS Code** – User-friendly code editor, mainly used for local work
- **Neovim** – Lightweight editor for coding and patching directly on low-spec servers
- **tmux** – Terminal multiplexer for persistent sessions and efficient server-side workflows
