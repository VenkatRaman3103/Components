# Storage Component

A customizable and interactive storage visualization component built with React.

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

## Dependencies

- React
- SCSS

## Contributing

Feel free to submit issues and pull requests to improve this component.

## License

This project is open source and available under the [MIT License](LICENSE).