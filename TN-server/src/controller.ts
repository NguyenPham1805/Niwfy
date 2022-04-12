import { Request, Response } from 'express'
import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import Model from './model'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

class Controller {
  public static getSlide = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const data = await Model.slide()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public static getHome = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const data = await Model.home()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public static getSearch = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = await Model.search(req.query.q as string)
    res.status(200).json(data)
  }

  public static getInfo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = await Model.info(req.params.slug!)
    res.status(200).json(data)
  }

  public static getGenre = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = await Model.genre(req.params.slug!, req.query.page as string)
    res.status(200).json(data)
  }

  public static getRank = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = await Model.rank(
      req.query.type as string,
      req.query.page as string
    )
    res.status(200).json(data)
  }

  public static getChapter = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id, slug, chap, hash } = req.params
    const data = await Model.chapter(id, slug, chap, hash)
    res.status(200).json(data)
  }

  public static getImage = (req: Request, res: Response): void => {
    try {
      if (!req.query.url) {
        res.status(400).send('URL must not be empty')
        return
      }
      const url = (req.query.url as string).startsWith('//')
        ? (req.query.url as string).replace('//', 'http://')
        : (req.query.url as string)
      axios
        .get(url, {
          responseType: 'arraybuffer',
          headers: {
            referer: process.env.WEBSITE_URL!
          }
        })
        .then(({ data, headers: { 'content-type': contentType } }) => {
          res.setHeader('cache-control', 'max-age=99999')
          res.setHeader('content-type', contentType)
          res.send(data)
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export default Controller
