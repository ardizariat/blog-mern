const router = require('express').Router()
const {
  index,
  store,
  show,
  update,
  destroy,
} = require('../app/controllers/postController')
const { protect } = require('../app/middleware/authMiddleware')

router.get('/', index).post('/', protect, store)
router
  .get('/:postId', show)
  .put('/:postId', protect, update)
  .delete('/:postId', protect, destroy)

module.exports = router
