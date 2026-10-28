"use client";

import { useState } from "react";
import Image from "next/image";
import { LuArrowUpRight, LuSearch } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import type { DashboardCopy, WebsiteItem } from "@/features/dashboard/content/dashboard-content";

type Kind = WebsiteItem["kind"];
export function AdminWebsite({ copy, items, onEdit }: { copy: DashboardCopy; items: WebsiteItem[]; onEdit: (id: string) => void }) {
  const [kind, setKind] = useState<Kind>("destinations");
  const [query, setQuery] = useState("");
  const visible = items.filter((item) => item.kind === kind && `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="tw-admin-view tw-view-enter"><div className="tw-page-title"><div><h1>{copy.websiteHeading}</h1><p>{copy.websiteIntro} <span className="tw-inline-sample">{copy.sampleData}</span></p></div></div><section className="tw-surface tw-library"><div className="tw-library-bar"><div className="tw-segmented" role="group" aria-label={copy.contentLibrary}>{(["destinations", "tours", "stories"] as const).map((name) => <button type="button" key={name} aria-pressed={kind === name} onClick={() => setKind(name)}>{copy[name]}</button>)}</div><label className="tw-search"><LuSearch aria-hidden="true" /><span className="sr-only">{copy.searchContent}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchContent} /></label></div><div className="tw-library-list">{visible.length ? visible.map((item) => <article key={item.id} className="tw-library-row"><div className="tw-library-thumb"><Image src={item.image} alt="" fill sizes="64px" /></div><div className="tw-library-copy"><strong>{item.title}</strong><span>{item.detail}</span></div><div className="tw-library-meta"><span className="tw-status tw-status--published">{copy.published}</span>{item.featured && <span className="tw-featured">{copy.featured}</span>}</div><div className="tw-library-actions"><button type="button" className="tw-text-action" onClick={() => onEdit(item.id)}>{copy.edit}</button><Link className="tw-icon-link" href={item.href} aria-label={`${copy.previewPage}: ${item.title}`}><LuArrowUpRight aria-hidden="true" /></Link></div></article>) : <p className="tw-empty-state">{copy.noResults}</p>}</div></section></div>;
}
