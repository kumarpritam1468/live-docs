import { useOthers } from "@liveblocks/react/suspense"
import Image from "next/image";

const ActiveCollaborators = () => {
    const others = useOthers();

    const collaborators = others.map((other) => other.info);
    return (
        <div className="collaborators-list">
            {collaborators.map((collaborator, idx) => (
                <div key={idx}>
                    <Image
                        src={collaborator.avatar}
                        alt={collaborator.name}
                        width={100}
                        height={100}
                        className={`inline-block size-8 rounded-full ring-2 ring-dark-100 border-[3px]`}
                        style={{ borderColor: collaborator.color }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ActiveCollaborators