import Link from 'next/link';
import { getForumGroupPath } from '@/lib/forumPaths';
import { formatForumDate, type ForumGroup } from '@/lib/forumApi';

export default function ForumGroupCard({ group }: { group: ForumGroup }) {
  return (
    <Link
      href={getForumGroupPath(group.id)}
      className="group flex overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-elevarm-cobalt/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
    >
      <div className="relative w-28 sm:w-36 shrink-0 bg-gradient-to-br from-[#135122] to-[#1a7a34]">
        {group.bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={group.bannerUrl} alt="" className="h-full w-full object-cover opacity-90" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 h-12 w-12 rounded-lg border-2 border-white bg-elevarm-neutral overflow-hidden shadow-md">
          {group.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={group.avatarUrl} alt={group.name} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg font-bold text-elevarm-cobalt">
              {group.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-elevarm-black font-display group-hover:text-elevarm-cobalt transition-colors line-clamp-1">
          {group.name}
        </h3>
        {group.description && (
          <p className="text-sm sm:text-base text-elevarm-grey leading-relaxed line-clamp-2">
            {group.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-elevarm-grey">
          <span>{group.memberCount} anggota</span>
          <span>{group.postCount} posting</span>
          <span className="hidden sm:inline">Dibuat {formatForumDate(group.createdAt)}</span>
        </div>
        <p className="text-sm text-elevarm-grey">
          Admin: <span className="font-semibold text-elevarm-black">{group.owner.fullName}</span>
        </p>
      </div>
    </Link>
  );
}
