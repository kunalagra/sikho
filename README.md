<h1 align="center">
  <br>
  <a href="https://sikhoapp.vercel.app/"><img src="https://raw.githubusercontent.com/kunalagra/sikho/main/public/assets/logo/Logo-1.svg" alt="Sikho" width="200"></a>
  <br>
  Sikho
  <br>
</h1>

<h4 align="center">A Personalized Pofessional Skill Development Platform.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/kunalagra/sikho/main/public/assets/screenshot.png)

## Key Features

* 2 types of User - Student & Instructor
* User Features
  - Enroll in plans
  - Submit Assignments
  - User profile view and updates
  - Join lectures
* Instructor Features
  - Add Plans
  - Create Assignments
  - Grade Assignments
  - Create Schedules for Meetings
* Next-Auth for Authentication
* Calendar Support (requires more work)
* Stripe Checkout for Pyaments 
* SocketIO & Jitsi integrated on one page for Live Coding Classes

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/kunalagra/sikho

# Go into the repository
$ cd sikho

# Rename .env.example to .env
$ mv .env.example .env

# Install dependencies
$ npm install --legacy-peer-deps

# Run the app
$ npm run dev
```
> [!IMPORTANT]  
> Populate your .env keys with their respective values. 

> [!NOTE]
> The `--legacy-peer-deps` flag is required for Next.js 16 as next-auth@4.24.11 doesn't officially support Next.js 16 yet. It works fine with the flag. 

> [!NOTE]
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following packages:

- [Node.js](https://nodejs.org/)
- [Next.JS](https://github.com/vercel/next.js/)
- [MongoDB](https://www.mongodb.com/)
- [Jitsi](https://github.com/jitsi/jitsi)
- [Adminmart Template](https://adminmart.com/product/si-educational-next-js/)

Built at Hacksparrow


## You may also like...

- [MediCall](https://github.com/kunalagra/MediCall) - An AIO Medical platform to connect doctors and patients
- [Codegamy](https://github.com/kunalagra/codegamy) - A LeetCode clone

## License

AGPL-3
