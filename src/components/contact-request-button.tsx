"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, X } from "lucide-react";
import {
  sendContactRequest, hasContactRequestTo, getContactRequestCount,
} from "@/lib/user-store";
import type { ProfileType } from "@/lib/user-store";
import { canPerformAction, getContactRequestLimit } from "@/lib/permissions";
import type { Role } from "@/lib/permissions";

interface ContactRequestButtonProps {
  toUserId: string;
  toName: string;
  toProfileType: ProfileType;
  viewerRole: Role;
}

export default function ContactRequestButton({
  toUserId, toName, toProfileType, viewerRole,
}: ContactRequestButtonProps) {
  const [alreadySent, setAlreadySent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const canSend = canPerformAction(viewerRole, "send_contact_request") ||
    canPerformAction(viewerRole, "send_cooperation_request");

  useEffect(() => {
    if (!canSend) return;
    setAlreadySent(hasContactRequestTo(toUserId));
    const limit = getContactRequestLimit(viewerRole);
    const used = getContactRequestCount();
    setRemaining(Math.max(0, limit - used));
  }, [toUserId, viewerRole, canSend]);

  function handleSend() {
    if (!message.trim()) return;
    sendContactRequest(toUserId, toName, toProfileType, message.trim());
    setAlreadySent(true);
    setSent(true);
    setShowForm(false);
    setRemaining((r) => Math.max(0, r - 1));
    setTimeout(() => setSent(false), 3000);
  }

  if (!canSend) return null;

  if (alreadySent) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-500">
        <Check className="h-3.5 w-3.5" />
        {sent ? "Request sent!" : "Request sent"}
      </div>
    );
  }

  if (remaining <= 0) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--foreground-muted)]">
        No contact requests remaining
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-2 text-xs font-medium text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
      >
        <Send className="h-3.5 w-3.5" />
        Contact
        <span className="ml-1 rounded-full bg-[var(--gold)]/20 px-1.5 py-0.5 text-[10px] font-bold">{remaining}</span>
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-[var(--surface-border)] bg-[var(--card-bg)] p-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[var(--foreground)]">Send request to {toName}</p>
              <button type="button" onClick={() => setShowForm(false)} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short message..."
              rows={3}
              maxLength={300}
              className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] text-[var(--foreground-muted)]">{remaining} requests left</p>
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--gold)] px-3 py-1.5 text-xs font-semibold text-[var(--navy-dark)] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-3 w-3" /> Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
