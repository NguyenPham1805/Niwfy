import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import parser from 'node-html-parser'
import { JSDOM } from 'jsdom'
import {
  Chapter,
  ChapterResponse,
  Comic,
  ComicResponse,
  InfoResponse,
  SearchResponse
} from './types'
import { toSlug } from './ultils'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const instance = axios.create({
  baseURL: process.env.WEBSITE_URL
})

class Model {
  public static slide = async (): Promise<Comic[] | null> => {
    return instance
      .get('/')
      .then(({ data }) => {
        const dom = parser(data)

        return dom.querySelectorAll('#ctl00_divAlt1 .item').map((item) => ({
          id: item
            .querySelector('a')!
            .getAttribute('href')!
            .split('/')
            .slice(-1)[0]
            .split('-')
            .slice(-1)[0],
          title: item.querySelector('h3 a')!.textContent,
          thumbnail: item
            .querySelector('img')!
            .getAttribute('data-src')!
            .replace('//', 'http://'),
          chapLatest: [
            {
              name: item.querySelectorAll('.slide-caption a')[1]!.textContent,
              hashId: Number(
                item
                  .querySelectorAll('.slide-caption a')[1]!
                  .getAttribute('href')!
                  .split('/')
                  .slice(-1)[0]
              ),
              timeLeft: item.querySelector('.time')!.textContent.trim()
            }
          ],
          slug: item
            .querySelector('a')!
            .getAttribute('href')!
            .split('/')
            .slice(-1)[0]
            .split('-')
            .slice(0, -1)
            .join('-')
        }))
      })
      .catch(() => null)
  }

  public static home = async (
    pageQuery: string
  ): Promise<ComicResponse | null> => {
    return instance
      .get(`/?page=${pageQuery}`)
      .then(({ data }) => {
        return this.comic(data)
      })
      .catch(() => null)
  }

  public static search = async (
    q: string
  ): Promise<SearchResponse[] | null> => {
    const keyword = toSlug(decodeURI(q), ' ')
    return instance
      .get(`Comic/Services/SuggestSearch.ashx?q=${encodeURI(keyword)}`)
      .then(({ data }) => {
        const dom = parser(data)

        return dom.querySelectorAll('a').map((item) => ({
          name: item.querySelector('h3')!.textContent,
          slug: item
            .getAttribute('href')!
            .split('/')
            .slice(-1)[0]
            .split('-')
            .slice(0, -1)
            .join('-'),
          thumbnail: item
            .querySelector('img')!
            .getAttribute('src')!
            .replace('//', 'http://'),
          chapLatest: item.querySelector('i')!.textContent,
          intro:
            item.querySelectorAll('i').length > 2
              ? item.querySelectorAll('i')[1].textContent.replace(/\n+/g, '')
              : undefined,
          genres: item
            .querySelectorAll('i')
            .splice(-1)[0]
            .textContent.split(',')
        }))
      })
      .catch(() => null)
  }

