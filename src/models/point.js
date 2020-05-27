export default class Point {
  constructor(point) {
    this.id = point[`id`];
    this.type = point[`type`];
    this.place = point[`destination`][`name`];
    this.offers = point[`offers`];
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
