import React, { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw
} from "lucide-react"

const VRPreview = ({ destination, videos, images360, onClose }) => {
  const [currentMedia, setCurrentMedia] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideo, setIsVideo] = useState(true)
  const videoRef = useRef(null)

  const allMedia = [
    ...videos.map(v => ({ type: "video", src: v })),
    ...images360.map(i => ({ type: "image", src: i }))
  ]

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, currentMedia])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const nextMedia = () => {
    setCurrentMedia(prev => (prev + 1) % allMedia.length)
    setIsPlaying(false)
  }

  const prevMedia = () => {
    setCurrentMedia(prev => (prev - 1 + allMedia.length) % allMedia.length)
    setIsPlaying(false)
  }

  const currentItem = allMedia[currentMedia]
  const isCurrentVideo = currentItem?.type === "video"

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black bg-opacity-75 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">VR Experience: {destination}</h2>
          <p className="text-gray-300">
            {currentMedia + 1} of {allMedia.length} •{" "}
            {isCurrentVideo ? "Video" : "360° Image"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-3xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        {currentItem && (
          <>
            {isCurrentVideo ? (
              <video
                ref={videoRef}
                src={currentItem.src}
                className="max-w-full max-h-full"
                onEnded={() => setIsPlaying(false)}
                muted={isMuted}
              />
            ) : (
              <div className="relative">
                <img
                  src={currentItem.src}
                  alt="360° view"
                  className="max-w-full max-h-full rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  360° Image
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black bg-opacity-75 text-white p-4">
        <div className="flex items-center justify-center space-x-6">
          {isCurrentVideo && (
            <>
              <button
                onClick={togglePlayPause}
                className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
            </>
          )}

          <button className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-colors">
            <RotateCcw className="w-6 h-6" />
          </button>

          <button className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-colors">
            <Maximize className="w-6 h-6" />
          </button>
        </div>

        {/* Media Thumbnails */}
        <div className="flex justify-center space-x-2 mt-4 overflow-x-auto">
          {allMedia.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentMedia(index)
                setIsPlaying(false)
              }}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentMedia
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              {item.type === "video" ? (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VRPreview
