import { Response, Router } from 'express'
import Controller from './controller'

const router = Router()

router.get('/slide', Controller.getSlide)
router.get('/home', Controller.getHome)
router.get('/comic/:slug', Controller.getInfo)
router.get('/genre/:slug', Controller.getGenre)
router.get('/rank', Controller.getRank)
router.get('/finish', Controller.getFinish)
router.get('/search', Controller.getSearch)
router.get('/chapter/:id/:slug/:chap/:hash', Controller.getChapter)
router.get('/chapter-link/:id', Controller.getChapLinks)
router.get('/image', Controller.getImage)
router.get('*', (_, res: Response) => {
  res.json({ success: false, error: 'not found' })
})

export default router
