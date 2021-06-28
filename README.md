# Visit the e-commerce site [here](https://main.d5qpnpxcitkvx.amplifyapp.com/)

## Problem and Solution

**Basic e-commerce flow:**
This e-commerce flow is implemented by splitting the architecture between a React client application and a Django REST(ish) API.

The React client was created from the boilerplate [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) and then customized with the components found in `/frontend/src/components`

The Django API contains models to track product and cart data. The API uses json web tokens
for authentication to allow for a stateless API. Any React client can communicate with the
server so long as it passes in a well-formed authentication header (see `/frontend/src/Requests.js` for examples)

## Deployment

The Django API is live at [codechallenge.net](https://codechallenge.net/api/products)
It is hosted via AWS Elastic Beanstalk and has HTTPS configured with Route53 and Amazon Certificate Manager.

The React frontend is live at [here](https://main.d5qpnpxcitkvx.amplifyapp.com/)
It is hosted via AWS Amplify

## Local Development

### Django

1. `cd backend/shopfront` to get to the django base project
2. Activate your virtual environment
3. `pip install -r requirements.txt` to install dependencies
4. `python manage.py runserver` to start the server on `localhost:8000`
5. You may be prompted that you have unapplied migrations. If so you can run `python manage.py makemigrations && python manage.py migrate`
6. After running the server, visit `localhost:8000/api/products` to see if the app is up and running

### React

1. `cd frontend` to get to the React project
2. `npm install` to install dependencies
3. `npm run start` to run the client on localhost:3000

## Technical/Architectural Choices

### Database Schema

I get away with only two tables in this project because it is extremely feature-light. To allow for more functionality (item returns, sales analytics, etc.) there would need to be a table that contains a row for each product that has a unique id that can be associated with sales. Currently, the product.quantity field can be modified to handle purchases, but I think a better approach would be to have a product_items table to track each individual product sold.

### Bootstrap

I use bootstrap for the frontend only because it makes prototyping very quick. In a larger project I would use more custom css with the styled-components npm package.

### Deployment

I investigated several deployment options including [pythonanywhere](https://www.pythonanywhere.com/) for django and [Nextjs/Vercel](https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=next-website) for react. Ultimately I decided on AWS because their services work well with each other (Route53 -> Amazon Credential Manager -> Elastic Beanstalk for https)

## Post MVP (what I learned)

### Form Validation and Errors

Just a couple of custom forms in React can get unwieldy. Post-MVP I would include a react form builder like [Formik](https://formik.org/) to streamline and cleanup forms and form errors.

### Normalize REST routes and responses

A side effect of prototyping the frontend and backend at the same time is that I didn't stick to good naming conventions for the API routes or their responses. I would normalize the routes to adhere to RESTful conventions and standardize the responses on success and error.
