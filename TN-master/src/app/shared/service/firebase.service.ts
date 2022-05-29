import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { CurrentUser } from '../types/user.interface';
import { CommentItem, CommentResponse } from '../types/message.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly afs: AngularFirestore) {}

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
}
