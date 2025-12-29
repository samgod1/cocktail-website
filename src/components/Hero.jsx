import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText.js";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
	const videoRef = useRef();

	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		//adding gradient to each character of mojito
		const heroSplit = new SplitText("h1", { type: "chars" });
		const paragraphSplit = new SplitText(".subtitle", { type: " lines" });

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

		const startValue = isMobile ? "top 50%" : "center 60%";
		const endValue = isMobile ? "bottom bottom" : "bottom top";

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "video",
				start: startValue,
				end: endValue,
				endTrigger: isMobile ? "#cocktails" : undefined,
				scrub: true,
				pin: true,
			},
		});

		videoRef.current.onloadedmetadata = () => {
			timeline.to(videoRef.current, {
				currentTime: videoRef.current.duration,
			});
		};
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
						<div className="view-cocktails ">
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
			<div className="video absolute inset-0">
				<video
					src="/videos/output.mp4"
					muted
					playsInline
					preload="true"
					ref={videoRef}
				/>
			</div>
		</>
	);
};

export default Hero;
