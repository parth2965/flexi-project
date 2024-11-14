Groceria
A web-based grocery delivery application that allows users to order groceries online. The app provides an easy-to-use interface for browsing items, adding them to the cart, and checking out. Built with Node.js, Express, MongoDB, and JavaScript.
Table of Contents
•	Features
•	Installation
•	Usage
•	Contributing
•	Acknowledgments
Features
•	User registration and login system.
•	Browse, search, and filter groceries.
•	Add groceries to a cart and proceed to checkout.
•	Track order status and delivery.
•	Admin panel for managing products, orders, and users.
Installation
1.	Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/grocery-delivery.git
2.	Navigate to the project directory:
bash
Copy code
cd grocery-delivery
3.	Install dependencies:
bash
Copy code
npm install
4.	Configure environment variables:
o	Create a .env file in the root directory and add the following (replace with your actual MongoDB URI and any other secrets you need):
makefile
Copy code
MONGODB_URI=mongodb://localhost:27017/grocery
PORT=3000
JWT_SECRET=your_secret_key
5.	Run the MongoDB server:
o	If you’re using a local MongoDB instance, start it with:
bash
Copy code
mongod
6.	Start the application:
bash
Copy code
npm start
7.	Access the app at http://localhost:3000.
Usage
1.	User Registration:
o	Go to the sign-up page to create an account.
2.	Browse and Add Groceries:
o	Log in to browse grocery items, search for specific products, and add them to your cart.
3.	Checkout:
o	Go to your cart, review items, and proceed to checkout to place order.