  public static info = async (slug: string): Promise<InfoResponse | null> => {
    return instance
      .get(`/truyen-tranh/${slug}`)
      .then(({ data }) => {
        const dom = parser(data)

        return {
          title: dom.querySelector('#item-detail .title-detail')!.textContent,
          slug,
          id: dom
            .querySelector('#item-detail .mrt5.mrb10 a')!
            .getAttribute('href')!
            .split('-')
            .splice(-1)
            .join(''),
          status:
            dom.querySelector('#item-detail .status .col-xs-8')!.textContent ||
            'Đang tiến hành',
          thumbnail: dom
            .querySelector('#item-detail .col-image img')!
            .getAttribute('src')!
            .replace('//', 'http://'),
          specialName: dom.querySelector('#item-detail .othername h2')
            ?.textContent,
          author: dom.querySelector('#item-detail .author a')?.textContent,
          updatedAt: dom
            .querySelector('#item-detail time')!
            .textContent.replace(/[\[\]\n']+/g, '')
            .split(':')
            .splice(1)
            .join(':'),
          views: dom.querySelector('#item-detail .fa-eye')?.parentNode
            .nextElementSibling.textContent,
          rating: dom.querySelectorAll('#item-detail .mrt5 span span')[0]
            .textContent,
          reviews: Number(
            dom.querySelectorAll('#item-detail .mrt5 span span')[1].textContent
          ),
          follows: dom.querySelector('#item-detail .follow b')!.textContent,
          content: dom.querySelector('#item-detail .detail-content p')!
            .innerText,
          genres: dom.querySelectorAll('#item-detail .kind a').map((genre) => ({
            name: genre.textContent,
            slug: genre.getAttribute('href')!.split('/').slice(-1)[0]
          })),
          chapters: dom
            .querySelectorAll('#item-detail .list-chapter li:not(.heading)')
            .map((item) => ({
              name: item.querySelector('.chapter')!.textContent.trim(),
              hashId: Number(
                item
                  .querySelector('.chapter a')!
                  .getAttribute('href')!
                  .split('/')
                  .slice(-1)[0]
              ),
              timeLeft: item.querySelector('.col-xs-4')!.innerText,
              views: item.querySelector('.col-xs-3')!.innerText
            }))
        }
      })
      .catch(() => null)
  }

  public static genre = async (
    slug: string,
    page: string = '1'
  ): Promise<ComicResponse | null> => {
    return instance
      .get(`/tim-truyen/${slug}?page=${page}`)
      .then(({ data }) => {
        return this.comic(data)
      })
      .catch(() => null)
  }

  public static finish = async (): Promise<ComicResponse | null> => {
    return instance
      .get('/truyen-full')
      .then(({ data }) => {
        return this.comic(data)
      })
      .catch(() => null)
  }

  public static rank = async (
    type: string = '-1',
    page: string = '1'
  ): Promise<ComicResponse | null> => {
    return instance
      .get(`/tim-truyen?status=-1&sort=${type}&page=${page}`)
      .then(({ data }) => {
        return this.comic(data)
      })
      .catch(() => null)
  }

  public static chapter = async (
    id: string,
    slug: string,
    chap: string,
    hash: string
  ): Promise<ChapterResponse | null> => {
    return instance
      .get(`truyen-tranh/${slug}/${chap}/${hash}`)
      .then(({ data }) => {
        const dom = parser(data)

        return {
          title: dom.querySelector('.txt-primary a')!.textContent,
          chapterName: dom
            .querySelector('.txt-primary span')!
            .textContent.replace('-', '')
            .trim(),
          updateAt: dom
            .querySelector('#ctl00_divCenter .reading .top i')!
            .textContent.replace(/[\[\]\n']+/g, '')
            .split(':')
            .splice(1)
            .join(':'),
          id,
          comics: dom
            .querySelectorAll('.box_doc img')
            .map(
              (img) =>
                `${process.env.BASE_URL}api/v1/image?url=${encodeURIComponent(
                  img.getAttribute('src') as string
                )}`
            )
        }
      })
      .catch(() => null)
  }

  public static chapLinks = async (id: string): Promise<Chapter[] | null> => {
    return instance
      .get(`Comic/Services/ComicService.asmx/ProcessChapterList?comicId=${id}`)
      .then(({ data }) => {
        return data.chapters.map(
          (chapter: { chapterId: number; name: string }) => ({
            name: chapter.name,
            hashId: chapter.chapterId
          })
        )
      })
      .catch(() => null)
  }

  private static comic(data: any): ComicResponse {
    const { window } = new JSDOM(data)
    const dom = window.document
    const list = [...dom.querySelectorAll('#ctl00_divCenter .item')].map(
      (item) => ({
        id: item
          .querySelector('a')
          ?.getAttribute('href')
          ?.split('/')
          .slice(-1)[0]
          .split('-')
          .slice(-1)[0],
        title: item.querySelector('.jtip')?.textContent!,
        thumbnail: item
          .querySelector('img')
          ?.getAttribute('data-original')
          ?.replace('//', 'http://'),
        chapLatest: [...item.querySelectorAll('.chapter')].map((chap) => ({
          name: chap.querySelector('a')?.textContent!,
          hashId: Number(
            chap
              .querySelector('a')
              ?.getAttribute('href')
              ?.split('/')
              .slice(-1)[0]
          ),
          timeLeft: chap.querySelector('i.time')?.textContent!
        })),
        views: item.querySelector('.view')?.textContent!.split(' ')[1],
        follows: item.querySelector('.view')?.textContent!.split(' ')[5].trim(),
        slug: item
          .querySelector('a')
          ?.getAttribute('href')
          ?.split('/')
          .slice(-1)[0]
          .split('-')
          .slice(0, -1)
          .join('-')
      })
    )

    const totalPage = dom
      .querySelectorAll('.pagination li a')
      [dom.querySelectorAll('.pagination li a').length - 1].getAttribute('href')
      ?.split('=')
      .slice(-1)
      .join()

    const currentPage = dom.querySelector('.pagination .active a')!.textContent

    return {
      comics: list,
      pagination: {
        totalPage: Number(totalPage),
        currentPage: Number(currentPage)
      }
    }
  }
}

export default Model
