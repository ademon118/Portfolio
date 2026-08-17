'use client';

import LogoLoop from '@/components/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiFigma,
  SiAngular,
  SiIonic,
  SiPhp,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const TECH_LOGOS = [
  { node: <SiReact color="#61DAFB" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs color="#AAAAAA" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript color="#3178C6" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss color="#06B6D4" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiFlutter color="#02569B" />, title: 'Flutter', href: 'https://flutter.dev' },
  { node: <SiFigma color="#F24E1E" />, title: 'Figma', href: 'https://www.figma.com' },
  { node: <SiAngular color="#DD0031" />, title: 'Angular', href: 'https://angular.io' },
  { node: <SiIonic color="#3880FF" />, title: 'Ionic', href: 'https://ionicframework.com' },
  { node: <SiPhp color="#777BB4" />, title: 'PHP', href: 'https://www.php.net' },
  { node: <FaJava color="#007396" />, title: 'Java', href: 'https://www.java.com' },
];

export default function TechLogoLoop() {
  return (
    <div className="relative z-10 h-[100px] sm:h-[160px] md:h-[200px] overflow-hidden flex justify-center items-center mx-4 sm:mx-10">
      <LogoLoop
        logos={TECH_LOGOS}
        speed={120}
        direction="left"
        logoHeight={40}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="transparent"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
