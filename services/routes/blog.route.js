const { blogController } = require("../controllers/blog.controller");
const authMiddleware = require("../middleware/auth.middleware");
const isResourceOwner = require("../middleware/resource-owner.middleware.js");
const generateMiddleware = require("../middleware/route.middleware");
const {
  blogSchema,
  publishBlogSchema,
  updateBlogSchema,
} = require("../validation/blog.validation");
const { Router } = require("express");

const blogRouter = Router();

blogRouter.get("/published", blogController.getPublishedBlogs);

blogRouter.get("/published/:blogId", blogController.getPublishedBlogById);

blogRouter.use(authMiddleware);

blogRouter.post(
  "/",
  generateMiddleware(blogSchema),
  blogController.createDraft
);

blogRouter.patch(
  "/publish/:blogId",
  isResourceOwner,
  generateMiddleware(publishBlogSchema), // Middleware for validation
  blogController.publishBlog // Callback function to handle the PATCH request
);

blogRouter.patch(
  "/edit/:blogId",
  isResourceOwner,
  generateMiddleware(updateBlogSchema), // Pass the middleware function returned by generateMiddleware
  blogController.editBlogPost
);

blogRouter.delete("/:blogId", isResourceOwner, blogController.deleteBlogPost);

blogRouter.get("/myblogposts", blogController.getAuthorBlogPosts);

module.exports = blogRouter;
