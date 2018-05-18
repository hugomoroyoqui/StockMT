class Utils {
  static imgUrl(imageId){
    return "http://res.cloudinary.com/stedcode/image/upload/" + imageId;
  }

  static imgThumb(imageId){
    return "http://res.cloudinary.com/stedcode/image/upload/c_fill,g_auto,h_600,w_600/" + imageId;
  }

  static priceText(priceValue){
    return "$" + parseFloat(priceValue).toFixed(2) + " USD";
  }
}
