"use client";

import {
	LuArrowUpRight,
	LuBookOpen,
	LuCalendarDays,
	LuFileText,
	LuPlus
} from "react-icons/lu";
import type {
	AdminView,
	DashboardCopy,
	ItineraryDraft,
	Meeting,
	WebsiteItem
} from "@/features/dashboard/content/dashboard-content";
import {
	WeekStrip,
	MeetingRows
} from "@/features/dashboard/sections/admin-schedule";

type Props = {
	copy: DashboardCopy;
	locale: string;
	meetings: Meeting[];
	itineraries: ItineraryDraft[];
	websiteItems: WebsiteItem[];
	selectedDay: number;
	onDayChange: (day: number) => void;
	onViewChange: (view: AdminView) => void;
	onNewMeeting: () => void;
	onNewItinerary: () => void;
	onSelectItinerary: (id: string) => void;
};

export function AdminOverview({
	copy,
	locale,
	meetings,
	itineraries,
	websiteItems,
	selectedDay,
	onDayChange,
	onViewChange,
	onNewMeeting,
	onNewItinerary,
	onSelectItinerary
}: Props) {
	const readyCount = itineraries.filter(item => item.status === "ready").length;
	const todayMeetings = meetings.filter(meeting => meeting.day === selectedDay);
	return (
		<div className="tw-admin-view tw-view-enter">
			<div className="tw-page-title tw-overview-title">
				<div>
					<h1>{copy.adminHeading}</h1>
					<p>{copy.adminIntro}</p>
				</div>
				<div className="tw-title-actions">
					<button
						type="button"
						className="tw-button tw-button-quiet"
						onClick={onNewMeeting}
					>
						<LuCalendarDays aria-hidden="true" />
						{copy.newMeeting}
					</button>
					<button
						type="button"
						className="tw-button tw-button-primary"
						onClick={onNewItinerary}
					>
						<LuPlus aria-hidden="true" />
						{copy.newItinerary}
					</button>
				</div>
			</div>
			<div className="tw-summary-strip" aria-label={copy.overview}>
				<button type="button" onClick={() => onViewChange("schedule")}>
					<span>
						<LuCalendarDays aria-hidden="true" />
						{copy.meetingsToday}
					</span>
					<strong>{String(meetings.length).padStart(2, "0")}</strong>
					<small>
						{copy.viewSchedule}
						<LuArrowUpRight aria-hidden="true" />
					</small>
				</button>
				<button type="button" onClick={() => onViewChange("itineraries")}>
					<span>
						<LuFileText aria-hidden="true" />
						{copy.readyToSend}
					</span>
					<strong>{String(readyCount).padStart(2, "0")}</strong>
					<small>
						{copy.viewAll}
						<LuArrowUpRight aria-hidden="true" />
					</small>
				</button>
				<button type="button" onClick={() => onViewChange("website")}>
					<span>
						<LuBookOpen aria-hidden="true" />
						{copy.contentLibrary}
					</span>
					<strong>{String(websiteItems.length).padStart(2, "0")}</strong>
					<small>
						{copy.viewAll}
						<LuArrowUpRight aria-hidden="true" />
					</small>
				</button>
			</div>
			<div className="tw-overview-grid">
				<section className="tw-surface tw-overview-calendar">
					<div className="tw-surface-head">
						<div>
							<h2>{copy.thisWeek}</h2>
							<p>{copy.weekRange}</p>
						</div>
						<button
							type="button"
							className="tw-text-action"
							onClick={() => onViewChange("schedule")}
						>
							{copy.viewSchedule}
							<LuArrowUpRight aria-hidden="true" />
						</button>
					</div>
					<WeekStrip
						copy={copy}
						locale={locale}
						meetings={meetings}
						selectedDay={selectedDay}
						onSelect={onDayChange}
					/>
					<div className="tw-agenda-head">
						<h3>{copy.meetings}</h3>
						<span>{copy.sampleData}</span>
					</div>
					<MeetingRows copy={copy} meetings={todayMeetings} />
				</section>
				<aside className="tw-surface tw-overview-activity">
					<div className="tw-surface-head">
						<div>
							<h2>{copy.latestActivity}</h2>
							<p>{copy.sampleData}</p>
						</div>
					</div>
					<ol className="tw-activity-list">
						<li>
							<i />
							<span>
								{copy.activityOne}
								<small>{copy.today} · 09:12</small>
							</span>
						</li>
						<li>
							<i />
							<span>
								{copy.activityTwo}
								<small>{copy.today} · 08:40</small>
							</span>
						</li>
						<li>
							<i />
							<span>
								{copy.activityThree}
								<small>{copy.today} · 08:15</small>
							</span>
						</li>
					</ol>
				</aside>
			</div>
			<section className="tw-surface tw-overview-handoff">
				<div className="tw-surface-head">
					<div>
						<h2>{copy.itineraryQueue}</h2>
						<p>{copy.itineraryQueueHint}</p>
					</div>
					<button
						type="button"
						className="tw-text-action"
						onClick={() => onViewChange("itineraries")}
					>
						{copy.viewAll}
						<LuArrowUpRight aria-hidden="true" />
					</button>
				</div>
				<div className="tw-table-wrap">
					<table className="tw-data-table">
						<thead>
							<tr>
								<th>{copy.itineraryTitle}</th>
								<th>{copy.traveler}</th>
								<th>{copy.itineraryStatus}</th>
								<th>{copy.lastEdited}</th>
								<th>
									<span className="sr-only">{copy.details}</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{itineraries.map(item => (
								<tr key={item.id}>
									<td>
										<button
											type="button"
											className="tw-table-item-button"
											onClick={() => {
												onSelectItinerary(item.id);
												onViewChange("itineraries");
											}}
										>
											<strong>{item.title}</strong>
											<small>{item.destination}</small>
										</button>
									</td>
									<td>{item.traveler}</td>
									<td>
										<span className={`tw-status tw-status--${item.status}`}>
											{copy[item.status]}
										</span>
									</td>
									<td>{item.updated}</td>
									<td>
										<LuArrowUpRight aria-hidden="true" />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
