# Final Project and Deployment

## Objectives
Build a fully functional web application.
Apply HTML, CSS, and JavaScript concepts learned.
Deploy the project using GitHub Pages, Netlify, or Vercel.

## Instructions
Choose one of the following project ideas:
Blog Website: Implement a multi-page site with navigation.
Ecommerce Website: Implement a multi-page site with navigation.

>[!NOTE]
> - Include at least:
> - A responsive design.
> - JavaScript interactivity.
> - A deployment link.

## Tasks

Create a well-structured HTML5 document.
Use at least 5 different HTML elements.
Ensure semantic correctness.

Good luck and happy coding! 🚀💻

# eShop E-Commerce Website Documentation

## Live Demo:

https://plp-webtechnologies.github.io/feb-2025-final-project-and-deployment-kipngetich-lab/

## Project  Overview
eShop is a simple yet functional e-commerce website designed to showcase products and facilitate user interactions like adding items to a cart, removing items, and submitting inquiries through a contact form. The website demonstrates fundamental concepts of HTML5, CSS3, and JavaScript, including responsive design practices

## Features
- *Multi-Page Navigation:* Users can navigate seamlessly among Home, About, Products, and Contact pages.
- *Product Showcase:* Each product is displayed with an image, name, description, and price.
- *Cart Functionality:*
    - Add or remove items from a shopping cart.
    - Update product quantities in the cart.
    - Persistent cart storage with localStorage.
- *Responsive Layout:* The site is responsive and adapts to different screen sizes.
- *Mobile Navigation:* Hamburger menu for mobile view.
- *Contact Form:* Users can fill out a contact form; form validation feedback is provided upon submission

## Technology Stack
- *HTML5:* For semantic structure and content layout.
- *CSS3:* For styling and layout design.
- *JavaScript:* For interactivity and dynamic functionality.
- *LocalStorage:* For storing cart data persistently in the browser.

## Installation Guide
1. Clone the Repository:
    >git clone https://github.com/PLP-WebTechnologies/feb-2025-final-project-and-deployment-kipngetich-lab.git
2. Navigate to Project Directory
    >cd feb-2025-final-project-and-deployment-kipngetich-lab.git
3. Open the Project: Open any of the HTML files (e.g., index.html) in your web browser.

## Usage Instructions
- *Navigating the Website:* Click on the navigation links to move between different pages.
- *Shopping Experience:*
    - On the Products page, select a product and click "Add to Cart".
    - View items in the cart and update quantities or remove products.
- *Contact Us:* Fill out the form in the Contact page and submit your message.

## Functionality Overview
## JavaScript Functions
- *Mobile Navigation Toggle*
- Toggles visibility of navigation links for mobile users when the hamburger icon is clicked.

    >function toggleMobileMenu() {
        >navLinks.classList.toggle('active');
    >}
  
 - *Add product to cart*
    >function addToCart(e) {
        >const productId = parseInt(e.target.getAttribute('data-id'));
        >const product = products.find(p => p.id === productId);
      >//rest of the logic
    >}
   
 - *Update cart count display*
    >function updateCartCount() {
        >if (cartCount) {
    >//rest of the logic
    >}
   
## Responsive Design
The website is designed to be fully responsive, using CSS media queries to adapt the layout for mobile and tablet screens. Important elements such as the navigation and product display adjust depending on the screen size, ensuring a user-friendly experience.

## Future Enhancements
- *Backend Integration:* Implement a backend service for real product management, order processing, and user accounts.
- *Improved UI/UX Design:* Enhance the user interface with better visuals using more advanced CSS techniques and frameworks (like Bootstrap).
- *Payment Integration:* Add payment processing features for online transactions.
- *Search Functionality:* Include a search bar for easier navigation through products.

## Conclusion
eShop serves as a foundational project demonstrating core concepts in web development, focusing on e-commerce functionality, responsive design, and local storage management. Further enhancements and features can take the user experience to the next level as the project evolves.

## License
This project is open-source and can be used, modified, and distributed freely.