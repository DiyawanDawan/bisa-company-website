'use client';

import React, { useState } from 'react';
import ForumAvatar from '@/components/forum/ForumAvatar';
import { formatForumDate, countAllComments, type ForumComment } from '@/lib/forumApi';

function CommentBubble({
  comment,
  isReply,
}: {
  comment: ForumComment;
  isReply: boolean;
}) {
  const author = comment.user?.fullName ?? 'Pengguna';
  const parentName = comment.parent?.user?.fullName;

  return (
    <div className="min-w-0 flex-1">
      <div
        className={`inline-block max-w-full rounded-2xl px-4 py-2.5 ${
          isReply ? 'bg-slate-100' : 'bg-elevarm-neutral'
        }`}
      >
        <p className={`font-bold text-elevarm-black ${isReply ? 'text-sm' : 'text-base'}`}>
          {author}
        </p>
        {isReply && parentName && (
          <p className="text-xs font-semibold text-elevarm-cobalt mb-1">
            Membalas {parentName}
          </p>
        )}
        <p
          className={`text-elevarm-black leading-relaxed whitespace-pre-wrap ${
            isReply ? 'text-sm' : 'text-base'
          }`}
        >
          {comment.content}
        </p>
      </div>
      <p className="mt-1.5 px-1 text-xs font-medium text-elevarm-grey">
        {formatForumDate(comment.createdAt)}
        {typeof comment.upvotes === 'number' && comment.upvotes > 0 && (
          <span className="ml-3">{comment.upvotes} suka</span>
        )}
      </p>
    </div>
  );
}

function CommentItem({ comment, depth = 0 }: { comment: ForumComment; depth?: number }) {
  const [repliesExpanded, setRepliesExpanded] = useState(true);
  const isReply = depth > 0;
  const replies = comment.replies ?? [];
  const hasReplies = replies.length > 0;

  return (
    <div className={isReply ? 'relative' : ''}>
      <div className={`flex gap-3 ${isReply ? 'pt-3' : 'pt-1'}`}>
        {isReply && (
          <div
            className="absolute -left-4 sm:-left-5 top-0 bottom-0 w-0.5 rounded-full bg-slate-200"
            aria-hidden
          />
        )}
        <ForumAvatar
          name={comment.user?.fullName ?? '?'}
          url={comment.user?.avatarUrl}
          className={isReply ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'}
        />
        <CommentBubble comment={comment} isReply={isReply} />
      </div>

      {hasReplies && (
        <div className="ml-5 sm:ml-6 pl-5 sm:pl-6 border-l-2 border-slate-200/90">
          {!repliesExpanded && (
            <button
              type="button"
              onClick={() => setRepliesExpanded(true)}
              className="mt-2 flex items-center gap-2 text-sm font-bold text-elevarm-cobalt hover:underline"
            >
              <span className="h-px w-6 bg-elevarm-cobalt/40" aria-hidden />
              Lihat {replies.length} balasan
            </button>
          )}

          {repliesExpanded && (
            <>
              {replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
              {replies.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRepliesExpanded(false)}
                  className="mt-1 pb-2 text-sm font-bold text-elevarm-cobalt hover:underline"
                >
                  Sembunyikan balasan
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function ForumCommentThread({ comments }: { comments: ForumComment[] }) {
  if (comments.length === 0) return null;

  const topLevel = comments.filter((c) => !c.parent);

  return (
    <section className="space-y-5">
      <h2 className="text-xl sm:text-2xl font-bold text-elevarm-black font-display">
        Komentar
        <span className="ml-2 text-base font-semibold text-elevarm-grey">
          ({countAllComments(comments)})
        </span>
      </h2>
      <div className="space-y-5">
        {topLevel.map((comment) => (
          <CommentItem key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    </section>
  );
}
