import { Outlet, useLocation } from "react-router-dom";
import DarkToggle from "../components/DarkToggle";
import { tw } from "../utility/tailwindUtil";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const styles = {
	outerContainer: tw(
		`h-full p-8`,
		`bg-stone-200 dark:bg-nebula-700`,
		`text-nebula-700 dark:text-orange-100`,
		`transition-colors`,
		`relative`,
		`overflow-clip`,
		`flex`
	),
	mainContainer: tw(
		`grow`,
		`overflow-auto`,
		`z-10`,
		`flex flex-col items-center`
	),
}

const Layout = () => {
	const fadeAnimation = useAnimation();
	const location = useLocation();

	useEffect(() => {
		fadeAnimation.set({ opacity: 0, translateY: 50 });
		fadeAnimation.start({ opacity: 1, translateY: 0, transition: { ease: "backOut", duration: 0.5 } });
	}, [location.pathname]);

	return <div className={styles.outerContainer}>
		<DarkToggle />
		<motion.main layout
			animate={fadeAnimation}
			className={styles.mainContainer}>
			<Outlet />
		</motion.main>
	</div>
}

export default Layout;