import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, X, Images, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ongoingProjectsData } from "@/data/ongoingProjects";

const OngoingProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const [isVideo, setIsVideo] = useState(false);

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

    const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const isYoutubeUrl = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

    return (
        <div className="min-h-screen bg-background">

            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Back button */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-black/60 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* In Progress badge */}
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    In Progress
                </div>

                {/* Project title */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.name}</h1>
                        <div className="flex items-center gap-2 text-white/80">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-base">{project.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-7 bg-primary rounded-full" />
                            <Images className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-bold text-secondary">Project Gallery</h2>
                            <span className="text-sm text-muted-foreground ml-auto">{project.images.length} photos</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    style={{ aspectRatio: "3/4" }}
                                    onClick={() => { setSelectedMedia(image); setIsVideo(false); }}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.name} - ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">View Full</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Videos */}
                {project.videos && project.videos.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-7 bg-primary rounded-full" />
                            <Video className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-bold text-secondary">Project Videos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.videos.map((video, index) => (
                                <Card key={index} className="overflow-hidden shadow-md">
                                    <CardContent className="p-0 aspect-video">
                                        {isYoutubeUrl(video) ? (
                                            <iframe
                                                src={getYoutubeEmbedUrl(video) || ""}
                                                title={`Video ${index + 1}`}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <video controls className="w-full h-auto">
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Map */}
                {project.coordinates && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-7 bg-primary rounded-full" />
                            <MapPin className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-bold text-secondary">Location</h2>
                        </div>
                        <div className="overflow-hidden rounded-xl h-[400px] shadow-md border border-border">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://maps.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}&z=15&output=embed`}
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
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
                        <img src={selectedMedia} alt="Full view" className="w-full h-auto object-contain max-h-[85vh]" />
                    )}
                    {selectedMedia && isVideo && (
                        <video controls className="w-full h-auto">
                            <source src={selectedMedia} type="video/mp4" />
                        </video>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OngoingProjectDetail;
