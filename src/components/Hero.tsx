import BannerImage from "../../assets/banner.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="px-6 py-4">
      <div className="relative mx-auto flex min-h-83.75 max-w-350 items-center overflow-hidden rounded-xl border border-[#24272d] bg-[#15171c] px-10 py-12 md:px-12">
        {/* Left Content */}
        <div className="relative z-10 max-w-137.5">
          <p className="mb-5 text-xs font-bold tracking-widest text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="mb-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
            Train with intent. Log <br /> every set.
          </h1>

          <p className="mb-6 max-w-125 text-sm leading-6 text-gray-400 md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <Link href="#library">
            <button
              type="button"
              className="rounded-md bg-lime-400 px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-lime-300"
            >
              Browse Workouts
            </button>
          </Link>
        </div>

        {/* Workout Illustration */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block">
          <Image
            src={BannerImage}
            alt="Workout illustration"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
