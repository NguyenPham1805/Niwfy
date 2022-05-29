import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { serverTimestamp } from '@angular/fire/firestore';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { finalize, Subject, takeUntil, tap } from 'rxjs';

import { signInOpenAction } from 'src/app/core/store/actions/user.action';
import { currentUserSelector } from 'src/app/core/store/selectors/user.selector';
import { CurrentUser } from 'src/app/shared/types/user.interface';
import { CommentItem } from 'src/app/shared/types/message.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'nf-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit, OnDestroy {
  public user: CurrentUser | null = null;
  public previewImage: string | null = null;
  public changeFileLoading: boolean = false;
  public progress: number = 0;
  public text: string = '';

  private fileToUpload: any;
  private snapshotFinal: UploadTaskSnapshot | null = null;
  private destroy$ = new Subject<null>();

  @Input('is-reply') isReply: boolean = false;
  @Input('loading') isCommentLoading: boolean = false;
  @Output('comment') onComment = new EventEmitter<CommentItem>();

  constructor(
    private readonly store: Store,
    private readonly afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.store
      .select(currentUserSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public handleOpenSignIn(): void {
    this.store.dispatch(signInOpenAction({ isOpen: true }));
  }

  public handleChageFile(fileTarget: any): void {
    this.changeFileLoading = true;
    if (fileTarget.files[0].size > 1024 * 1024 * 20) {
      this.handleRemovePreviewImg(fileTarget);
      return;
    }
    this.fileToUpload = fileTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.previewImage = e.target.result;
    };
    fileReader.readAsDataURL(this.fileToUpload);

    this.afs
      .upload(
        `${Date.now().toString()}-${this.fileToUpload.name}`,
        this.fileToUpload
      )
      .snapshotChanges()
      .pipe(
        tap((snapshot) => {
          this.progress = snapshot!.bytesTransferred / snapshot!.totalBytes;
        }),
        finalize(() => {
          this.snapshotFinal?.ref.getDownloadURL().then((url) => {
            this.previewImage = url;
            this.changeFileLoading = false;
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((snapshot) => {
        this.snapshotFinal = snapshot!;
      });
  }

  public handleRemovePreviewImg(fileTarget: any): void {
    if (fileTarget?.value) {
      try {
        fileTarget.value = '';
        this.previewImage = null;
      } catch (err) {}
    }
  }

  public handleComment(form: NgForm): void {
    if (!this.user) return;
    const image = this.previewImage?.startsWith(
      'https://firebasestorage.googleapis.com'
    )
      ? this.previewImage
      : null;

    if (!this.text.trim().length && !image) return;

    this.onComment.emit({
      uid: this.user.uid,
      content: this.text.trim(),
      createdAt: serverTimestamp() as any,
      reaction: {},
      img: image,
    });

    this.handleRemovePreviewImg(this.fileToUpload);
    this.previewImage = null;
    form.reset();
  }
}
