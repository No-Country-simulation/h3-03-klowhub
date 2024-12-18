import { FileText } from 'lucide-react'

interface Resource {
    id: string
    name: string
    size: string
    url: string
}

interface ResourcesListProps {
    resources: Resource[]
}

export const ResourcesList = ({ resources }: ResourcesListProps) => {
    const formatFileSize = (bytes: string) => {
        const size = parseInt(bytes)
        return `${(size / 1024).toFixed(1)} KB`
    }

    return (
        <div className="space-y-2 text-white">
            {resources.map((resource) => (
                <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-gray-800 rounded-lg bg-gray-700 transition-colors"
                >
                    <FileText className="h-5 w-5 text-primary-300" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{resource.name}</p>
                        <p className="text-xs">{formatFileSize(resource.size)}</p>
                    </div>
                </a>
            ))}
        </div>
    )
}

