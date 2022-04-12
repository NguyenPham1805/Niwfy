import { Router } from 'express'
import Controller from './controller'

const router = Router()

router.get('/slide', Controller.getSlide)
router.get('/home', Controller.getHome)
router.get('/comic/:slug', Controller.getInfo)
router.get('/genre/:slug', Controller.getGenre)
router.get('/rank', Controller.getRank)
router.get('/search', Controller.getSearch)
router.get('/chapter/:id/:slug/:chap/:hash', Controller.getChapter)
router.get('/image', Controller.getImage)

export default router
