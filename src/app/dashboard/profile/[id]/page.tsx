"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { getStoredRole } from "@/lib/user-store";
import type { Role } from "@/lib/permissions";
import { canViewProfileType } from "@/lib/permissions";
import { getProfileById } from "@/lib/mock-directory";
import type { DirectoryEntry } from "@/lib/mock-directory";
import ProfileView from "@/components/profile-view";
import ShortlistButton from "@/components/shortlist-button";
import PrivateNotes from "@/components/private-notes";
import ContactRequestButton from "@/components/contact-request-button";

export default function ViewProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [viewerRole, setViewerRole] = useState<Role | null>(null);
  const [entry, setEntry] = useState<DirectoryEntry | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const role = getStoredRole() as Role | null;
    if (!role) { router.replace("/login"); return; }
    setViewerRole(role);

    const found = getProfileById(id);
    if (!found) { setNotFound(true); return; }
    setEntry(found);
  }, [id, router]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard/discover" className="inline-flex items-center gap-2 rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors mb-6">
          <ArrowLeft className="h-5 w-5" /> Back to Discover
        </Link>
        <div className="glass-card p-12 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-[var(--foreground-muted)] opacity-40" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Profile not found</h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">This profile doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  if (!viewerRole || !entry) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--gold)]/20 border-t-[var(--gold)]" />
      </div>
    );
  }

  const targetType = entry.profile.role;
  const canView = canViewProfileType(viewerRole, targetType);

  if (!canView) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard/discover" className="inline-flex items-center gap-2 rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors mb-6">
          <ArrowLeft className="h-5 w-5" /> Back to Discover
        </Link>
        <div className="glass-card p-12 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-[var(--foreground-muted)] opacity-40" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Access restricted</h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            Your role ({viewerRole}) does not have permission to view {targetType} profiles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Navigation + Actions */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/dashboard/discover" className="inline-flex items-center gap-2 rounded-xl p-2 text-[var(--foreground-muted)] hover:bg-[var(--gold)]/10 hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft className="h-5 w-5" /> <span className="text-sm">Discover</span>
        </Link>
        <div className="flex items-center gap-2">
          <ShortlistButton profileId={entry.id} profileType={targetType} />
          <ContactRequestButton
            toUserId={entry.id}
            toName={
              "name" in entry.profile ? entry.profile.name :
              "clubName" in entry.profile ? entry.profile.clubName :
              "companyName" in entry.profile ? (entry.profile as { companyName: string }).companyName : ""
            }
            toProfileType={targetType}
            viewerRole={viewerRole}
          />
        </div>
      </motion.div>

      {/* Profile Content */}
      <ProfileView entry={entry} viewerRole={viewerRole} />

      {/* Private Notes (below profile) */}
      <div className="mt-4">
        <PrivateNotes profileId={entry.id} viewerRole={viewerRole} />
      </div>
    </div>
  );
}
