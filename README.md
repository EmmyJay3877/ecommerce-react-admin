
# Ecommerce Admin Panel using React

Welcome to the Ecommerce Admin Panel repository! This project provides an intuitive and efficient web interface for managing the Ecommerce platform's administrative tasks. Built with React, React Router, Socket.IO Client, Context API, and styled with Tailwind CSS, this admin panel application offers seamless navigation, real-time updates, and a visually appealing UI for overseeing products, customers, orders, and more. This README will guide you through setting up and running the admin panel application.


## Features

- Manage products, customers, and orders.
- View detailed product information and edit product details.
- Process and update order status.
- Real-time updates and notifications using Socket.IO.
- User-friendly and responsive UI with - Tailwind CSS styling.
- Manage customer information
- Admin authentication and authorization
- Password reset and update option
## Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js (>= 12.0)
- npm or yarn package manager
## Tech Stack

**Client:** React, TailwindCSS

**Websocket:** Socket.IO Client


## Installation

Clone the repository

```bash
git clone https://github.com/EmmyJay3877/ecommerce-react-admin.git
```
    
Install the required packages using npm or yarn:

```bash
npm install
# or
yarn install

```
## Configuration

Set up environment variables:

Create a .env file in the root directory and add the following:

```bash
ESLINT_NO_DEV_ERROS=true

REACT_APP_HOST=http://localhost:3000

REACT_APP_SERVER=http://localhost:8000

REACT_APP_SOCKET_SERVER=ws://localhost:8000
```
## Usage/Examples

1. Admin must have registered using the FastAPI swagger interface

2. Run the admin panel:

```bash
npm start
# or
yarn start
```

The admin panel will be accessible at http://localhost:3000

3. Open your browser and navigate to http://localhost:3000 to interact with the admin panel.

4. A Screenshot of the Admin panel.
![Screenshot of Admin Panel](https://res.cloudinary.com/ds3j3naem/image/upload/v1692098934/Screenshot_2023-08-15_122811_tcln6h.png)





## Contributing

Contributions are always welcome!

If you find any bugs or want to add new features, feel free to submit a pull request.


## License

[MIT](https://choosealicense.com/licenses/mit/)

