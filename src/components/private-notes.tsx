"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Trash2, ChevronDown, Check } from "lucide-react";
import { getPrivateNote, setPrivateNote, deletePrivateNote } from "@/lib/user-store";
import { canPerformAction } from "@/lib/permissions";
import type { Role } from "@/lib/permissions";

interface PrivateNotesProps {
  profileId: string;
  viewerRole: Role;
}

export default function PrivateNotes({ profileId, viewerRole }: PrivateNotesProps) {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const allowed = canPerformAction(viewerRole, "add_private_notes");

  useEffect(() => {
    if (!allowed) return;
    const note = getPrivateNote(profileId);
    if (note) {
      setText(note.text);
      setLastSaved(note.updatedAt);
    }
  }, [profileId, allowed]);

  function handleSave() {
    if (!text.trim()) {
      deletePrivateNote(profileId);
      setLastSaved(null);
    } else {
      setPrivateNote(profileId, text);
      setLastSaved(new Date().toISOString());
    }
    setShowSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowSaved(false), 2000);
  }

  function handleDelete() {
    deletePrivateNote(profileId);
    setText("");
    setLastSaved(null);
  }

  if (!allowed) return null;

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      {/* Header — click to toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold)]/8 border border-[var(--gold)]/15">
            <FileText className="h-3.5 w-3.5 text-[var(--gold)]" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground-muted)]">Private Notes</h3>
            {lastSaved && !expanded && (
              <p className="text-[10px] text-[var(--foreground-muted)] mt-0.5">
                Last updated {new Date(lastSaved).toLocaleDateString("de-AT")}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-[var(--foreground-muted)]" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                placeholder="Write private notes about this profile... (only visible to you)"
                rows={4}
                className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-[var(--gold)]/40 resize-none transition-colors"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {lastSaved && (
                    <p className="text-[10px] text-[var(--foreground-muted)]">
                      Saved {new Date(lastSaved).toLocaleString("de-AT")}
                    </p>
                  )}
                  <AnimatePresence>
                    {showSaved && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-500"
                      >
                        <Check className="h-3 w-3" /> Saved
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2">
                  {text && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-1 rounded-lg bg-[var(--gold)]/10 px-3 py-1.5 text-xs font-medium text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-[var(--foreground-muted)] opacity-60">
                Private notes are only visible to you and will never be shared.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
