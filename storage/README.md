# Storage Component

A customizable and interactive storage visualization component built with React.

## Purpose

This project was created for learning purposes. It serves as a practical exercise in React component development, state management, and interactive UI design. By building this component, developers can gain hands-on experience with:

- Creating complex, interactive React components
- Managing component state and props
- Implementing dynamic styling
- Handling user interactions
- Structuring and organizing component code

Feel free to explore, modify, and learn from this project!

## Screenshots

<<<<<<< HEAD
=======
<img src="https://github.com/user-attachments/assets/1bc66507-bbb7-43e8-9e74-6a2e3c753ac4" alt="Screenshot 2024-10-05 225149" width="300"/>
<img src="https://github.com/user-attachments/assets/ac6530be-25a3-4349-b08d-ad0354ab0cad" alt="Screenshot 2024-10-05 225217" width="300"/>
<img src="https://github.com/user-attachments/assets/6836a7c9-2577-466d-8b22-b93724720cb6" alt="Screenshot 2024-10-05 225241" width="300"/>
<img src="https://github.com/user-attachments/assets/b84702de-da32-4460-bf25-f7b8ba1968a7" alt="Screenshot 2024-10-05 225255" width="300"/>
<img src="https://github.com/user-attachments/assets/51856b05-9cb5-48d6-9536-8829d38b6538" alt="Screenshot 2024-10-05 225321" width="300"/>

>>>>>>> 333bd5aa165d5a168cab52dcd296427294e972d6

## Features

- Dynamic visualization of storage items and sub-items
- Interactive cards with smooth animations
- Responsive design
- Customizable colors and styles

## Installation

1. Clone this repository or copy the `Storage` component files into your React project.
2. Install the required dependencies:

```bash
npm install react sass
```

3. Import the component in your desired location:

```javascript
import Storage from './path/to/Storage';
```

## Usage

Simply include the `Storage` component in your React application:

```jsx
function App() {
  return (
    <div className="App">
      <Storage />
    </div>
  );
}
```

## Customization

You can customize the component by modifying the `itemsArray` in the `Storage.js` file. Each item in the array represents a category with its sub-items.

```javascript
const itemsArray = [
  {
    id: 1,
    value: 1,
    name: "Category Name",
    subItems: [
      { id: 1, name: "Sub-item 1", value: 1, color: '#HEXCOLOR' },
      // Add more sub-items as needed
    ],
    color: '#HEXCOLOR'
  },
  // Add more categories as needed
];
```

## Styling

The component uses SCSS for styling. You can modify the `Storage.scss` file to change the appearance of the component.

## Learning Objectives

By working with this component, you can learn about:

1. React component lifecycle and hooks
2. State management in complex components
3. Dynamic styling techniques in React
4. Implementing interactive UI elements
5. Working with arrays and objects in React
6. CSS animations and transitions
7. Responsive design principles

## Dependencies

- React
- SCSS

## Contributing

This project is primarily for learning purposes, but feel free to submit issues and pull requests if you have suggestions for improvements or additional learning aspects.

## License

This project is open source and available under the [MIT License](LICENSE).
