# Performance Evaluation Portal-fe

Performance Evaluation Portal-fe is functional in Node-js, React-JS with the BRD requirements of Performance Evaluation Portal-fe.

- Solutions that let the employees evaluate their own performance.

- Solutions that let the management evaluate the performance of employees.

- Developed for Web Application (React platform).

## Tech Stack

Node.js - Node.js is a server-side platform built on Google Chrome's JavaScript Engine (V8 Engine).
React JS - React is an open-source, JavaScript library for building user interfaces.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Folder Structure

```
├── App.css
├── App.js
├── App.test.js
├── components
│ ├── 403-page
│ │ ├── 403Page.js
│ │ └── 403Page.scss
│ ├── 404-page
│ │ ├── 404Page.js
│ │ └── 404Page.scss
│ ├── empty-page
│ │ ├── emptyPage.js
│ │ └── emptyPage.scss
│ ├── google-login
│ │ ├── googleLoginButton.js
│ │ └── googleLoginButton.scss
│ ├── header
│ │ ├── header.js
│ │ └── header.scss
│ ├── loader-page
│ │ ├── loaderPage.js
│ │ └── loaderPage.scss
│ └── side-bar
│ ├── sideBar.js
│ └── sideBar.scss
├── containers
│ ├── analytics
│ │ ├── analytics.js
│ │ └── analytics.scss
│ ├── assessment-intermediate
│ │ └── assessmentIntermediate.js
│ ├── dashboard
│ │ ├── dashboard.js
│ │ └── dashboard.scss
│ ├── login
│ │ ├── login.js
│ │ └── login.scss
│ ├── management-intermediate
│ │ └── managementIntermediate.js
│ ├── past-evaluation
│ │ ├── pastEvaluation.js
│ │ └── pastEvaluation.scss
│ ├── past-score-sheet
│ │ ├── pastScoreSheet.js
│ │ └── pastScoreSheet.scss
│ ├── past-self-assessment
│ │ ├── pastSelfAssessment.js
│ │ └── pastSelfAssessment.scss
│ ├── performance-evaluation
│ │ ├── performanceEvaluation.js
│ │ └── performanceEvaluation.scss
│ ├── profile
│ │ ├── profile.js
│ │ └── profile.scss
│ ├── report
│ │ ├── report.js
│ │ └── report.scss
│ ├── reportee-forms
│ │ ├── reporteeForms.js
│ │ └── reporteeForms.scss
│ ├── reportee-management
│ │ ├── reporteeManagement.js
│ │ └── reporteeManagement.scss
│ ├── score-sheet
│ │ ├── scoreSheet.js
│ │ └── scoreSheet.scss
│ ├── self-assessment
│ │ ├── selfAssessment.js
│ │ └── selfAssessment.scss
│ └── settings
│ ├── settings.js
│ └── settings.scss
├── globals
│ ├── config
│ │ └── urlMappings.js
│ └── services
│ └── axiosInterceptor.js
├── images
│ ├── 403.png
│ ├── google.png
│ ├── loginVector.jpg
│ ├── nineleapsLogo.png
│ ├── noDataFound.png
│ ├── performanceEvaluation.jpg
│ ├── quarters.jpg
│ └── reporteeManagement.jpg
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── routers
│ ├── mainRouter.js
│ └── protectedRoute.js
└── setupTests.js
```
