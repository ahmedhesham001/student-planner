# 🎮 GameRadar - Logic-based Recommendation System

A smart, interactive game recommendation engine that uses **Prolog** for logic and rule-based filtering, connected to a modern web frontend.

## 📂 Project Structure (Monorepo)
To keep our code clean and prevent conflicts, the project is strictly divided into four main directories:

* **`/client`**: The Frontend application (React). Contains all UI components, state management, and API calls.
* **`/server`**: The Backend API bridge (Node.js/Python). Handles requests from the client, translates them to Prolog queries, and returns the response.
* **`/logic`**: The Prolog Engine. Contains `facts.pl` (our game database) and `rules.pl` (the recommendation logic).
* **`/docs`**: Project documentation, including UML Diagrams, Excel sheets for data collection, and initial designs.

## 🚀 Workflow Guidelines
1.  **Do not cross folders:** If your task is Frontend, stay in `/client`. Do not modify `/logic` unless paired with the Logic team.
2.  **UML & Data:** All non-code files MUST go into the `/docs` folder.
3.  **Testing:** Make sure your component/logic works locally before pushing to the main branch.

## 🛠️ Tech Stack
* **Frontend**: React (or React Native)
* **Backend Bridge**: Node.js / Python
* **Logic Engine**: SWI-Prolog