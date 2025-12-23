import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText.js";

const Hero = () => {
	useGSAP(() => {
		//adding gradient to each character of mojito
		const heroSplit = new SplitText("h1", { type: "chars" });
		const paragraphSplit = new SplitText(".subtitle", { type: " lines" });
		console.log(paragraphSplit);

		heroSplit.chars.forEach((char) => {
			char.classList.add("text-gradient");
		});
		// console.log(paragraphSplit);

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			stagger: 0.06,
			duration: 1.08,
		});

		gsap.from(paragraphSplit.lines, {
			yPercent: 100,
			delay: 1,
			opacity: 0,
			stagger: 0.06,
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#hero",
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		});

		tl.to(".left-leaf", { y: -200 });
		tl.to(".right-leaf", { y: 200 }, "<");
	}, []);

	return (
		<>
			<section id="hero" className="noisy">
				<h1>MOJITO</h1>
				<img
					src="/images/hero-left-leaf.png"
					alt="left-leaf"
					className="left-leaf"
				/>
				<img
					src="/images/hero-right-leaf.png"
					alt="right-leaf"
					className="right-leaf"
				/>
				<div className="body">
					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>
						<div className="view-cocktails">
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.
							</p>
							<a>View cocktails</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
