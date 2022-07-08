import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { CurrentUser } from '../types/user.interface';
import { CommentItem, CommentResponse } from '../types/message.interface';
import { HistoryComic } from '../types/comic.interface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ComicService } from './manga.service';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private readonly afs: AngularFirestore,
    private readonly aff: AngularFireFunctions,
    private readonly csv: ComicService
  ) {}

  public getComments(
    comicId: number,
    limit: number
  ): Observable<CommentResponse[]> {
    return this.afs
      .collection<CommentResponse>('comments', (ref) => {
        return ref
          .where('comicId', '==', Number(comicId))
          .orderBy('createdAt', 'desc')
          .limit(limit);
      })
      .valueChanges({ idField: 'commentId' });
  }

  public getCMTUserInfo(uid: string): Observable<CurrentUser | undefined> {
    return this.afs.doc<CurrentUser>(`users/${uid}`).valueChanges();
  }

  public getReplyCMTs(cmtId: string): Observable<CommentItem[]> {
    return this.afs
      .collection<CommentItem>(`comments/${cmtId}/reply`, (ref) =>
        ref.orderBy('createdAt', 'asc')
      )
      .valueChanges({ idField: 'commentId' });
  }

  public addComment(comment: CommentResponse) {
    return this.afs.collection<CommentResponse>('comments').add(comment);
  }

  public addReply(comment: CommentResponse, replyFor: string) {
    return this.afs
      .collection(`comments`)
      .doc(replyFor)
      .collection('reply')
      .add(comment);
  }

  public addReaction(
    commentId: string,
    value: number,
    uid: string,
    isReply: boolean,
    replyId?: string
  ) {
    if (isReply && replyId)
      this.afs
        .doc(`comments/${commentId}/reply/${replyId}`)
        .update({ [`reaction.${uid}`]: value });
    else
      this.afs
        .doc(`comments/${commentId}`)
        .update({ [`reaction.${uid}`]: value });
  }

  public getTotalComment(comicId: number): Observable<number> {
    return this.afs
      .collection<CommentResponse>('comments', (ref) => {
        return ref.where('comicId', '==', Number(comicId));
      })
      .valueChanges()
      .pipe(map((snapshot) => snapshot.length));
  }

  public addHistory(history: HistoryComic, uid: string) {
    this.afs
      .doc(`users/${uid}/history/${history.comicId}`)
      .get()
      .subscribe((res) => {
        if (!res.exists) {
          this.afs.doc(`users/${uid}/history/${history.comicId}`).set(history);
        }
      });
  }

  public updateChapLastes(
    uid: string,
    slug: string,
    chapLatest: {
      name: string;
      hashId: string;
    },
    comicId: string
  ) {
    this.afs
      .doc(`users/${uid}/history/${comicId}`)
      .get()
      .pipe(
        switchMap((res) => {
          if (!res.exists) {
            return this.csv.getInfo(slug);
          } else {
            this.afs
              .doc(`users/${uid}/history/${comicId}`)
              .update({ ['chapReadLastest']: chapLatest });
            return of(null);
          }
        }),
        switchMap((info) => {
          if (!info) return of(null);
          return this.afs
            .doc<HistoryComic>(`users/${uid}/history/${comicId}`)
            .set({
              comicId,
              chapReadLastest: chapLatest,
              createdAt: new Date() as unknown as {
                nanoseconds: number;
                seconds: number;
              },
              slug,
              tag: info.genres,
              thumb_url: info.thumbnail,
              title: info.title,
            });
        })
      )
      .subscribe();
  }

  public getHistory(uid: string, startAt: number) {
    return this.afs
      .collection<HistoryComic>(`users/${uid}/history`, (ref) => {
        return ref.orderBy('createdAt').startAfter(startAt).limit(10);
      })
      .get();
  }

  public deleteAllHistory(uid: string): void {
    const deleteFn = this.aff.httpsCallable('recursiveDelete');

    deleteFn({ path: `users/${uid}` }).subscribe(() => {
      console.log('delete history success');
    });
  }

  public deleteOneHistory(uid: string, id: string): Promise<void> {
    return this.afs.doc(`users/${uid}/history/${id}`).delete();
  }
}
