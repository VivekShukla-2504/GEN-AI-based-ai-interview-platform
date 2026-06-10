# AI Interview Platform - Backend API 

This is the server-side repository for the AI Interview Platform. It is built using **Node.js, Express.js, and MongoDB**, following the **MVC (Model-View-Controller)** architectural pattern to deliver secure, scalable, and robust REST APIs coupled with Generative AI integration.

---

##  Tech Stack & Dependencies

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Database Object Modeling:** Mongoose / MongoDB Atlas
* **Security & Auth:** JSON Web Tokens (JWT), bcryptjs (password hashing), Cookie-parser
* **AI Core Integration:** Generative AI SDK / Axios

---

##  Architectural Layout (Within `src/`)

The backend code is cleanly modularized into layers separating routing, business logic, and database interactions:

```text
src/
├── config/          # Database configuration and AI client initializers
│   └── database.js  # Mongoose connection setup to MongoDB Atlas
├── controllers/     # Core controller handlers (processes requests & builds responses)
│   ├── auth.controller.js       # Register, Login, and Logout logic
│   └── interview.controller.js  # Interview routing and evaluation flows
├── middlewares/     # Intercepting validation layers
│   ├── auth.middleware.js       # JWT extraction and validation guards
│   └── file.middleware.js       # Handles incoming multi-part data or file chunks
├── models/          # Mongoose schemas representing database collections
│   ├── blacklist.model.js       # Stores expired JWTs for secure user logouts
│   ├── interviewReport.model.js # Evaluated interview metrics and feedback
│   └── user.model.js            # User profiles and password structures
├── routes/          # Express route endpoints binding urls to controllers
│   ├── auth.routes.js           # Public and protected user identity actions
│   └── interview.routes.js      # Actions pushing the interview state machine forward
├── services/        # Third-party utilities insulated from server layer
│   └── ai.service.js            # Direct payload handlers to the Gen-AI system
└── app.js           # Configures global Express application pipelines & Cors