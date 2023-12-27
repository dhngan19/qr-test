import {
    LinkPage, 
    TextPage,
    WifiPage,
    EmailPage,
    SmsPage,
    VcardPage
} from '@/components/Pages'


const PAGES = {
    'text': <TextPage />,
    'url': <LinkPage />,
    'wifi': <WifiPage />,
    'email': <EmailPage />,
    'sms': <SmsPage />,
    'vcard': <VcardPage />
}

export default function ContentPage({params}: { params: { slug: string }}) {     
    return (
        <div className="flex flex-col justify-center items-center">
            {PAGES[params.slug]}
        </div>        
    )
}