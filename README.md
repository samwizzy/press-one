# Tasks Application

## Overview

This application allows users to view and manage tasks. It provide the capability to view alll tasks, create a task, update a task and delete a task. The application uses Vue 3 + TypeScript + Vite.

## Features

- **Tasks lists**: Visualization of the list of tasks.
- **List of Events**: View detailed information about each event.
- **Mobile-First Design**: Optimized for mobile devices, with responsive layouts for larger screens _(pending)_.
- **Shadcn framework & Utility-First CSS**: Styled using **Tailwind CSS**, enabling quick and easy application of styles with minimal custom CSS.

## Libraries and Tools

- **HTML5 & CSS3**: Structure and styling of the application.
- **JavaScript (ES6)**: For application logic, including event handling and dynamic content rendering.
- **Tailwind CSS**: For rapid, utility-first styling and normalization of default styles across browsers.
- **Shadcn**: To visualize monthly event metrics in a clean, easy-to-understand format.   

| Library Used         |                                                                                         | 
|----------------------|-----------------------------------------------------------------------------------------|
| Tailwindcss          | ![Static Badge](https://img.shields.io/badge/CSS-tailwindcss-blue?logo=tailwindcss)     | 
| Shadcn               | ![Static Badge](https://img.shields.io/badge/shadcn-blue?logo=shadcn/ui)                | 
| Json-server          | ![Static Badge](https://img.shields.io/badge/json_server-blue?logo=json)                | 


## Future Enhancements

- [ ] Add event filtering and search functionality.
- [ ] Allow users to add or edit events directly through the interface.
- [ ] Integrate a backend to store event data persistently (e.g., using a database or an API).
- [ ] Add user authentication for personal event management.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/samwizzy/press-one.git
   cd press-one
   
   npm install

   npm run dev
   ```

2. Project structure:
   ```bash
   /press-one
   │
   ├── src
   │   ├── assets
   │   ├── components 
   │   ├── lib #  utils
   │   ├── router # router
   │   ├── views # views
   │   ├── App.vue # layout
   │   ├── main.ts # entry file
   │   ├── setupTest.ts # test setup
   │   └── style.css # global style file
   ├── public
   │ 
   ├── .env # secret data
   ├── .gitignore # github ignore file
   ├── .db.json # json-server db 
   ├── .README.md  
   │   
   └── index.html # Main HTML file
   ```

## License

This project is licensed under the MIT License.

![Static Badge](https://img.shields.io/github/license/samwizzy/press-one)  

## Author

**Samuel Okeke**  
Senior Frontend Developer  
[GitHub Profile](https://github.com/samwizzy)  
[LinkedIn Profile](https://linkedin.com/in/samuel-okeke)
