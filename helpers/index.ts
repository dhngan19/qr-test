import type { TVcardData } from '@/components/VcardPageComp';
import * as constants from './constants'
import {
    TelProperty,
    EmailProperty,
    TitleProperty,
    PrefParameter,
    IntegerType,
    URIType,
    TypeParameter,
    TextType,
    Group,
    FNProperty,
    AdrProperty,
    SpecialValueType,
    ParameterValueType,
    NProperty,
    VCARD,
    OrgProperty,
    URLProperty,
    LogoProperty,
    LanguageParameter,
    LanguageTagType,
} from "vcard4";

const fileToUri = (file: any) => {

    return new Promise<string>(async (resolve) => {
        console.log(file)

        if (!file.type.match(/image.*/)) {
            return window.alert("Support image file only")
        }

        try {
            const reader = new FileReader();
            const img = document.createElement("img")

            reader.onload = (event) => {
                if (event.target) {

                    const oriBase64Img = event.target.result as string
                    
                    img.setAttribute("src", oriBase64Img)                    
                }
            };
            img.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = 100
                canvas.height = 100

                const ctx = canvas.getContext("2d")


                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                const dataURI = canvas.toDataURL("image/png")

                resolve(dataURI)
            }

            reader.readAsDataURL(file);

        } catch (e) {
            console.error(e)
        }
    })
}

const convertToVcard = (vcard: TVcardData) => {
    const groupArr = []
    const card = []

    const nArr = new Array(5)
    nArr[0] = new TextType(vcard.lastName);
    nArr[1] = new TextType(vcard.firstName);
    const n = new NProperty([], new SpecialValueType("NProperty", nArr))

    const fn = new FNProperty([], new TextType(`${vcard.lastName} ${vcard.firstName}`))

    card.push(fn, n)

    if (vcard.mobile) {
        const telMobile = new TelProperty(
            [new TypeParameter("telproperty", new ParameterValueType("main"))],
            new TextType(`${vcard.mobile}`),
        );
        card.push(telMobile)
    }
    if (vcard.work) {
        const telWork = new TelProperty(
            [new TypeParameter("telproperty", new ParameterValueType("fax"))],
            new TextType(`${vcard.work}`),
        );
        groupArr.push(telWork)
    }
    if (vcard.email) {
        const email = new EmailProperty(
            [],
            new TextType(vcard.email)
        )
        card.push(email)
    }
    if (vcard.address) {
        const addrArr = new Array(7)
        addrArr[2] = new TextType(vcard.address)
        const addr = new AdrProperty(
            [],
            new SpecialValueType("AdrProperty", addrArr)
        )
        card.push(addr)
    }
    if (vcard.website) {
        const website = new URLProperty([], new URIType(vcard.website))
        card.push(website)
    }
    if (vcard.company) {
        const company = new OrgProperty(
            [],
            new SpecialValueType("orgproperty", [
                new TextType(vcard.company)
            ])
        )
        groupArr.push(company)
    }
    if (vcard.jobTitle) {
        const title = new TitleProperty([], new TextType(vcard.jobTitle))
        groupArr.push(title)
    }
    if (vcard.logo) {
        const logo = new LogoProperty(
            [],
            new URIType(vcard.logo)
        )
        card.push(logo)
    }
    if (groupArr.length > 0) {
        const grp = new Group(groupArr, "job")
        card.push(grp)
    }


    const vcardObj = new VCARD(card)

    let vcardStr = vcardObj.repr()

    vcardStr = vcardStr.replace("VERSION:4.0", "VERSION:2.1").replace("FN:", "FN;CHARSET=UTF-8:").replace("\r\nN:", "\r\nN;CHARSET=UTF-8:").replace("ADR:", "ADR;CHARSET=UTF-8:")

    console.log(vcardStr)

    return vcardStr
}

export {
    constants,
    fileToUri,
    convertToVcard
}