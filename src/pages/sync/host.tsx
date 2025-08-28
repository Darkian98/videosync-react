import { useEffect, useRef } from "react";
import LayoutSyncHost from "../../layouts/sync/host/layout"

const Page = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const sendAction = async (action: "play" | "pause") => {
        if (!videoRef.current) return;
        await fetch(`${import.meta.env.VITE_API_URL}/sync/101`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, time: videoRef.current.currentTime }),
        });
    };

    const handlePlay = () => sendAction("play");
    const handlePause = () => sendAction("pause");

    useEffect(() => {
        const video = videoRef.current;
        console.log("https://videosync-react.vercel.app/es/sync/client/101")
        if (!video) return;

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, []);

    return (
        <LayoutSyncHost>


            <div className="relative w-full h-full overflow-hidden">
                <video
                    ref={videoRef}
                    src="/test/video.mp4"
                    controls
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-12 right-6  z-10">
                    <img
                        className="w-16 h-16"
                        src="/test/qr.png"
                        alt="QR"
                    />
                    <div className="text-center">
                        Sala 101
                    </div>

                </div>

            </div>

        </LayoutSyncHost>
    )
}

export default Page;