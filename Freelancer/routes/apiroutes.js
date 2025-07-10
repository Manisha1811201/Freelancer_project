const router=require("express").Router();

//import all controller files
const postController=require("../Server/Post/postController");
const projectController=require("../Server/Project/projectController");
const techController=require("../Server/Technology/techController");
const viewController=require("../Server/Review/reviewController");
const customerController=require("../Server/Customer/customerController");
const userController=require("../Server/User/userController");

//postcontroller routing
router.post("/post/add",postController.add)
router.post("/post/getall",postController.getall)
router.post("/post/getsingle",postController.getsingleData)
router.post("/post/delete",postController.deleteData)
router.post("/post/update",postController.updateData)

//projectcontroller routing
router.post("/project/add",projectController.add)
router.post("/project/getall",projectController.getall)
router.post("/project/getsingle",projectController.getsingleData)
router.post("/project/delete",projectController.deleteData)
router.post("/project/update",projectController.updateData)

//techcontroller routing
router.post("/tech/add",techController.add)
router.post("/tech/getall",techController.getall)
router.post("/tech/getsingle",techController.getsingleData)
router.post("/tech/delete",techController.deleteData)
router.post("/tech/update",techController.updateData)

//viewcontroller routing
router.post("/view/add",viewController.add)
router.post("/view/getall",viewController.getall)
router.post("/view/getsingle",viewController.getsingleData)
router.post("/view/delete",viewController.deleteData)
router.post("/view/update",viewController.updateData)

//customercontroller routing
router.post("/customer/register",customerController.register)
router.post("/cust/getall",customerController.getall)
router.post("/cust/getsingle",customerController.getsingleData)
router.post("/cust/update",customerController.updateData)

//userController routing
router.post("/user/login",userController.login)

module.exports=router
