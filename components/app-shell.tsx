"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { posts } from "@/lib/content";
import { UltrahopeLogo } from "./ultrahope-logo";

function SidebarLink(props: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={props.href}
      className={`sidebar-primary-link ${props.active ? "is-active" : ""}`}
      aria-current={props.active ? "page" : undefined}
    >
      {props.children}
    </Link>
  );
}

export function AppShell(props: { children: ReactNode }) {
  const pathname = usePathname();
  const activePostSlug = pathname?.startsWith("/posts/")
    ? pathname.split("/")[2]
    : null;
  const activeWiringSlug = pathname?.startsWith("/wiring/")
    ? pathname.split("/")[2]
    : null;
  const recentPosts = posts.slice(0, 2);
  const categorizedPosts = posts
    .slice(2)
    .reduce<Record<string, typeof posts>>((groups, post) => {
      groups[post.category] ??= [];
      groups[post.category].push(post);
      return groups;
    }, {});

  return (
    <div className="app-frame">
      <div className="page-shell">
        <aside className="workspace-sidebar">
          <section className="sidebar-brand-block">
            <Link
              href="/"
              className="sidebar-brand"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <UltrahopeLogo className="sidebar-brand-logo" />
            </Link>
          </section>

          <section className="sidebar-section">
            <SidebarLink href="/about" active={pathname === "/about"}>
              About
            </SidebarLink>
          </section>

          <section className="sidebar-section">
            <div className="sidebar-section-head sidebar-section-head-stack">
              <p>Wiring</p>
            </div>

            <div className="sidebar-thread-list">
              <SidebarLink
                href="/wiring/hermes-agent-mise"
                active={activeWiringSlug === "hermes-agent-mise"}
              >
                <strong>Hermes Agent + mise + venv</strong>
              </SidebarLink>
            </div>
          </section>

          <section className="sidebar-section">
            <div className="sidebar-section-head sidebar-section-head-stack">
              <p>Recent</p>
            </div>

            <div className="sidebar-thread-list">
              {recentPosts.map((post) => (
                <SidebarLink
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  active={activePostSlug === post.slug}
                >
                  <strong>{post.title}</strong>
                </SidebarLink>
              ))}
            </div>
          </section>

          {Object.entries(categorizedPosts).map(([category, entries]) => (
            <section key={category} className="sidebar-section">
              <div className="sidebar-section-head sidebar-section-head-stack">
                <p>{category}</p>
              </div>

              <div className="sidebar-thread-list sidebar-thread-list-compact">
                {entries.map((post) => (
                  <SidebarLink
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    active={activePostSlug === post.slug}
                  >
                    <strong>{post.title}</strong>
                  </SidebarLink>
                ))}
              </div>
            </section>
          ))}

          <footer className="sidebar-footer">
            <p>静かな余白と、読み心地の良い文章でつくるプロダクトノート。</p>
            <a
              href="https://github.com/toyamarinyon/ultrahope"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </footer>
        </aside>

        <section className="workspace-shell">
          <header className="workspace-topbar">
            <Link
              href="/"
              className="workspace-topbar-brand"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <span className="workspace-topbar-brand-text">Ultrahope</span>
            </Link>
          </header>
          {props.children}
        </section>
      </div>
    </div>
  );
}
