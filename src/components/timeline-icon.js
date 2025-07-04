import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// Lucide React - Modern, sophisticated icons
import {
  Briefcase,
  Newspaper,
  FlaskConical,
  Heart,
  Award,
  Lightbulb,
  GraduationCap,
  Rocket,
  Trophy,
  Users,
  BookOpen,
  Code,
  Mic,
  Camera,
  PenTool,
  Zap,
  Target,
  Puzzle,
  Cpu,
  Globe,
  Star,
  Sparkles,
  Medal,
  Crown,
  Shield,
} from 'lucide-react';

// React Icons - Additional premium icons
import {
  FaRocket,
  FaMicroscope,
  FaNewspaper,
  FaHandshake,
  FaTrophy,
  FaMedal,
  FaBrain,
  FaAtom,
  FaDna,
  FaRobot,
  FaChartLine,
  FaGlobe,
  FaCog,
  FaUsers,
  FaHeart,
  FaVideo,
  FaMicrophone,
  FaPodcast,
  FaBuilding,
  FaGraduationCap,
  FaTools,
  FaCrown,
  FaFire,
  FaMagic,
  FaGem,
} from 'react-icons/fa';

import {
  RiArticleLine,
  RiAwardLine,
  RiTeamLine,
  RiLightbulbLine,
  RiRocketLine,
  RiMicroscopeLine,
  RiNewspaperLine,
  RiHeartLine,
  RiMedalLine,
  RiStarLine,
  RiSparklingLine,
  RiCodeSSlashLine,
  RiBrainLine,
  RiRobot2Line,
} from 'react-icons/ri';

import {
  HiAcademicCap,
  HiBeaker,
  HiNewspaper,
  HiUsers,
  HiHeart,
  HiBriefcase,
  HiLightBulb,
  HiSparkles,
  HiChip,
  HiGlobe,
  HiCode,
  HiCamera,
  HiMicrophone,
} from 'react-icons/hi';

// Icon component mapping - store just the component references
const ICON_COMPONENTS = {
  // Experience/Jobs
  Experience: Briefcase,
  briefcase: Briefcase,
  work: HiBriefcase,
  job: FaBuilding,
  career: FaChartLine,

  // Research
  Research: FlaskConical,
  research: FaMicroscope,
  beaker: HiBeaker,
  science: FaMicroscope,
  study: FaBrain,
  academic: HiAcademicCap,
  publication: BookOpen,
  paper: RiArticleLine,
  atom: FaAtom,
  dna: FaDna,
  brain: RiBrainLine,
  microscope: RiMicroscopeLine,

  // Media & Press
  'Media & Press': Newspaper,
  media: RiNewspaperLine,
  newspaper: HiNewspaper,
  press: FaNewspaper,
  article: FaNewspaper,
  interview: FaMicrophone,
  podcast: FaPodcast,
  video: FaVideo,
  camera: HiCamera,
  microphone: HiMicrophone,

  // Awards
  Awards: Trophy,
  award: RiAwardLine,
  trophy: FaTrophy,
  medal: FaMedal,
  recognition: RiMedalLine,
  achievement: Star,
  honor: Crown,
  excellence: Sparkles,
  winner: FaTrophy,
  champion: FaCrown,
  star: RiStarLine,
  gem: FaGem,
  shield: Shield,

  // Community Service
  'Community Service': Heart,
  community: Users,
  volunteer: RiHeartLine,
  service: FaHandshake,
  help: FaUsers,
  heart: HiHeart,
  team: RiTeamLine,
  giving: FaHeart,
  charity: HiUsers,

  // Projects
  Projects: Rocket,
  project: RiRocketLine,
  rocket: FaRocket,
  innovation: Lightbulb,
  development: Code,
  code: HiCode,
  tech: Cpu,
  engineering: FaCog,
  build: FaTools,
  create: PenTool,
  design: Target,
  solution: Puzzle,
  algorithm: RiCodeSSlashLine,
  system: HiChip,
  robot: FaRobot,
  ai: RiRobot2Line,

  // General/Fallback
  lightbulb: RiLightbulbLine,
  idea: HiLightBulb,
  spark: RiSparklingLine,
  magic: FaMagic,
  fire: FaFire,
  globe: Globe,
  world: HiGlobe,
  web: FaGlobe,
  graduation: GraduationCap,
  education: FaGraduationCap,
  learn: HiAcademicCap,
  energy: Zap,
  power: HiSparkles,
};

// Lucide icons that need strokeWidth
const LUCIDE_ICONS = new Set([
  Briefcase,
  Newspaper,
  FlaskConical,
  Heart,
  Award,
  Lightbulb,
  GraduationCap,
  Rocket,
  Trophy,
  Users,
  BookOpen,
  Code,
  Mic,
  Camera,
  PenTool,
  Zap,
  Target,
  Puzzle,
  Cpu,
  Globe,
  Star,
  Sparkles,
  Medal,
  Crown,
  Shield,
]);

const TimelineIcon = React.memo(({ icon, category, className = '', size = 20 }) => {
  // Memoize icon selection and creation
  const iconElement = useMemo(() => {
    // Get the icon component
    const IconComponent =
      ICON_COMPONENTS[icon] || ICON_COMPONENTS[category] || ICON_COMPONENTS['briefcase'];

    // Create props for the icon
    const props = { size };
    if (LUCIDE_ICONS.has(IconComponent)) {
      props.strokeWidth = 1.5;
    }

    // Create and return the icon element
    return React.createElement(IconComponent, props);
  }, [icon, category, size]);

  return (
    <div
      className={`timeline-icon ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'currentColor',
        transition: 'all 0.2s ease',
      }}>
      {iconElement}
    </div>
  );
});

TimelineIcon.displayName = 'TimelineIcon';

TimelineIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  category: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default TimelineIcon;
