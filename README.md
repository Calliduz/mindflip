# MindFlip

MindFlip is an engaging memory-matching game built with the MERN stack (MongoDB, Express, React, Node.js). It features various themes, varying difficulty levels, and a premium subscription model to unlock exclusive content.

## Features

- **Memory Matching Gameplay**: Classic card matching mechanics.
- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes.
- **Themed Card Decks**:
    - **Classic**: Standard card designs.
    - **Animals**: Cute animal illustrations.
    - **Food**: Delicious food items.
    - **Anime** (Premium): Anime-style characters.
    - **Tech** (Premium): Technology-themed icons.
- **Premium Subscription**: Unlock exclusive themes via payment integration.
- **User Authentication**: Secure signup and login for saving progress and premium status.
- **Responsive Design**: Playable on desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: PayMongo (migrated from Stripe)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mindflip
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and configure necessary environment variables (API URLs, Database URI, etc.).

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or your configured port).
