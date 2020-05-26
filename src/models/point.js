export default class Point {
  constructor(point) {
    this.id = point[`id`];
    this.type = point[`type`];
    this.place = point[`destination`][`name`];
    this.offers = point.offers.map((offer) => {
      const titleWords = offer[`title`].split(` `);
      offer.name = titleWords[titleWords.length - 1].toLowerCase();
      offer.text = offer[`title`];
      offer.active = Math.random() > 0.5;

      return offer;
    });
    this.startTime = new Date(point[`date_from`]);
    this.endTime = new Date(point[`date_to`]);
    this.isFavorite = point[`is_favorite`];
    this.price = point[`base_price`];

  }

  static parsePoint(point) {
    return new Point(point);
  }

  static parsePoints(points) {
    return points.map(Point.parsePoint);
  }
}
