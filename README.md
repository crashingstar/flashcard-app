# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

### SM-2 Algorithm

SM-2 is the algorithm used to calculate the interval between repetitions

![image](interval_formula.png)

I(n) is the interval(in-days) after n-th repetition  
EF - easiness factor (Starts from 2.5)
q = quality of response (0-5)

Initial interval of algorithm is set at 1 day and 6 days. For anki, control over initial interval can be modified

Both ease factor and interval is updated and stored after the card is used each time

| q   | Ease Factor                        |
| --- | ---------------------------------- |
| -   | EF - 0.8 + 0.28q-0.02q<sub>2<sub>  |
| 0   | EF - 0.8                           |
| 1   | EF - 0.8 + 0.28 - 0.02 = EF - 0.54 |
| 2   | EF - 0.8 + 0.56 - 0.08 = EF -0.32  |
| 3   | EF - 0.8 + 0.84 - 0.18 = EF - 0.14 |
| 4   | EF - 0.8 + 1.12-0.32 = EF          |
| 5   | EF - 0.8 + 1.4-0.5 = EF + 0.1      |

ref:  
https://www.supermemo.com/en/archives1990-2015/english/ol/sm2  
https://faqs.ankiweb.net/what-spaced-repetition-algorithm.html

# APIs

API uses form-data for request body.

## User-related

user/{route}

| Type   | Action          | Sub Actions            | route           | request data                                  | Description |
| ------ | --------------- | ---------------------- | --------------- | --------------------------------------------- | ----------- |
| POST   | Create Account  |                        | create_user     | username,hashed_password,email                |             |
| POST   | Login           | 1. Verify Credentials  | login           | username,hashed_password                      |             |
|        |                 | 2. Update last login   |                 |                                               |             |
| POST   | Update password | 1. Verify Credentials  | update_password | username,hashed_password, new_hashed_password |             |
|        |                 | 2. Update new password |                 |                                               |             |
| DELETE | Delete Account  | 1. Verify Credentials  | delete_user     | username, hashed_password                     |             |
|        |                 | 2. Delete account/user |                 |                                               |             |
