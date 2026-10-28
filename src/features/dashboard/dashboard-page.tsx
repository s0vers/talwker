"use client";

import { useState } from "react";
import { AdminShell } from "@/features/dashboard/sections/admin-shell";
import { AdminOverview } from "@/features/dashboard/sections/admin-overview";
import { AdminSchedule } from "@/features/dashboard/sections/admin-schedule";
import { AdminItineraries } from "@/features/dashboard/sections/admin-itineraries";
import { AdminWebsite } from "@/features/dashboard/sections/admin-website";
import {
	AdminActions,
	type Action
} from "@/features/dashboard/sections/admin-actions";
import {
	getDashboardCopy,
	previewItineraries,
	previewMeetings,
	previewWebsiteItems,
	type AdminView,
	type ItineraryDraft,
	type Meeting,
	type WebsiteItem
} from "@/features/dashboard/content/dashboard-content";
import "@/features/dashboard/dashboard.css";

export default function DashboardPage({ locale }: { locale: string }) {
	const copy = getDashboardCopy(locale);
	const [view, setView] = useState<AdminView>("overview");
	const [day, setDay] = useState(0);
	const [meetings, setMeetings] = useState<Meeting[]>(previewMeetings);
	const [itineraries, setItineraries] =
		useState<ItineraryDraft[]>(previewItineraries);
	const [websiteItems, setWebsiteItems] =
		useState<WebsiteItem[]>(previewWebsiteItems);
	const [selectedId, setSelectedId] = useState(previewItineraries[0].id);
	const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(
		null
	);
	const [action, setAction] = useState<Action>(null);
	const [notice, setNotice] = useState("");
	const updateDays = (id: string, days: ItineraryDraft["days"]) =>
		setItineraries(items =>
			items.map(item =>
				item.id === id ? { ...item, days, updated: copy.today } : item
			)
		);
	const createItinerary = (item: ItineraryDraft) => {
		setItineraries(items => [item, ...items]);
		setSelectedId(item.id);
		setView("itineraries");
	};
	return (
		<AdminShell copy={copy} active={view} onViewChange={setView}>
			{notice && (
				<div className="tw-notice" role="status">
					<span>{notice}</span>
					<button
						type="button"
						onClick={() => setNotice("")}
						aria-label={copy.close}
					>
						×
					</button>
				</div>
			)}
			{view === "overview" && (
				<AdminOverview
					copy={copy}
					locale={locale}
					meetings={meetings}
					itineraries={itineraries}
					websiteItems={websiteItems}
					selectedDay={day}
					onDayChange={setDay}
					onViewChange={setView}
					onNewMeeting={() => setAction("meeting")}
					onNewItinerary={() => setAction("itinerary")}
					onSelectItinerary={setSelectedId}
				/>
			)}
			{view === "schedule" && (
				<AdminSchedule
					copy={copy}
					locale={locale}
					meetings={meetings}
					selectedDay={day}
					onDayChange={setDay}
					onNewMeeting={() => setAction("meeting")}
				/>
			)}
			{view === "itineraries" && (
				<AdminItineraries
					copy={copy}
					itineraries={itineraries}
					selectedId={selectedId}
					onSelect={setSelectedId}
					onNew={() => setAction("itinerary")}
					onUpdate={updateDays}
					onSend={() => setAction("send")}
				/>
			)}
			{view === "website" && (
				<AdminWebsite
					copy={copy}
					items={websiteItems}
					onEdit={id => {
						setSelectedWebsiteId(id);
						setAction("website");
					}}
				/>
			)}
			<AdminActions
				key={`${action}-${selectedId}-${selectedWebsiteId}`}
				action={action}
				onClose={() => setAction(null)}
				copy={copy}
				selectedItinerary={itineraries.find(item => item.id === selectedId)}
				selectedWebsite={websiteItems.find(
					item => item.id === selectedWebsiteId
				)}
				onMeeting={meeting => {
					setMeetings(items => [...items, meeting]);
					setDay(meeting.day);
					setView("schedule");
				}}
				onItinerary={createItinerary}
				onWebsite={(id, title, detail) =>
					setWebsiteItems(items =>
						items.map(item =>
							item.id === id ? { ...item, title, detail } : item
						)
					)
				}
				onNotice={setNotice}
			/>
		</AdminShell>
	);
}
