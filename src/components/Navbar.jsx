import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { navLinks } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: "nav",
				start: "bottom top",
				toggleActions: "play none none reverse",
			},
		});

		navTween.to("nav", {
			backgroundColor: "#00000050",
			backdropFilter: "blur(10px)",
			duration: 0.5,
			ease: "power1.inOut",
		});
	}, []);

	return (
		<nav>
			<div>
				<a href="#home" className="flex items-center gap-2">
					<img src="/images/logo.png" alt="logo" />
					<p>Velvet Pour</p>
				</a>
				<ul>
					{navLinks.map((link) => (
						<li key={link.id}>
							<a href={`#${link.id}`}>{link.title}</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
