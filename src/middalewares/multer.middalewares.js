import multer from "multer"



// const uploadDir = path.join(__dirname, 'public', 't');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/public/temp`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage }) 

  