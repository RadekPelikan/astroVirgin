import { configure, getConsoleSink, getLogger } from "@logtape/logtape";

const category = []

await configure({
	sinks: { console: getConsoleSink() },
	loggers: [
		{ category: [], lowestLevel: "debug", sinks: ["console"] }
	]
});
export default getLogger()