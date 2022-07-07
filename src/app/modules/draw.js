import htmlImgSrc from '../assets/img/1.jpg'
import cssImgSrc from '../assets/img/2.jpg'
import jsImgSrc from '../assets/img/3.jpg'

export default class Draw {
  constructor() {
    this.options = [htmlImgSrc, cssImgSrc, jsImgSrc];
    let _result = this.getImages();
    this.getResult = () => _result;
  }

  getImages() {

    let images = [];

    for (let i = 0; i < this.options.length; i++ ) {

      const index = Math.floor(Math.random() * this.options.length);
      images.push(this.options[index])
    }

    return images;
    
  }
}

