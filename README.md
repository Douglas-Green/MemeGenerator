# Random Meme Generator

This is a simple React application that generates random memes. Users can enter text, choose a font style, size, and color, and then generate a meme with their chosen settings.

## Features

- Fetches random meme images from the [Imgflip API](https://api.imgflip.com/)
- Allows users to enter custom text for the top and bottom of the meme
- Allows users to choose a font style, size, and color for the meme text
- Displays the generated meme in a modal

## Known Issues

Currently, there is an issue with the modal not closing when the "Close" button is clicked. The expected behavior is that the modal should close and the form should reappear, allowing the user to generate a new meme. However, clicking the "Close" button does not currently have any effect.

We are actively working on a fix for this issue. If you have any suggestions or would like to contribute, please feel free to open a pull request.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/random-meme-generator.git`
2. Install the dependencies: `npm install`
3. Start the application: `npm start`

## Contributing

Contributions are welcome! Please feel free to open a pull request or report an issue.
