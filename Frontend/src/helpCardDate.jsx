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
    text: `
        Help for Psychosocial Disability: Support options include mental health services, peer support groups, workplace and educational accommodations, and advocacy for disability rights. Government programs may also offer financial and housing assistance.
      (Ang mga may Psychosocial Disability ay maaaring makakuha ng suporta mula sa mental health services (tulad ng psychologists at counselors), peer support groups para sa karanasang suporta, at accommodations sa trabaho o edukasyon. Mayroon ding mga advocacy na tumutulong sa mga karapatan ng may kapansanan at gobyernong programa na nag-aalok ng financial at housing assistance. Ang mga ito ay makakatulong upang mapabuti ang kalidad ng buhay at kalusugan.)
    `,
    link: "https://www.harvestcounselingandwellness.com/blog/psychosocial-disabilities",
  },

  hearing: {
    title: "Hearing Disability",
    img: <MdHearing />,
    text: `Help for Hearing Disability. Support options include hearing aids, cochlear implants, speech therapy, and assistive listening devices. Educational institutions can provide accommodations like sign language interpreters and note-taking services. (Ang mga taong may kapansanan sa pandinig ay may mga opsyon tulad ng hearing aids at cochlear implants upang mapabuti ang kanilang pandinig. Maaari rin silang makatanggap ng speech therapy at gumamit ng mga assistive listening devices. Sa mga institusyong pang-edukasyon, may mga serbisyong akma tulad ng sign language interpreters at note-taking services na tumutulong sa mga mag-aaral na may kapansanan sa pandinig na mas mapadali ang kanilang pagkatuto at pakikisalamuha. Ang mga serbisyong ito ay nagbibigay ng malaking tulong upang mapabuti ang kalidad ng buhay ng mga may kapansanan sa pandinig.)`,
    link: "https://www.healthline.com/health/hearing-or-speech-impairment-resources#hearing-impairment-services",
  },
  speech: {
    title: "Speech Disability",
    img: <SlSpeech />,
    text: `Help for Speech Disability. Support options include speech therapy, communication aids (like speech-generating devices), and assistive technology. Educational settings can provide accommodations such as extra time for oral presentations. (Ang mga taong may kapansanan sa pagsasalita ay may mga opsyon tulad ng speech therapy, speech-generating devices, at iba pang assistive technology upang mapabuti ang kanilang kakayahan sa komunikasyon. Sa mga institusyong pang-edukasyon, maaari silang makatanggap ng karagdagang oras para sa mga oral presentations bilang akmang serbisyo. Ang mga serbisyong ito ay tumutulong sa mga indibidwal na may kapansanan sa pagsasalita na magtagumpay sa kanilang mga gawain at layunin.)`,
    link: "https://www.healthline.com/health/hearing-or-speech-impairment-resources#hearing-impairment-services",
  },
  learning: {
    title: "Learning Disability",
    img: <PiBrainThin />,
    text: `Help for Learning Disability. Support options include specialized tutoring, individualized education plans (IEPs), and accommodations like extended test time and alternative formats for assignments. Assistive technology, such as text-to-speech software, can also be beneficial. (Ang mga taong may kapansanan sa pagkatuto ay maaaring makatanggap ng suporta tulad ng specialized tutoring, individualized education plans (IEPs), at akmang serbisyo tulad ng karagdagang oras sa pagsusulit at alternatibong format ng mga gawain. Ang paggamit ng assistive technology, tulad ng text-to-speech software, ay nakatutulong din sa pagpapadali ng pagkatuto. Ang mga serbisyong ito ay nagbibigay ng pagkakataon sa mga mag-aaral na may kapansanan sa pagkatuto na magtagumpay sa kanilang edukasyon.)`,
    link: "https://www.verywellmind.com/learning-disabilities-types-causes-symptoms-and-treatment-6386232",
  },
  physical: {
    title: "Physical Disability",
    img: <IoBodyOutline />,
    text: `Help for Physical Disability. Support options include mobility aids (like wheelchairs and prosthetics), rehabilitation services, and occupational therapy. Accessible facilities and workplace accommodations can enhance independence. Advocacy organizations provide resources and assistance. (Ang mga taong may pisikal na kapansanan ay maaaring makinabang mula sa mga mobility aids tulad ng wheelchairs at prosthetics, pati na rin ang mga rehabilitation services at occupational therapy upang mapabuti ang kanilang kakayahan sa pang-araw-araw na gawain. Ang mga accessible facilities at workplace accommodations ay tumutulong upang mas mapadali ang kanilang paggalaw at trabaho. Ang mga advocacy organizations ay nagbibigay ng mga resources at suporta upang mas mapabuti ang kanilang kalagayan at kalayaan.)`,
    link: "https://www.sondercare.com/learn/mobility-disability/what-is-physical-disability/",
  },
  mental: {
    title: "Mental Disability",
    img: <RiMentalHealthLine />,
    text: `Support options include mental health services such as therapy and counseling, medication management, and support groups. Educational and workplace accommodations, like flexible schedules and stress management resources, can also be helpful. Advocacy organizations provide resources and guidance. (Ang mga taong may mental health challenges ay maaaring makatanggap ng suporta mula sa mga mental health services tulad ng therapy, counseling, at medication management. Ang mga support groups ay nagbibigay din ng pagkakataon para sa peer support. Sa mga edukasyonal at workplace settings, may mga accommodations tulad ng flexible schedules at stress management resources upang matulungan ang mga indibidwal. Ang mga advocacy organizations ay nag-aalok ng mga resources at gabay upang matulungan ang mga tao sa kanilang mental health journey.)`,
    link: "https://mind.help/topic/mental-health-disability/",
  },
  intellectual: {
    title: "Intellectual Disability",
    img: <LuBrain />,
    text: `Help for Intellectual Disability. Support options include specialized education programs, life skills training, and vocational rehabilitation services. Community resources and support groups can provide guidance and advocacy. Assistive technology may also enhance learning and communication. (Ang mga taong may intellectual disability ay maaaring makatanggap ng suporta mula sa mga specialized education programs, life skills training, at vocational rehabilitation services upang matulungan silang magtagumpay sa edukasyon at trabaho. Ang mga community resources at support groups ay nagbibigay ng gabay at advokasiya, habang ang assistive technology ay makakatulong sa kanilang pagkatuto at komunikasyon. Ang mga serbisyong ito ay tumutulong upang mapabuti ang kanilang kalagayan at kalayaan sa pang-araw-araw na buhay.)`,
    link: "https://my.clevelandclinic.org/health/diseases/25015-intellectual-disability-id",
  },
  visual: {
    title: "Visual Disability",
    img: <LiaEyeSolid />,
    text: `Support options include assistive technologies (like screen readers and magnifiers), orientation and mobility training, and braille resources. Educational accommodations, such as accessible materials and support services, are also available. Advocacy organizations provide resources and guidance. (Ang mga taong may visual impairment ay maaaring makinabang mula sa mga assistive technologies tulad ng screen readers at magnifiers, pati na rin ang orientation and mobility training at braille resources upang matulungan silang mag-navigate at magbasa. Sa mga edukasyonal na setting, may mga accommodations tulad ng accessible materials at support services. Ang mga advocacy organizations ay nagbibigay ng gabay at mga resources upang matulungan silang mapabuti ang kanilang buhay at makahanap ng tamang suporta.)`,
    link: "https://my.clevelandclinic.org/health/diseases/24446-blindness",
  },
};
