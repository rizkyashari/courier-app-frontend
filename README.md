# final-project-frontend

This is a frontend repository for final project of Courier App using React.
The app has been deployed on Vercel, here is the link:
https://courier-app-frontend-rizkyashari.vercel.app/

## Problem Description

### Admin Story:

- Auth & Profile Management:

  - [✓] Admin can login and logout.
  - [✓] On this page, users can edit email addresses, long names, phone numbers, and add profile photos.
  - [✓] Profile photos can be saved in the database as BLOBs.

- View Addresses List

  - [✓] View a list of addresses.

- Manage Shippings:

  - [✓] View a list of shippings. Can be sorted by size, category, payment and status.
  - [✓] If the user clicks on a shipping, the user can see detailed information about that shipping. Users can also see a review of the shipping if any.
  - [1/2] View earnings reports by month.
  - [✓] Update shipping status.

- Manage Promos:

  - [✓] View the list of promos.
  - [✓] Can be sorted by quota and expiration date.
  - [✓] Doing an update on a promo.

- Additionals:
  - [1/2] Add search and pagination for possible pages.

### User Story:

- Auth & Profile Management:

  - [✓] User can login and logout.
  - [✓] Profile page. On this page, users can edit email addresses, long names, phone numbers, and add profile photos. Profile photos can be saved in the database as BLOBs. On this page users can also see a referral code that can be shared with other potential users.
  - [✓] The registration page will have input for: Email, Passwords, Full names, Phone number, and Referral codes.

- Referral Systems:

  - [1/2] A new user who registers using a referral code will get an additional balance of Rp. 50,000 after completing the cumulative transaction amounting to Rp. 350,000.
  - [0] Existing users whose referral code is used are entitled to an additional balance of Rp. 25,000 when a new user has completed a cumulative transaction of Rp. 500,000.

- Create Shipping:

  - [✓] User can choose a size.
  - [✓] User can choose a category.
  - [1/2] Choose an add-on (can be more than one, but 1 type of add-on can only be selected once).
  - [✓] Choose a shipping address.

- Shippings List:

  - [✓] User can view a list of shipping that has been created by the user, including the status of each shipping.
  - [✓] When the user clicks on a shipping, the user can view the shipping details and make a payment.
  - [✓] When the user clicks on a shipping that already has the status done, the user can leave a comment in the form of text. These comments are used as service satisfaction feedback.

- Create Address:

  - [✓] This page is used to enter a new shipping address. This address can later be used on the create shipping page.

- Address List:

  - [✓] This page will display a list of addresses that have been created by the user.

- Edit addresses:

  - [✓] This page is used to edit the address that has been saved by the user.

- Payments:

  - [✓] On this page, users can make payments for a shipping. Users can also choose which promotions to use (if available).

- Top Up:

  - [✓] On this page, users can make payments for a shipping. Users can also choose which promotions to use (if available).

- Games:

  - [1/2] For every shipment that is done, the user has one chance to play the gacha game. The prizes that users might get are 40% discount vouchers (min. spending Rp. 20,000, max. Rp. 20,000), 60% discount vouchers (min. spending Rp. 20,000, max. Rp. 20,000), 80% discount vouchers (min. spending IDR 20,000, max IDR 20,000).

- Additional:
  - [✓] Add search and pagination for possible pages.

## Technical Requirement

- [✓] In this project, create two clients using React.role user and the second client is intended for users with the admin.
- [✓] Make sure every page move is reactive, i.e. it doesn't require a website refresh to update the display.
- [✓] Using React JS (with Typescript)
- [✓] In this project, You may separate the client for the users and the admin. The first client is intended for users with the User role and the second client is intended for users with the Admin role. You may also implement them in one client.
- [✓] Use state management like Redux, Zustand or Redux toolkit for both user and admin site
- [✓] Using other than plain CSS to style components (SCSS, styled-components)
- [✓] Slicing templates into components. Make at least 5 reusable components
- [✓] Frontend communicates with Backend via REST API
- [✓] Provide authentication features for pages based on logged in user
- [1/2] Must be Mobile Responsive
- [0] Do deployment for web application

## Run Application

- Application

  - Start Application :
    > `npm start`

# More action with Create React App

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
