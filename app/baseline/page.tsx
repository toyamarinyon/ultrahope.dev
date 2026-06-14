import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Baseline",
	description:
		"The baseline of how Ultrahope thinks and moves, and six practices that grow from it.",
};

const mottos = [
	{
		title: "Bless the uncertain future",
		body: [
			"Do not treat what cannot yet be seen as a threat from the beginning. When there is not enough information, leave hypotheses and room instead of filling the blank with fear.",
			"Blessing an uncertain future does not mean covering it with optimism. It means leaving what can change capable of changing, so a future self or someone else can still turn when they need to.",
			"When something cannot be predicted, reduce declarations and increase observation. To avoid being rough with the future is also a courtesy to the people who will be there.",
		],
	},
	{
		title: "Neither decide too soon nor let go",
		body: [
			"Do not tidy away what cannot yet be decided by pretending it is decided. At the same time, do not leave the undecided thing lying at someone else's feet.",
			"Make clear what would make the decision possible, when it will be revisited, and who is inconvenienced by the current placeholder. Holding is not neglect. It is state management.",
			"Enduring ambiguity is not the same as pushing ambiguity onto someone else. Hold what you can hold in your own hands.",
		],
	},
	{
		title: "Generous preparation for limited time",
		body: [
			"When time is short, do not erase preparation. Make preparation smaller. Put the purpose, constraints, way back, and first move in place.",
			"Preparation is not for predicting everything. It is for protecting the room to think while moving. Good preparation does not slow execution down; it reduces the time spent lost.",
			"Preparation is a prepayment to your future self and the person beside you. A little care placed now can make someone's breathing lighter later.",
		],
	},
	{
		title: "Deep prayers, high ambitions",
		body: [
			"The larger the hope, the more carefully count what might be missed. Imagine the future that goes well, and also check what could be stepped on by that future.",
			"Prayer is not the attitude of leaving what cannot be helped to someone else. It is a posture for refusing to treat the uncertainty that remains after every effort with arrogance.",
			"Keep ambition high. But do not use that height to look down on people. Even when stretching to see farther, keep your feet close enough to hear the voices nearby.",
		],
	},
	{
		title: "Madness is the finest interior",
		body: [
			"Do not make a place thin only because rationality asks for it. When there is bias, obsession, or a strange heat, consider where it can live before removing it.",
			"Madness is not an excuse. It is an interior. It should not be thrown at people; it should change the temperature and outline of the room.",
			"Preferences and discomforts that cannot be fully explained are often entrances to exploration. Arranging something is not the same as making it sterile.",
		],
	},
	{
		title: "A full measure of humor for everyone",
		body: [
			"The more serious the room, the more it needs a small way for air to escape. Humor is not for making the discussion light; it is for returning people to a temperature where they can keep thinking.",
			"Choose laughter that loosens the room, not laughter that lowers someone. Even when things are not going well, look for words that let people remain unshrunken.",
			"A full measure of humor does not mean joking forever. It means helping hands that have frozen from fear or embarrassment begin to move again.",
		],
	},
];

export default function BaselinePage() {
	return (
		<main className="mx-auto mt-12 mb-24 max-w-220 px-4 sm:px-8 md:mt-20 lg:px-20">
			<header className="mb-14 grid gap-4">
				<h1 className="max-w-170 text-3xl sm:text-4xl">Baseline</h1>
				<div className="grid max-w-150 gap-3 text-subtle leading-7">
					<p>
						A person&apos;s thoughts and actions have habits: how they choose,
						how they hesitate, how they keep distance from others, what kind of
						air they leave in a room. Those small habits eventually become a
						distinct trace. I call that baseline.
					</p>
				</div>
			</header>

			<section className="mb-14 grid max-w-170 gap-4">
				<div className="grid gap-4">
					<h2 className="font-serif text-2xl text-rose">
						Weaving the In-Between
					</h2>
					<div className="grid max-w-150 gap-3 text-subtle leading-7">
						<p>
							In Japanese, there is a word I keep returning to: awai, the space
							between things. It is not the correct middle. It is the place
							between grief and joy, decision and suspension, self and other,
							where things keep swaying and changing shape.
						</p>
						<p>
							To weave is to keep moving your hands among things that have not
							yet been named, without rushing the sway to one side. It is to tie
							again what might otherwise come undone.
						</p>
						<p>
							This is not only for moving myself well. It is also a small form
							of care: a way not to hand unnecessary weight to my future self,
							to the person beside me, or to someone I have not met yet. This is
							my baseline.
						</p>
					</div>
				</div>
			</section>

			<section className="mb-12 grid max-w-170 gap-4">
				<h2 className="font-serif text-2xl text-rose">Practices</h2>
				<div className="grid max-w-150 gap-3 text-subtle leading-7">
					<p>
						Weaving the awai is not only watching things sway. Give what cannot
						yet be decided a temporary place. Leave a way back when moving
						toward the future. Let a little air out when the room becomes stiff.
					</p>
					<p>
						What matters is not erasing ambiguity carelessly, and not leaving it
						as someone else&apos;s burden. These are six practices for doing
						that.
					</p>
				</div>
			</section>

			<div className="grid max-w-170 gap-10">
				{mottos.map((motto) => (
					<section key={motto.title} className="grid gap-3">
						<h2 className="font-serif text-2xl text-rose">{motto.title}</h2>
						<div className="grid gap-3 text-subtle leading-7">
							{motto.body.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</section>
				))}
			</div>
		</main>
	);
}
