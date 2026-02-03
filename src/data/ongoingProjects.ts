import b45 from "@/assets/ongoing/b45/b45.jpeg";
import b45a from "@/assets/ongoing/b45/b45a.jpeg";
import b45b from "@/assets/ongoing/b45/b45b.jpeg";
import sufyan from "@/assets/ongoing/sufyan/sufyan.jpeg";
import sufyan2 from "@/assets/ongoing/sufyan/sufyan2.jpeg";

export interface OngoingProject {
    id: string;
    thumbnail: string;
    name: string;
    location: string;
    images: string[];
    videos?: string[];
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export const ongoingProjectsData: OngoingProject[] = [
    {
        id: "modern-residential-house",
        thumbnail: b45,
        name: "Modern Residential house in DHA",
        location: "DHA sector A, Peshawar",
        images: [b45, b45a, b45b],
        videos: ["https://youtube.com/shorts/rFgT2xW4qKE"],
        coordinates: {

            lat: 34.0538162029604,
            lng: 71.42868334302644
        }
    },
    {
        id: "house_constrcution_sufyan",
        thumbnail: sufyan,
        name: "House Construction Sufyan",
        location: "Sufyan, Peshawar",
        images: [sufyan, sufyan2],
        videos: ["https://youtube.com/shorts/ykNkSDcLUFM"],
        coordinates: {
            lat: 34.052876846263004,
            lng: 71.50947935937928
            
        }
    },

];
