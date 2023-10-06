import { ReactElement } from 'react'
import dayjs from 'dayjs'

import { BodyShort } from '@/components/clientAksel'

export default async function Tertialinfo(): Promise<ReactElement> {
    function countWeekdaysUntil(targetDate: string): number {
        let today = dayjs()
        const endDay = dayjs(targetDate)

        if (endDay.isBefore(today)) {
            return 0
        }

        let weekdayCount = 0

        while (!today.isAfter(endDay)) {
            // Sjekk om dagen ikke er en helgedag
            if (today.day() !== 0 && today.day() !== 6) {
                weekdayCount++
            }
            // Gå til neste dag
            today = today.add(1, 'day')
        }

        return weekdayCount
    }

    function numberToEmoji(n: number): string {
        const emojiNumbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
        let emojiString = ''

        const numberString = n.toString()
        for (let i = 0; i < numberString.length; i++) {
            const digit = parseInt(numberString[i])
            emojiString += emojiNumbers[digit]
        }

        return emojiString
    }

    const targetDate = '2023-12-22'
    const dagerIgjen = numberToEmoji(countWeekdaysUntil(targetDate))

    return (
        <div className="w-100 max-w-90 flex h-screen flex-col justify-between bg-gray-900 pb-20 pt-10 text-center leading-none text-white">
            <h1 className="text-8xl">Team Flex - T3 - 2023 💪</h1>
            <BodyShort className="text-6xl">
                ℹ️ Bidra til at saker med flere inntektskilder kan tas inn og beholdes i speil
            </BodyShort>
            <BodyShort className="block pb-20 text-5xl">{`Det er ${dagerIgjen} arbeidsdager igjen til jul`}</BodyShort>
        </div>
    )
}
