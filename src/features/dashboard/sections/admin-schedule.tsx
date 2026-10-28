"use client";

import {
	LuArrowUpRight,
	LuCalendarDays,
	LuClock3,
	LuPlus,
	LuVideo
} from "react-icons/lu";
import type {
	DashboardCopy,
	Meeting
} from "@/features/dashboard/content/dashboard-content";
import {
	previewWeek,
	weekdayNames
} from "@/features/dashboard/content/dashboard-content";
import type { Locale } from "@/i18n/routing";

export function WeekStrip({
	copy,
	locale,
	meetings,
	selectedDay,
	onSelect
}: {
	copy: DashboardCopy;
	locale: string;
	meetings: Meeting[];
	selectedDay: number;
	onSelect: (day: number) => void;
}) {
	const days =
		weekdayNames[
			locale === "es" || locale === "ja" ? (locale as Locale) : "en"
		];
	return (
		<div className="tw-week-strip" role="group" aria-label={copy.thisWeek}>
			{previewWeek.map((date, index) => (
				<button
					key={date}
					type="button"
					aria-pressed={selectedDay === index}
					onClick={() => onSelect(index)}
				>
					<span>{days[index]}</span>
					<strong>{date}</strong>
					<i
						className={
							meetings.some(meeting => meeting.day === index)
								? "tw-day-has-meeting"
								: ""
						}
					/>
				</button>
			))}
		</div>
	);
}

export function MeetingRows({
	copy,
	meetings
}: {
	copy: DashboardCopy;
	meetings: Meeting[];
}) {
	if (!meetings.length)
		return <p className="tw-empty-state">{copy.noMeetings}</p>;
	return (
		<ol className="tw-meeting-list">
			{[...meetings]
				.sort((a, b) => a.time.localeCompare(b.time))
				.map(meeting => (
					<li key={meeting.id}>
						<span className="tw-meeting-time">{meeting.time}</span>
						<span className="tw-meeting-indicator" aria-hidden="true" />
						<span className="tw-meeting-body">
							<strong>{meeting.guest}</strong>
							<small>
								{copy[meeting.kind]} · {meeting.duration}
							</small>
						</span>
						<LuVideo aria-hidden="true" />
					</li>
				))}
		</ol>
	);
}

export function AdminSchedule({
	copy,
	locale,
	meetings,
	selectedDay,
	onDayChange,
	onNewMeeting
}: {
	copy: DashboardCopy;
	locale: string;
	meetings: Meeting[];
	selectedDay: number;
	onDayChange: (day: number) => void;
	onNewMeeting: () => void;
}) {
	const dayMeetings = meetings.filter(meeting => meeting.day === selectedDay);
	const next =
		meetings.find(meeting => meeting.day >= selectedDay) ?? meetings[0];
	return (
		<div className="tw-admin-view tw-view-enter">
			<div className="tw-page-title">
				<div>
					<h1>{copy.schedule}</h1>
					<p>
						{copy.weekRange} · {copy.sampleData}
					</p>
				</div>
				<button
					type="button"
					className="tw-button tw-button-primary"
					onClick={onNewMeeting}
				>
					<LuPlus aria-hidden="true" />
					{copy.newMeeting}
				</button>
			</div>
			<div className="tw-schedule-layout">
				<section className="tw-surface tw-schedule-main">
					<div className="tw-surface-head">
						<div>
							<h2>{copy.thisWeek}</h2>
							<p>{copy.weekRange}</p>
						</div>
						<LuCalendarDays aria-hidden="true" />
					</div>
					<WeekStrip
						copy={copy}
						locale={locale}
						meetings={meetings}
						selectedDay={selectedDay}
						onSelect={onDayChange}
					/>
					<div className="tw-agenda-head">
						<h3>{copy.selectedDay}</h3>
						<span>
							{dayMeetings.length} {copy.meetings.toLowerCase()}
						</span>
					</div>
					<MeetingRows copy={copy} meetings={dayMeetings} />
				</section>
				<aside className="tw-surface tw-next-meeting">
					<div className="tw-surface-head">
						<div>
							<h2>{copy.nextMeeting}</h2>
							<p>{copy.videoCall}</p>
						</div>
						<LuArrowUpRight aria-hidden="true" />
					</div>
					{next && (
						<div className="tw-next-meeting-body">
							<span className="tw-next-date">{previewWeek[next.day]} / 10</span>
							<strong>{next.time}</strong>
							<p>{next.guest}</p>
							<span>
								{copy[next.kind]} · {next.duration}
							</span>
							<div className="tw-next-meeting-foot">
								<LuClock3 aria-hidden="true" />
								{copy.adminMeetingHint}
							</div>
						</div>
					)}
				</aside>
			</div>
		</div>
	);
}
