import { useEffect, useId, useRef, useState } from "react"
import { ArrowUpRight, X } from "lucide-react"

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()
    const [videoError, setVideoError] = useState(false)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog || !project) return
        dialog.showModal()
        return () => dialog.close()
    }, [project])

    if (!project) return null

    const close = () => {
        dialogRef.current?.close()
        onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            className="site-panel project-dialog"
            aria-labelledby={titleId}
            onCancel={(event) => {
                event.preventDefault()
                close()
            }}
            onClick={(event) => { if (event.target === event.currentTarget) close() }}
        >
            <div className="project-dialog-content">
                <header>
                    <h2 id={titleId}>{project.name}</h2>
                    <button type="button" className="activity-refresh" aria-label="Close project preview" onClick={close}><X aria-hidden="true" size={21} /></button>
                </header>
                {project.video && !videoError ? (
                    <video
                        src={project.video}
                        controls
                        playsInline
                        preload="none"
                        aria-label={`${project.name} video preview`}
                        onError={() => setVideoError(true)}
                    />
                ) : <p className="activity-summary">Project video is unavailable.</p>}
                <p>{project.desc}</p>
                {project.liveOn && <a href={project.liveOn} target="_blank" rel="noreferrer" className="text-link">Visit live site <ArrowUpRight aria-hidden="true" size={15} /></a>}
            </div>
        </dialog>
    )
}
