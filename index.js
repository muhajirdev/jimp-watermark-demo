var Jimp = require("jimp");

const main = async () => {
  const [image, logo] = await Promise.all([
    Jimp.read(
      "http://www.defence.gov.au/ADFA/Images/news_events/whiteRibbon.jpg"
    ),
    Jimp.read(
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Australian_Defence_Force_Academy_coat_of_arms.svg/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png"
    )
  ]);

  const marginPercentage = 5;

  logo.resize(image.bitmap.width / 10, Jimp.AUTO)

  const X =
    image.bitmap.width -
    logo.bitmap.width -
    (image.bitmap.width * marginPercentage) / 100;
  const Y =
    image.bitmap.height -
    logo.bitmap.height -
    (image.bitmap.width * marginPercentage) / 100;

  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 0.1,
      opacityDest: 1
    }
  ]);
};

main().then(image => image.write("test.jpg"));
