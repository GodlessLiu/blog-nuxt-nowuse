
export const useSelfRouter = () => {
    return {
        goBack: function (name: string) {
            useRouter().push(name)
        }
    }
}