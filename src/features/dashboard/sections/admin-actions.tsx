"use client";

import { useState, type FormEvent } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { DashboardCopy, ItineraryDraft, Meeting, WebsiteItem } from "@/features/dashboard/content/dashboard-content";

export type Action = "meeting" | "itinerary" | "send" | "website" | null;
type Props = { action: Action; onClose: () => void; copy: DashboardCopy; selectedItinerary?: ItineraryDraft; selectedWebsite?: WebsiteItem; onMeeting: (meeting: Meeting) => void; onItinerary: (item: ItineraryDraft) => void; onWebsite: (id: string, title: string, detail: string) => void; onNotice: (text: string) => void };

export function AdminActions({ action, onClose, copy, selectedItinerary, selectedWebsite, onMeeting, onItinerary, onWebsite, onNotice }: Props) {
  const [title, setTitle] = useState(selectedWebsite?.title ?? "");
  const [detail, setDetail] = useState(selectedWebsite?.detail ?? "");
  const [traveler, setTraveler] = useState("");
  const [email, setEmail] = useState(selectedItinerary?.email ?? "");
  const [day, setDay] = useState("0");
  const [time, setTime] = useState("09:30");
  const [kind, setKind] = useState<Meeting["kind"]>("agentConsult");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (action === "meeting") { onMeeting({ id: `M-${Date.now()}`, day: Number(day), time, guest: traveler.trim(), kind, duration: "30 min" }); onNotice(copy.meetingAdded); }
    if (action === "itinerary") { onItinerary({ id: `TW-${Date.now()}`, title: title.trim(), destination: detail.trim(), traveler: traveler.trim(), email: email.trim(), status: "draft", days: [{ title: copy.untitledDay, body: copy.dayNotes }], updated: copy.today }); onNotice(copy.createdNotice); }
    if (action === "website" && selectedWebsite) { onWebsite(selectedWebsite.id, title.trim(), detail.trim()); onNotice(copy.contentSaved); }
    if (action === "send") onNotice(copy.noSendNotice);
    onClose();
  };
  const heading = action === "meeting" ? copy.newMeeting : action === "itinerary" ? copy.newItinerary : action === "website" ? copy.edit : copy.handoffTitle;
  return <Sheet open={action !== null} onOpenChange={(open) => { if (!open) onClose(); }}><SheetContent className="tw-action-sheet"><SheetHeader><span className="tw-eyebrow">{copy.preview} · {copy.sampleData}</span><SheetTitle>{heading}</SheetTitle><SheetDescription>{action === "send" ? copy.handoffHint : copy.savedNotice}</SheetDescription></SheetHeader><form onSubmit={submit} className="tw-action-form">
    {action === "meeting" && <><label>{copy.guest}<input required value={traveler} onChange={(event) => setTraveler(event.target.value)} placeholder={copy.traveler} /></label><label>{copy.subject}<select value={kind} onChange={(event) => setKind(event.target.value as Meeting["kind"])}><option value="agentConsult">{copy.agentConsult}</option><option value="itineraryReview">{copy.itineraryReview}</option><option value="followUp">{copy.followUp}</option></select></label><div className="tw-form-pair"><label>{copy.day}<select value={day} onChange={(event) => setDay(event.target.value)}>{["05", "06", "07", "08", "09", "10", "11"].map((date, index) => <option value={index} key={date}>{date} Oct</option>)}</select></label><label>{copy.time}<input required type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label></div></>}
    {action === "itinerary" && <><label>{copy.draftTitle}<input required value={title} onChange={(event) => setTitle(event.target.value)} /></label><label>{copy.draftDestination}<input required value={detail} onChange={(event) => setDetail(event.target.value)} /></label><label>{copy.draftTraveler}<input required value={traveler} onChange={(event) => setTraveler(event.target.value)} /></label><label>{copy.email}<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label></>}
    {action === "website" && <><label>{copy.contentTitle}<input required value={title} onChange={(event) => setTitle(event.target.value)} /></label><label>{copy.contentSummary}<textarea required rows={4} value={detail} onChange={(event) => setDetail(event.target.value)} /></label></>}
    {action === "send" && <><div className="tw-send-summary"><strong>{selectedItinerary?.title}</strong><span>{selectedItinerary?.traveler}</span></div><label>{copy.recipient}<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>{copy.message}<textarea rows={4} defaultValue={`Here is your ${selectedItinerary?.title ?? "Talkwer"} itinerary for review.`} /></label><p className="tw-sheet-disclaimer">{copy.noSendNotice}</p></>}
    <SheetFooter><button type="button" className="tw-button tw-button-quiet" onClick={onClose}>{copy.cancel}</button><button type="submit" className="tw-button tw-button-primary">{action === "meeting" ? copy.addMeeting : action === "itinerary" ? copy.createDraft : action === "send" ? copy.sendPreview : copy.save}</button></SheetFooter>
  </form></SheetContent></Sheet>;
}
