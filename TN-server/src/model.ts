import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import parser from 'node-html-parser'
import { ChapterResponse, Comic, InfoResponse, SearchResponse } from './types'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const instance = axios.create({
  baseURL: process.env.WEBSITE_URL
})

class Model {
  public static slide = async (): Promise<Comic[]> => {
    const { data } = await instance.get('/')
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
        .getAttribute('src')!
        .replace('//', 'http://'),
      chapLatest: {
        name: item.querySelectorAll('.slide-caption a')[1]!.textContent,
        hashId: Number(
          item
            .querySelectorAll('.slide-caption a')[1]!
            .getAttribute('href')!
            .split('/')
            .slice(-1)[0]
        ),
        timeLeft: item.querySelector('.time')!.textContent.trim()
      },
      slug: item
        .querySelector('a')!
        .getAttribute('href')!
        .split('/')
        .slice(-1)[0]
        .split('-')
        .slice(0, -1)
        .join('-')
    }))
  }

  public static home = async (): Promise<Comic[]> => {
    const { data } = await instance.get('/')
    return this.comic(data)
  }

  public static search = async (q: string): Promise<SearchResponse[]> => {
    const { data } = await instance.get(
      `Comic/Services/SuggestSearch.ashx?q=${q}`
    )
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
      genres: item.querySelectorAll('i').splice(-1)[0].textContent.split(',')
    }))
  }

  public static info = async (slug: string): Promise<InfoResponse> => {
    const { data } = await instance.get(`/truyen-tranh/${slug}`)
    const dom = parser(data)

    return {
      title: dom.querySelector('#item-detail .title-detail')!.textContent,
      specialName: dom.querySelector('#item-detail .othername h2')?.textContent,
      author: dom.querySelector('#item-detail .author a')?.textContent,
      updatedAt: dom
        .querySelector('#item-detail time')!
        .textContent.replace(/[\[\]\n']+/g, ''),
      views: dom.querySelector('#item-detail .fa-eye')!.parentNode
        .nextElementSibling.textContent,
      rating: dom.querySelectorAll('#item-detail .mrt5 span span')[0]
        .textContent,
      reviews: Number(
        dom.querySelectorAll('#item-detail .mrt5 span span')[1].textContent
      ),
      follows: dom.querySelector('#item-detail .follow b')!.textContent,
      content: dom.querySelector('#item-detail .detail-content p')!.innerText,
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
  }

  public static genre = async (
    slug: string,
    page: string = '1'
  ): Promise<Comic[]> => {
    const { data } = await instance.get(`/tim-truyen/${slug}?page=${page}`)
    return this.comic(data)
  }

  public static rank = async (
    type: string = '-1',
    page: string = '1'
  ): Promise<Comic[]> => {
    const { data } = await instance.get(
      `/tim-truyen?status=-1&sort=${type}&page=${page}`
    )
    return this.comic(data)
  }

  public static chapter = async (
    id: string,
    slug: string,
    chap: string,
    hash: string
  ): Promise<ChapterResponse> => {
    const data = await Promise.all([
      (await instance.get(`truyen-tranh/${slug}/${chap}/${hash}`)).data,
      (
        await instance.get(
          `/Comic/Services/ComicService.asmx/ProcessChapterPreLoad?comicId=${id}&commentId=-1`
        )
      ).data
    ])
    const dom1 = parser(data[0])
    return {
      title: dom1.querySelector('.txt-primary a')!.textContent,
      id,
      comics: dom1
        .querySelectorAll('.box_doc img')
        .map(
          (img) =>
            `${process.env.BASE_URL}api/v1/image?url=${encodeURIComponent(
              img.getAttribute('src') as string
            )}`
        ),
      chapters: data[1].chapters.map(
        (chapter: { chapterId: number; name: string }) => ({
          name: chapter.name,
          hashId: chapter.chapterId
        })
      )
    }
  }

  private static comic(data: any): Comic[] {
    const dom = parser(data)
    return dom.querySelectorAll('#ctl00_divCenter .item').map((item) => ({
      id: item
        .querySelector('a')!
        .getAttribute('href')!
        .split('/')
        .slice(-1)[0]
        .split('-')
        .slice(-1)[0],
      title: item.querySelector('.jtip')!.textContent,
      thumbnail: item
        .querySelector('img')!
        .getAttribute('data-original')!
        .replace('//', 'http://'),
      chapLatest: {
        name: item.querySelector('.chapter a')!.textContent,
        hashId: Number(
          item
            .querySelector('.chapter a')!
            .getAttribute('href')!
            .split('/')
            .slice(-1)[0]
        ),
        timeLeft: item.querySelector('i.time')!.textContent
      },
      views: item.querySelector('.view')!.textContent.split(' ')[1],
      follows: item.querySelector('.view')!.textContent.split(' ')[5].trim(),
      slug: item
        .querySelector('a')!
        .getAttribute('href')!
        .split('/')
        .slice(-1)[0]
        .split('-')
        .slice(0, -1)
        .join('-')
    }))
  }
}

export default Model
