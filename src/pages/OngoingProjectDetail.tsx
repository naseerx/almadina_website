import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { ongoingProjectsData } from "@/data/ongoingProjects";

const OngoingProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [isVideo, setIsVideo] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    const project = ongoingProjectsData.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                    <Button onClick={() => navigate("/")}>Return to Home</Button>
                </div>
            </div>
        );
    }

    const handleMediaClick = (media: string, video: boolean = false) => {
        setSelectedMedia(media);
        setIsVideo(video);
    };

    const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : null;
    };

    const isYoutubeUrl = (url: string) => {
        return url.includes("youtube.com") || url.includes("youtu.be");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-8 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                {/* Project Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
                        {project.name}
                    </h1>
                    <p className="text-lg text-primary font-medium mb-4">
                        {project.location}
                    </p>

                </div>

                {/* Media Gallery */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>

                    {/* Images Grid */}
                    {project.images && project.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {project.images.map((image, index) => (
                                <Card
                                    key={index}
                                    className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    onClick={() => handleMediaClick(image, false)}
                                >
                                    <AspectRatio ratio={3 / 4} className="w-full overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`${project.name} - Image ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </AspectRatio>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Videos Section */}
                    {project.videos && project.videos.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4">Project Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.videos.map((video, index) => (
                                    <Card
                                        key={index}
                                        className="overflow-hidden group hover:shadow-xl transition-all duration-300"
                                    >
                                        <CardContent className="p-0 aspect-video">
                                            {isYoutubeUrl(video) ? (
                                                <iframe
                                                    src={getYoutubeEmbedUrl(video) || ""}
                                                    title={`YouTube video player ${index}`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <video
                                                    controls
                                                    className="w-full h-auto"
                                                >
                                                    <source src={video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Media Dialog for Full View */}
                <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
                        <DialogHeader className="absolute right-4 top-4 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-background/80 backdrop-blur-sm"
                                onClick={() => setSelectedMedia(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogHeader>
                        {selectedMedia && !isVideo && (
                            <img
                                src={selectedMedia}
                                alt="Full view"
                                className="w-full h-auto object-contain"
                            />
                        )}
                        {selectedMedia && isVideo && (
                            <video controls className="w-full h-auto">
                                <source src={selectedMedia} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </DialogContent>
                </Dialog>
                {/* Map Section */}
                {project.coordinates && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Location</h2>
                        <Card className="overflow-hidden h-[400px] w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}&z=15&output=embed`}
                                allowFullScreen
                            >
                            </iframe>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OngoingProjectDetail;
