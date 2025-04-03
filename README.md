# Competitive Contest Tracker

A **MERN Stack Contest Tracker** that fetches upcoming and past contests from **Codeforces, CodeChef, and LeetCode** using the Clist API. Users can bookmark contests, upload solution links, and filter contests by platform. The application features a responsive UI with light/dark mode support.

## Features
- **Upcoming & past contests** from Codeforces, CodeChef, and LeetCode.
- **Multi-platform filter** to select contests from one or more platforms.
- **Bookmarking feature** for contests.
- **Solution link upload** for past contests (e.g., YouTube solutions).
- **Mobile & tablet responsive UI with light/dark mode toggle.**
- **Well-documented code and basic product documentation.**
- **Submission via GitHub and video demo.**

## Tech Stack
- **Frontend:** React, CSS Modules / Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **API Integration:** Codeforces, CodeChef, LeetCode via Clist API
- **Deployment:** Docker, Kubernetes
- **Caching:** Redis

## API Endpoints Used
- **LeetCode Contests:** `https://competeapi.vercel.app/contests/leetcode/`
- **CodeChef Contests:** `https://competeapi.vercel.app/contests/codechef/`
- **Codeforces Contests:** Custom API implementation

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/contest-tracker.git
   cd contest-tracker
   ```
2. Install dependencies for both frontend & backend:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   ```
4. Start the development servers:
   ```sh
   cd server
   npm run dev
   cd ../client
   npm run dev
   ```

## Contribution
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For queries or contributions, contact **Tanisha Borana**.

