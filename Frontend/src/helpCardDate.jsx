import { MdOutlinePsychology, MdHearing } from "react-icons/md";
import { SlSpeech } from "react-icons/sl";
import { PiBrainThin } from "react-icons/pi";
import { IoBodyOutline } from "react-icons/io5";
import { RiMentalHealthLine } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import { LiaEyeSolid } from "react-icons/lia";

export const cardData = {
  psychosocial: {
    title: "Psychosocial Disability",
    img: <MdOutlinePsychology />,
    text: `Help for Psychosocial Disability. Support options include mental health services, peer support groups, workplace and educational accommodations, and advocacy for disability rights. Government programs may also offer financial and housing assistance.`,
    link: "https://www.harvestcounselingandwellness.com/blog/psychosocial-disabilities",
  },
  hearing: {
    title: "Hearing Disability",
    img: <MdHearing />,
    text: `Help for Hearing Disability. Support options include hearing aids, cochlear implants, speech therapy, and assistive listening devices. Educational institutions can provide accommodations like sign language interpreters and note-taking services.`,
    link: "https://www.healthline.com/health/hearing-or-speech-impairment-resources#hearing-impairment-services",
  },
  speech: {
    title: "Speech Disability",
    img: <SlSpeech />,
    text: `Help for Speech Disability. Support options include speech therapy, communication aids (like speech-generating devices), and assistive technology. Educational settings can provide accommodations such as extra time for oral presentations.`,
    link: "https://www.healthline.com/health/hearing-or-speech-impairment-resources#hearing-impairment-services",
  },
  learning: {
    title: "Learning Disability",
    img: <PiBrainThin />,
    text: `Help for Learning Disability. Support options include specialized tutoring, individualized education plans (IEPs), and accommodations like extended test time and alternative formats for assignments. Assistive technology, such as text-to-speech software, can also be beneficial.`,
    link: "https://www.verywellmind.com/learning-disabilities-types-causes-symptoms-and-treatment-6386232",
  },
  physical: {
    title: "Physical Disability",
    img: <IoBodyOutline />,
    text: `Help for Physical Disability. Support options include mobility aids (like wheelchairs and prosthetics), rehabilitation services, and occupational therapy. Accessible facilities and workplace accommodations can enhance independence. Advocacy organizations provide resources and assistance.`,
    link: "https://www.sondercare.com/learn/mobility-disability/what-is-physical-disability/",
  },
  mental: {
    title: "Mental Disability",
    img: <RiMentalHealthLine />,
    text: `Support options include mental health services such as therapy and counseling, medication management, and support groups. Educational and workplace accommodations, like flexible schedules and stress management resources, can also be helpful. Advocacy organizations provide resources and guidance.`,
    link: "https://mind.help/topic/mental-health-disability/",
  },
  intellectual: {
    title: "Intellectual Disability",
    img: <LuBrain />,
    text: `Help for Intellectual Disability. Support options include specialized education programs, life skills training, and vocational rehabilitation services. Community resources and support groups can provide guidance and advocacy. Assistive technology may also enhance learning and communication.`,
    link: "https://my.clevelandclinic.org/health/diseases/25015-intellectual-disability-id",
  },
  visual: {
    title: "Visual Disability",
    img: <LiaEyeSolid />,
    text: `Support options include assistive technologies (like screen readers and magnifiers), orientation and mobility training, and braille resources. Educational accommodations, such as accessible materials and support services, are also available. Advocacy organizations provide resources and guidance.`,
    link: "https://my.clevelandclinic.org/health/diseases/24446-blindness",
  },
};
