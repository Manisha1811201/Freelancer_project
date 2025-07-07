const router=require("express").Router();

const postController=require("../Server/Post/postController");
const projectController=require("../Server/Project/projectController");
const techController=require("../Server/Technology/techController");
const viewController=require("../Server/Review/reviewController");

router.post("/post/add",postController.add)
router.post("/post/getall",postController.getall)
router.post("/post/getsingle",postController.getsingleData)

router.post("/project/add",projectController.add)
router.post("/project/getall",projectController.getall)
router.post("/project/getsingle",projectController.getsingleData)

router.post("/tech/add",techController.add)
router.post("/tech/getall",techController.getall)
router.post("/tech/getsingle",techController.getsingleData)

router.post("/view/add",viewController.add)
router.post("/view/getall",viewController.getall)
router.post("/view/getsingle",viewController.getsingleData)

module.exports=router
