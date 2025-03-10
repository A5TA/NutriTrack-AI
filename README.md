# NutriTrack-AI

NutriTrack-AI is a AI-powered mobile app built with [Expo](https://expo.dev) and designed to help users track their macros. The app utilizes a [`AI backend`](https://github.com/A5TA/NutriTrack-AI-Backend) to handle CRUD operations and a [`AI Predictor`](https://github.com/A5TA/NutriTrack-AI-Predictor) to perform image classification for user uploaded meal images.

## Features

### Food Recognition & Tracking 
* AI-powered food recognition to accurately identify and analyze meals from pictures.
* Database of different food macronutrients (proteins, carbohydrates, and fats).
* Allows users to manually input macros of their food if not already stored.
* Allows users to take pictures of food with the built in camera or image upload.

### Health Insights & History
* Visualizes daily, weekly, and monthly nutrition data with daily list or calander.
* Tracks key health macros and showcases the user’s progress toward their health goals.

### Other
* Simple Authentication via username to see personally tracked meals
* User Session handling to remember logged in user and set settings 

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
