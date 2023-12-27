import { NavigationEvents } from '@/components/NavigationEvents'
import { Suspense } from 'react'

export default function CustomizePage(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="flex flex-row gap-4">

            {children}
            <Suspense fallback={null}>
                <NavigationEvents />
            </Suspense>
        </div>
    )
}