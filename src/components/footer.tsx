"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KBLogo } from "@/components/kb-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Instagram, Linkedin, Facebook, ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    function handleSubscribe(e: { preventDefault(): void }) {
        e.preventDefault();
        if (email.trim().includes("@")) {
            setSubscribed(true);
            setEmail("");
        }
    }

    return (
        <footer className="relative border-t border-[var(--surface-border)] bg-[var(--surface)]/50 pt-16 pb-8 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-12 lg:grid-cols-4 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <KBLogo size="md" showText={true} />
                        </Link>
                        <p className="text-[var(--foreground-muted)] text-sm leading-relaxed max-w-xs">
                            The premium professional network for the football world. Connect, discover, and build your legacy.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Instagram} />
                            <SocialLink href="#" icon={Linkedin} />
                            <SocialLink href="#" icon={Facebook} />
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-[var(--foreground-muted)]">
                            <li><FooterLink href="/register">For Players</FooterLink></li>
                            <li><FooterLink href="/register">For Clubs</FooterLink></li>
                            <li><FooterLink href="/register">For Scouts</FooterLink></li>
                            <li><FooterLink href="/discover">Browse Talent</FooterLink></li>
                            <li><FooterLink href="/jobs">Job Board</FooterLink></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-[var(--foreground-muted)]">
                            <li><FooterLink href="/about">About Us</FooterLink></li>
                            <li><FooterLink href="/careers">Careers</FooterLink></li>
                            <li><FooterLink href="/blog">Blog</FooterLink></li>
                            <li><FooterLink href="/pricing">Pricing</FooterLink></li>
                            <li><FooterLink href="/contact">Contact</FooterLink></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-6">Stay updated</h4>
                        <p className="text-sm text-[var(--foreground-muted)] mb-4">
                            Get the latest opportunities and platform updates.
                        </p>
                        {subscribed ? (
                            <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>You&apos;re subscribed!</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-[var(--background)] border-[var(--surface-border)]"
                                    required
                                />
                                <Button type="submit" size="icon" className="shrink-0 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--surface-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--foreground-subtle)]">
                    <p>© {new Date().getFullYear()} KB&apos;s Football Network. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-[var(--foreground)] transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className?: string }> }) {
    return (
        <a
            href={href}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--surface-highlight)] text-[var(--foreground-muted)] transition-all hover:bg-[var(--gold)] hover:text-black hover:-translate-y-1"
        >
            <Icon className="h-5 w-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-[var(--gold)] transition-colors">
            {children}
        </Link>
    );
}
