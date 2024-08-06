export type EventOptions = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
};

export type DomSelector = HTMLElement | NodeList | string;

declare global {
	interface Window {
		_domassistevents: {
			[key: string]: {
				cb: (e: Event) => void;
    		options: EventOptions;
			}
		};
	}
}