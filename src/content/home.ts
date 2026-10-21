import photo from "../assets/image/photo.png";
import type { HomeContent } from "./types.ts";

export const home: HomeContent = {
    description:
        "Dylan Marin — engineering student at Centrale Lyon and Master's student in applied mathematics, working on machine learning, computer vision and NLP.",

    hero: {
        tagline: "Engineering student in applied mathematics.",
        school: "Centrale Lyon & Lyon 1 University",
        location: "Lyon, France",
        availability: "Looking for an end-of-study internship from April 2027, remote or on-site.",
        photo: {
            src: photo,
            alt: "Dylan Marin, smiling, in a light grey turtleneck.",
        },
    },

    about:
        "I am pursuing a general engineering diploma at **Centrale Lyon** while completing a Master's in " +
        "**Applied Mathematics** (Mathematics, Images, Data) at **Lyon 1 University**. " +
        "I have built and evaluated ML pipelines in Python.",

    contact: {
        emailSubject: "Contact from your personal Website",
        emailBody: "Hello,\n\nI found your website and CV and I would like to get in touch.\n\nBest regards,\n[Your Name]",
    },

    labels: {
        about: "About",
        contact: "Contact",
        emailButton: "Email me",
    },
};
