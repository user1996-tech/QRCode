import NfcManager, {
    NfcTech,
    Ndef,
    NfcEvents,
    NfcError,
} from "react-native-nfc-manager";
import { useOutlet, getOutlet } from 'reconnect.js'



class NfcProxy {
    async init() {
        try {
            const supported = await Nfc.Manager.isSupported()
            if (supported) {
                await NfcManager.start()
            }
            return supported
        } catch (er) {
            console.log(er)
        }
    }

    async read() {
        let tag = null
        try {
            await NfcManager.requestTechnology([NfcTech.Ndef])

            tag = await NfcManager.getTag()
            if (tag) {
                // console.log(tag)
                getOutlet('tag').update({
                    data: tag
                })
            }
        }
        catch (ex) {
            console.log(ex)
        }
        finally {
            this.closePrompt()
            NfcManager.cancelTechnologyRequest()
        }
    }

    cancelScan() {
        getOutlet('androidPrompt').update({
            visible: false,
            message: '',
        })
        NfcManager.cancelTechnologyRequest()
    }

    closePrompt() {
        getOutlet('androidPrompt').update({
            visible: false,
            message: ''
        })
    }

    async write() {
        writeTagOptions = getOutlet('writeTagOptions').getValue()
        console.log(writeTagOptions)

        try {
            console.log('start write')
            console.log(writeTagOptions)
            await NfcManager.requestTechnology([NfcTech.Ndef])
            const textInputValue = writeTagOptions.textInputValue
            const type = writeTagOptions.type
            const title = writeTagOptions.title
            let bytes = null

            if (type == 'Text') {
                bytes = Ndef.encodeMessage([Ndef.textRecord(textInputValue)])
            } else if (type == 'URL') {
                if (title == "---"){
                    bytes = Ndef.encodeMessage([Ndef.uriRecord(textInputValue)])
                } else {
                    const prefix = writeTagOptions.title
                    bytes = Ndef.encodeMessage([Ndef.uriRecord(prefix + textInputValue)])
                }
            } else if (type == 'Tel') {
                const prefix = 'tel:'
                bytes = Ndef.encodeMessage([Ndef.uriRecord(prefix + textInputValue)])
            } else if (type == 'SMS') {
                const prefix = 'sms:'
                bytes = Ndef.encodeMessage([Ndef.uriRecord(prefix + textInputValue)])
            } else if (type == 'MailTo') {
                const prefix = 'mailto:'
                bytes = Ndef.encodeMessage([Ndef.uriRecord(prefix + textInputValue)])
            }



            if (bytes) {
                await NfcManager.ndefHandler.writeNdefMessage(bytes)
            }

        } catch (er) {
            console.log(er)
        } finally {
            this.closePrompt()

            console.log('end write')
            NfcManager.cancelTechnologyRequest()
        }
    }

}
export default new NfcProxy();
