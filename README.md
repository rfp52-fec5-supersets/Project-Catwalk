# FEC Dogrun
Dogrun is a React-based client-facing retail web portal.

## Contributors
atvo912, mooseygoose, kwakster4, Alex-Garay

## Description
The web portal contains 4 main widgets (Product Overview, Related Products, Questions and Answers, and Ratings and Reviews.). It interacts with the Atelier REST API to obtain the relevant information and load it into our webpage.

Product Overview:
Shows the overview of a specific product. Outlines the styles, sizes, and prices, and features a modal image that can zoom in the image, following the mouse pointer. Also includes a carousel of images for each style. Allows add to cart functionality.

Related Products:
Primarily features a carousel of related product cards, showing the default style in a thumbnail and its price. Allows for comparison of features between current product and related product. Also allows a 'my outfit' functionality, which stores product cards in a bank that the user can refer to, and persists through site changes.

Questions and Answers:
Features questions and answers related to the product. Able to search with keywords. Able to mark answer or question as helpful or report. Able to add an answer to an existing question, or add a new question. Shows images from answers as a thumbnail.

Ratings and Reviews:
Shows reviews and ratings related to product. Able to search reviews with keywords. Able to sort reviews by relevance, helpfulness, and newest. Shows 2 reviews initially, more reviews button renders 2 more reviews, until no more reviews available. Star ratings shows percentages of each star ratings, can filter reviews by ratings. Shows images from reviews as thumbnail. Able to add a review.


## Installation
Create a Github API key and save it to client/src/config.js.
Create a imgur Client ID and save it to client/src/config.imgur.js.
Use the template in client/src/config.example.js for both github and imgur keys.

From the project directory:

```bash
npm install
npm run react-dev
npm run dev-server
```

## Usage
Use the GUI to interact with the shopping portal.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU](https://www.gnu.org/licenses/gpl-3.0.txt)