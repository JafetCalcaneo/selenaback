import { Request, response, Response, Router } from "express";
import connection from "../db/connection";
import { Nail } from "@/models/nail.model";
import multer from "multer";
import path from "path";
import { CatNail } from "@/models/CatNail.model";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "..", "..", "/public/images/nails"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.single("image"),
  async (req: Request, res: Response) => {
    // console.log('REQUEST\n: =====>>', req);
    try {
      const { name, description, price, nailType } = req.body;
      const imageFile = req.file;
      const imagePath = `/public/images/nails/${imageFile?.filename}`;
      // console.log(req.file?.filename)
      const savedNail = await Nail.create({
        title: name,
        description,
        price: Number(price),
        nailType,
        image: imagePath,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.json({ savedNail });
    } catch (error: any) {
      console.log(error);
      res.json({ message: "Error al guardar", error }).status(500);
    }
  }
);

router.get('/all/nails', async (req: Request, res: Response) => {
  try {
    const nails = await Nail.findAll();
    // console.log(nails)
    res.json( nails );
  } catch(error: any) {
    console.error(error)
    res.json({ message: 'error al traer los datos'}).status(500);
  }
});

router.post("/create/type", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const savedType = await CatNail.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.json( savedType ).status(200);

  } catch (error: any) {
    console.log(error);
    res.json({ message: "Error al guardar" }).status(500);
  }
});

router.get("/all/types", async (req: Request, res: Response) => {
  try {
    const types = await CatNail.findAll()
    res.status(200).json( { types } );

  }catch (error: any) {
    console.error(error);
  }
});


router.post('/all/category', async (req: Request, res: Response) => {
  // console.log(req.body)
    try {
      const nails = await Nail.findAll({
        where: {
          nailType: Number(req.body.id)
        },
        include: {
          model: CatNail,
          as: 'category',
          attributes: ['name']
        }
      })
      res.json(nails);
    } catch(error: any) {
      console.error(error);
      res.status(500);
    }
});


router.get('/nail/:id', async (req: Request, res: Response) => {
  console.log('ENTRA')
  try {
    const { id } = req.params;
    console.log(id)
    const foundNail = await Nail.findOne({
      where: {
        id: Number(id)
      },
      include: {
        model: CatNail,
        as: 'category',
        attributes: ['name']
      }
    });
    console.log(foundNail)
    if(foundNail) {
      res.json(foundNail).status(200);
    } else {
      res.status(204);
    }
  } catch(error: any) {
    console.error(error);
    res.status(500);
  }
});

// router.get('/type/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//   }
// })



export default router;
