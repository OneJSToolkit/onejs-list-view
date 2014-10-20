/** Defines a threshold and a DOM class to be applied when the 
  * assigned element is occupying an area of the given widths
  */
class Threshold {
    minimum: number;
    maximum: number;
    name: string;

    constructor(minimum: number, maximum: number, name: string) {
	this.minimum = minimum;
	this.maximum = maximum;
	this.name = name;
    }
}

export = Threshold;