## Get Started

1. **Initial Machine Setup**. First time running the starter kit? Then complete the [Initial Machine Setup
2. **Clone the project**. `git clone https://github.com/agentcloudre/CRM.git`.
3. **Run the setup script**. `npm run setup`
4. **Run the example app**. `npm start -s`
5. **Having issues?** See "Having Issues?" below.

## Project Structure 
1. **scene** pages folder (Dashboard, Inbox, ToDoList ...)
2. **components** Common components folder (SideNav, TopNav, Modal ...)
3. **services** Reducers, Actions, Api  : To Be Discussed
4. **src/container.js** Main container component including routes.


## On Deploy
1. **npm run build**
2. Set Nginx/Apache web root to 'dist' folder of the project

Project was created from https://github.com/coryhouse/react-slingshot