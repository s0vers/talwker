import en from "./dictionary/en.json";

type Messages = typeof en;

declare global {
	interface IntlMessages extends Messages {}
}
