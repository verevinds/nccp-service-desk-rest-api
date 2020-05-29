module.exports = (req, res, next) => {
  console.log(req.files);
  if (req.files) {
    console.log(req.files);
    let file = req.files.file;
    let uuid = Math.random(4000);
    let filename = file.name;
    let name = `${uuid}.${filename}`;

    file.mv(`./upload/${name}`, (err) => {
      if (err) {
        console.log(err);
        res.send('error occured');
      } else {
        console.log('ok');

        res.send({
          message: `Файл ${filename} успешно загружен`,
          url: `http://192.168.213.77/restapi/upload/${name}`,
          filename,
          wasFile: true,
        });
      }
    });
  } else {
    res.send({
      message: `Файл отсутствует`,
      wasFile: false,
    });
  }
};
