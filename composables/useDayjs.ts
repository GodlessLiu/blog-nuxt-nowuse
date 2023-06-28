import dayjs from 'dayjs'
export const useDayjs = (str: Date, type: string = "MM-DD-YYYY") => {
    const d = dayjs(str).format("YYYY-MM-DD")
    return d
}